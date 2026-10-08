const assert = require('assert');
const vlsm = require('../frontend/js/subnetting.js');

let passed = 0;
let failed = 0;
const results = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    results.push(`PASS | ${name}`);
  } catch (err) {
    failed++;
    results.push(`FAIL | ${name} | ${err.message}`);
  }
}

test('1. IPv4 a numero y regreso', () => {
  const n = vlsm.ipv4ToNumber('192.168.10.1');
  assert.strictEqual(vlsm.numberToIpv4(n), '192.168.10.1');
});

test('2. CIDR /24 calcula mascara y broadcast', () => {
  const r = vlsm.parseCidr('192.168.10.0/24');
  assert.strictEqual(r.mask, '255.255.255.0');
  assert.strictEqual(r.network, '192.168.10.0');
  assert.strictEqual(r.broadcast, '192.168.10.255');
  assert.strictEqual(r.usableHosts, 254);
});

test('3. VLSM 100, 30, 10 y 6 hosts', () => {
  const r = vlsm.allocateVLSM('192.168.10.0/24', [
    { name: 'Usuarios', hosts: 100 },
    { name: 'CCTV', hosts: 30 },
    { name: 'Administracion', hosts: 10 },
    { name: 'Servidores', hosts: 6 }
  ]);
  const byName = Object.fromEntries(r.subnets.map(s => [s.name, s]));
  assert.strictEqual(byName.Usuarios.networkCidr, '192.168.10.0/25');
  assert.strictEqual(byName.CCTV.networkCidr, '192.168.10.128/27');
  assert.strictEqual(byName.Administracion.networkCidr, '192.168.10.160/28');
  assert.strictEqual(byName.Servidores.networkCidr, '192.168.10.176/29');
  assert.strictEqual(r.summary.remainingAddresses, 72);
  assert.strictEqual(r.summary.noOverlaps, true);
});

test('4. Dos redes principales independientes', () => {
  const r = vlsm.calculateMultipleNetworks([
    { name: 'Sede Norte', network: '10.10.0.0/24', segments: [{ name: 'Usuarios', hosts: 50 }] },
    { name: 'Sede Sur', network: '10.20.0.0/24', segments: [{ name: 'Usuarios', hosts: 50 }] }
  ]);
  assert.strictEqual(r.length, 2);
  assert.strictEqual(r[0].subnets[0].networkCidr, '10.10.0.0/26');
  assert.strictEqual(r[1].subnets[0].networkCidr, '10.20.0.0/26');
});

test('5. Tres redes principales independientes', () => {
  const r = vlsm.calculateMultipleNetworks([
    { name: 'Sede 1', network: '172.16.0.0/24', segments: [{ name: 'LAN', hosts: 20 }] },
    { name: 'Sede 2', network: '172.16.1.0/24', segments: [{ name: 'LAN', hosts: 20 }] },
    { name: 'Sede 3', network: '172.16.2.0/24', segments: [{ name: 'LAN', hosts: 20 }] }
  ]);
  assert.strictEqual(r.length, 3);
  assert.ok(r.every(x => x.summary.noOverlaps));
});

test('6. Detecta falta de capacidad', () => {
  assert.throws(() => vlsm.allocateVLSM('192.168.10.0/28', [
    { name: 'Usuarios', hosts: 20 }
  ]));
});

test('7. Detecta redes principales solapadas', () => {
  assert.throws(() => vlsm.calculateMultipleNetworks([
    { name: 'Red A', network: '192.168.1.0/24', segments: [{ name: 'LAN', hosts: 10 }] },
    { name: 'Red B', network: '192.168.1.128/25', segments: [{ name: 'LAN', hosts: 10 }] }
  ]), /solapan/);
});

test('8. P2P de 2 hosts usa /31', () => {
  const r = vlsm.allocateVLSM('10.0.0.0/30', [
    { name: 'Enlace', hosts: 2, type: 'P2P' }
  ]);
  assert.strictEqual(r.subnets[0].networkCidr, '10.0.0.0/31');
  assert.strictEqual(r.subnets[0].usableHosts, 2);
});

test('9. Loopback de 1 direccion usa /32', () => {
  const r = vlsm.allocateVLSM('10.0.0.0/30', [
    { name: 'Loopback', hosts: 1, type: 'LOOPBACK' }
  ]);
  assert.strictEqual(r.subnets[0].networkCidr, '10.0.0.0/32');
  assert.strictEqual(r.subnets[0].usableHosts, 1);
});

test('10. CIDR con IP de host se normaliza a la red', () => {
  const r = vlsm.parseCidr('192.168.10.55/24');
  assert.strictEqual(r.network, '192.168.10.0');
  assert.strictEqual(r.broadcast, '192.168.10.255');
});

console.log('====================================');
console.log('NETBUILDING - PRUEBAS VLSM A.4');
console.log('====================================');
results.forEach(r => console.log(r));
console.log('------------------------------------');
console.log(`Pruebas: ${passed + failed}`);
console.log(`Exitosas: ${passed}`);
console.log(`Fallidas: ${failed}`);
console.log(`Confianza: ${((passed / (passed + failed)) * 100).toFixed(2)}%`);
console.log('====================================');

if (failed > 0) process.exit(1);
