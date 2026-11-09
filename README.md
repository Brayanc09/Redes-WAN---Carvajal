# Gestor de Redes WAN – NetBuilding V3

**Plataforma académica para el diseño, direccionamiento, configuración y ciberdefensa de redes WAN y LAN.**

**Versión actual: 3.0.0**

## Objetivo del proyecto

Facilitar el diseño y la administración de redes mediante herramientas de direccionamiento IP, planificación de VLAN, representación de topologías, generación de configuraciones para diferentes fabricantes y recomendaciones de seguridad.

## Funcionalidades desarrolladas

1. **Datos y requerimientos:** registro de usuarios, dispositivos y necesidades de conectividad.
2. **Subnetting y VLSM:** cálculo de subredes IPv4 según la cantidad de hosts requerida, con soporte para múltiples redes principales.
3. **Topología:** representación gráfica de dispositivos y conexiones, con opciones para agregar, mover, conectar, eliminar, guardar y recuperar diseños.
4. **Configuraciones multivendor:** generación de plantillas para Cisco IOS/IOS XE, Huawei VRP, Fortinet FortiOS y MikroTik RouterOS.
5. **Ciberdefensa:** recomendaciones y plantillas de seguridad relacionadas con SSH, Port Security, DHCP Snooping, BPDU Guard, Storm Control, DAI y ACL, según las capacidades de cada fabricante.

## Tecnologías utilizadas

- HTML, CSS y JavaScript.
- Node.js para ejecutar pruebas automatizadas.
- Git y GitHub para el control de versiones.
- Visual Studio Code como entorno de desarrollo.

## Estructura del proyecto

```text
NetBuilding_V3/
├── frontend/
│   ├── index.html
│   └── js/
│       └── subnetting.js
├── tests/
│   ├── vlsm.test.js
│   └── vlsm_test.html
├── docs/
│   ├── capturas/
│   ├── informe-corte2.pdf
│   ├── informe-corte3.pdf
│   ├── manual.md
│   ├── seguridad.md
│   ├── politicas-ia.md
│   └── pruebas.md
├── versions/
├── .env.example
├── .gitignore
├── CHANGELOG.md
└── README.md
```

## Pruebas automatizadas

Para ejecutar las pruebas del módulo VLSM, utiliza Node.js desde la carpeta raíz del proyecto:

```bash
node tests/vlsm.test.js
```

**Resultado registrado:** 10 pruebas aprobadas y 0 fallidas.

## Seguridad y consideraciones

- Validación de entradas para reducir errores.
- Protección frente a la interpretación de contenido HTML no confiable.
- Exclusión de archivos sensibles mediante `.gitignore`.
- Revisión manual de las configuraciones antes de aplicarlas en equipos reales.
- Las plantillas deben adaptarse al fabricante, modelo y versión del dispositivo.

## Limitaciones actuales

- No existe integración de un agente de inteligencia artificial en esta versión.
- La aplicación genera plantillas de configuración, pero no realiza despliegues automáticos sobre equipos físicos.
- Las recomendaciones de ciberdefensa dependen de las capacidades de cada fabricante.

## Documentación

Los documentos y evidencias del proyecto se encuentran en la carpeta `docs/`:

- `informe-corte3.pdf`: informe técnico del proyecto.
- `manual.md`: manual de usuario.
- `seguridad.md`: documentación de seguridad.
- `politicas-ia.md`: políticas para el uso futuro de inteligencia artificial.
- `pruebas.md`: documentación de pruebas y validaciones.

## Repositorio

**GitHub:** https://github.com/Brayanc09/Redes-WAN---Carvajal

**Versión:** NetBuilding V3 – 3.0.0

**Rama de desarrollo:** `feature/corte3`

---

*Proyecto académico desarrollado como herramienta de apoyo para el diseño y la documentación de infraestructuras de redes WAN y LAN.*