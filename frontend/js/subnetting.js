/*
 * NetBuilding - Motor de Subnetting VLSM
 * Version: 2.2.0
 * DEV-001 - IP Planning / Subnetting
 *
 * Este modulo es independiente del dashboard.
 * En este avance NO modifica frontend/index.html.
 */

(function (global) {
    "use strict";

    const DEV_ID = "DEV-001";
    const VERSION = "2.2.0";

    function ipv4ToNumber(ip) {
        if (typeof ip !== "string") {
            throw new Error("La IPv4 debe ser texto.");
        }

        const parts = ip.trim().split(".");

        if (parts.length !== 4) {
            throw new Error("IPv4 invalida: " + ip);
        }

        let value = 0;

        for (const part of parts) {
            if (!/^\d+$/.test(part)) {
                throw new Error("IPv4 invalida: " + ip);
            }

            const octet = Number(part);

            if (octet < 0 || octet > 255) {
                throw new Error("Octeto fuera de rango: " + ip);
            }

            value = value * 256 + octet;
        }

        return value;
    }

    function numberToIpv4(number) {
        if (!Number.isInteger(number) || number < 0 || number > 4294967295) {
            throw new Error("Numero IPv4 fuera de rango.");
        }

        return [
            Math.floor(number / 16777216) % 256,
            Math.floor(number / 65536) % 256,
            Math.floor(number / 256) % 256,
            number % 256
        ].join(".");
    }

    function cidrToMask(prefix) {
        if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
            throw new Error("Prefijo CIDR invalido.");
        }

        if (prefix === 0) {
            return "0.0.0.0";
        }

        return numberToIpv4((0xFFFFFFFF << (32 - prefix)) >>> 0);
    }

    function maskToPrefix(mask) {
        const binary = ipv4ToNumber(mask).toString(2).padStart(32, "0");

        if (!/^1*0*$/.test(binary)) {
            throw new Error("Mascara IPv4 invalida.");
        }

        return (binary.match(/1/g) || []).length;
    }

    function getUsableHosts(prefix, type = "LAN") {
        if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
            throw new Error("Prefijo CIDR invalido.");
        }

        if (prefix === 32) {
            return type === "LOOPBACK" ? 1 : 0;
        }

        if (prefix === 31) {
            return type === "P2P" ? 2 : 0;
        }

        return (2 ** (32 - prefix)) - 2;
    }

    function hostsRequiredToPrefix(hosts, type = "LAN") {
        hosts = Number(hosts);

        if (!Number.isInteger(hosts) || hosts < 1) {
            throw new Error("Los hosts deben ser un entero mayor que cero.");
        }

        if (type === "P2P" && hosts <= 2) {
            return 31;
        }

        if (type === "LOOPBACK" && hosts === 1) {
            return 32;
        }

        // LAN tradicional: reserva red y broadcast.
        for (let prefix = 30; prefix >= 0; prefix--) {
            if (getUsableHosts(prefix, "LAN") >= hosts) {
                return prefix;
            }
        }

        throw new Error("No existe una subred IPv4 suficiente.");
    }

    function parseCidr(cidr) {
        if (typeof cidr !== "string") {
            throw new Error("CIDR invalido.");
        }

        const parts = cidr.trim().split("/");

        if (parts.length !== 2 || !/^\d+$/.test(parts[1])) {
            throw new Error("CIDR invalido: " + cidr);
        }

        const ipNumber = ipv4ToNumber(parts[0]);
        const prefix = Number(parts[1]);

        if (prefix < 0 || prefix > 32) {
            throw new Error("Prefijo invalido.");
        }

        const blockSize = 2 ** (32 - prefix);
        const networkNumber = Math.floor(ipNumber / blockSize) * blockSize;
        const broadcastNumber = networkNumber + blockSize - 1;

        return {
            input: cidr,
            ip: parts[0],
            prefix,
            mask: cidrToMask(prefix),
            network: numberToIpv4(networkNumber),
            broadcast: numberToIpv4(broadcastNumber),
            firstHost: prefix <= 30
                ? numberToIpv4(networkNumber + 1)
                : numberToIpv4(networkNumber),
            lastHost: prefix <= 30
                ? numberToIpv4(broadcastNumber - 1)
                : numberToIpv4(broadcastNumber),
            totalAddresses: blockSize,
            usableHosts: getUsableHosts(prefix),
            networkNumber,
            broadcastNumber
        };
    }

    function calculateSubnet(networkCidr, requestedHosts, type = "LAN") {
        const parent = parseCidr(networkCidr);
        const prefix = hostsRequiredToPrefix(requestedHosts, type);

        if (prefix < parent.prefix) {
            throw new Error(
                "La red principal no puede contener esta subred."
            );
        }

        return {
            requestedHosts: Number(requestedHosts),
            type,
            cidr: "/" + prefix,
            prefix,
            mask: cidrToMask(prefix),
            totalAddresses: 2 ** (32 - prefix),
            usableHosts: getUsableHosts(prefix, type)
        };
    }

    function allocateVLSM(networkCidr, segments) {
        const parent = parseCidr(networkCidr);

        if (!Array.isArray(segments) || segments.length === 0) {
            throw new Error("Debe existir al menos un segmento.");
        }

        const normalized = segments.map((segment, index) => {
            const name = String(
                segment.name || ("Segmento " + (index + 1))
            ).trim();

            const hosts = Number(segment.hosts);
            const type = String(segment.type || "LAN").toUpperCase();

            if (!name) {
                throw new Error("Segmento sin nombre.");
            }

            if (!Number.isInteger(hosts) || hosts < 1) {
                throw new Error("Hosts invalidos en " + name);
            }

            if (!["LAN", "P2P", "LOOPBACK"].includes(type)) {
                throw new Error("Tipo invalido en " + name);
            }

            const prefix = hostsRequiredToPrefix(hosts, type);

            if (prefix < parent.prefix) {
                throw new Error(
                    "El segmento " + name +
                    " no cabe en " + networkCidr
                );
            }

            return {
                name,
                hosts,
                type,
                prefix,
                blockSize: 2 ** (32 - prefix),
                originalIndex: index
            };
        });

        // VLSM: primero se asignan los bloques mas grandes.
        normalized.sort(
            (a, b) => b.blockSize - a.blockSize || b.hosts - a.hosts
        );

        const results = [];
        let cursor = parent.networkNumber;

        for (const segment of normalized) {
            const remainder = cursor % segment.blockSize;

            if (remainder !== 0) {
                cursor += segment.blockSize - remainder;
            }

            const networkNumber = cursor;
            const broadcastNumber =
                networkNumber + segment.blockSize - 1;

            if (broadcastNumber > parent.broadcastNumber) {
                throw new Error(
                    "No hay suficiente espacio para " + segment.name
                );
            }

            results.push({
                name: segment.name,
                hostsRequested: segment.hosts,
                type: segment.type,
                prefix: segment.prefix,
                cidr: "/" + segment.prefix,
                network: numberToIpv4(networkNumber),
                networkCidr:
                    numberToIpv4(networkNumber) +
                    "/" +
                    segment.prefix,
                mask: cidrToMask(segment.prefix),
                firstHost: segment.type === "LAN"
                    ? numberToIpv4(networkNumber + 1)
                    : numberToIpv4(networkNumber),
                lastHost: segment.type === "LAN"
                    ? numberToIpv4(broadcastNumber - 1)
                    : numberToIpv4(broadcastNumber),
                broadcast: numberToIpv4(broadcastNumber),
                totalAddresses: segment.blockSize,
                usableHosts: getUsableHosts(
                    segment.prefix,
                    segment.type
                ),
                originalIndex: segment.originalIndex
            });

            cursor = broadcastNumber + 1;
        }

        // Devuelve los segmentos en el orden que ingreso el usuario.
        results.sort((a, b) => a.originalIndex - b.originalIndex);

        const usedAddresses = results.reduce(
            (sum, subnet) => sum + subnet.totalAddresses,
            0
        );

        return {
            parent: {
                input: parent.input,
                network: parent.network,
                cidr: "/" + parent.prefix,
                networkCidr:
                    parent.network + "/" + parent.prefix,
                mask: parent.mask,
                broadcast: parent.broadcast,
                totalAddresses: parent.totalAddresses
            },
            subnets: results,
            summary: {
                totalSegments: results.length,
                usedAddresses,
                remainingAddresses:
                    parent.totalAddresses - usedAddresses,
                usedPercentage: Number(
                    (
                        usedAddresses /
                        parent.totalAddresses *
                        100
                    ).toFixed(2)
                ),
                noOverlaps: true
            }
        };
    }

    function networksOverlap(a, b) {
        return (
            a.networkNumber <= b.broadcastNumber &&
            b.networkNumber <= a.broadcastNumber
        );
    }

    function validateMainNetworks(networks) {
        if (!Array.isArray(networks) || networks.length === 0) {
            throw new Error(
                "Debe existir al menos una red principal."
            );
        }

        const parsed = networks.map((network, index) => {
            if (!network || !network.network) {
                throw new Error(
                    "Red principal " + (index + 1) + " invalida."
                );
            }

            return {
                ...parseCidr(network.network),
                name: String(
                    network.name || ("Red " + (index + 1))
                ).trim(),
                segments: network.segments || []
            };
        });

        for (let i = 0; i < parsed.length; i++) {
            for (let j = i + 1; j < parsed.length; j++) {
                if (networksOverlap(parsed[i], parsed[j])) {
                    throw new Error(
                        'Las redes principales "' +
                        parsed[i].name +
                        '" y "' +
                        parsed[j].name +
                        '" se solapan.'
                    );
                }
            }
        }

        return parsed;
    }

    function calculateMultipleNetworks(networks) {
        return validateMainNetworks(networks).map(network => ({
            name: network.name,
            ...allocateVLSM(
                network.network + "/" + network.prefix,
                network.segments
            )
        }));
    }

    const VLSM = {
        DEV_ID,
        VERSION,
        ipv4ToNumber,
        numberToIpv4,
        cidrToMask,
        maskToPrefix,
        parseCidr,
        getUsableHosts,
        hostsRequiredToPrefix,
        calculateSubnet,
        allocateVLSM,
        networksOverlap,
        validateMainNetworks,
        calculateMultipleNetworks
    };

    // Navegador
    global.NetBuildingVLSM = VLSM;

    // Node.js para pruebas
    if (typeof module !== "undefined" && module.exports) {
        module.exports = VLSM;
    }

})(typeof window !== "undefined" ? window : globalThis);
