# Gestor de Redes WAN

Plataforma académica para el diseño, direccionamiento, planificación, visualización y seguridad de redes WAN. Permite calcular subredes mediante VLSM, organizar segmentos de red, diseñar topologías y generar plantillas de configuración para equipos de diferentes fabricantes.

## Versión actual

**Gestor de Redes WAN — V3**

## Objetivo del proyecto

Facilitar el diseño y la administración de redes mediante herramientas de planificación de infraestructura, direccionamiento IPv4, segmentación mediante VLAN, representación de topologías y generación de configuraciones para equipos de diferentes fabricantes.

## Funcionalidades desarrolladas

1. **Requerimientos de red:** registro y cálculo de usuarios, dispositivos, infraestructura y necesidades de conectividad.
2. **Subnetting y VLSM:** cálculo de subredes según la cantidad de hosts requerida, con soporte para múltiples redes principales.
3. **Direccionamiento IPv4:** cálculo de máscaras, rangos de direcciones, broadcast y capacidad de las redes.
4. **Topologías:** representación lógica de la infraestructura y diseñador visual para agregar, conectar, mover, guardar y recuperar dispositivos.
5. **Configuraciones multivendor:** generación de plantillas de configuración para Cisco IOS, Huawei VRP, Fortinet FortiOS y MikroTik RouterOS.
6. **Ciberdefensa:** generación de plantillas y recomendaciones de seguridad para diferentes fabricantes, incluyendo controles de protección y comandos de verificación.

## Tecnologías utilizadas

- HTML5.
- CSS3.
- JavaScript.
- Node.js para ejecutar pruebas automatizadas.
- Git y GitHub para el control de versiones.

## Estructura del proyecto

- `frontend/`: interfaz web principal.
- `frontend/js/subnetting.js`: lógica de cálculo VLSM y direccionamiento.
- `tests/`: pruebas automatizadas.
- `docs/`: documentación y evidencias.
- `versions/`: versiones anteriores del proyecto.
- `.env.example`: ejemplo de variables de entorno.
- `.gitignore`: archivos excluidos del control de versiones.
- `CHANGELOG.md`: historial de cambios.

## Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto.
3. Abrir `frontend/index.html` en un navegador web.
4. Ingresar los requerimientos de red.
5. Ejecutar los cálculos de subnetting y VLSM.
6. Consultar las topologías y generar las plantillas de configuración disponibles.

No se requiere un servidor backend para utilizar la interfaz principal.

## Pruebas automatizadas

Se requiere Node.js para ejecutar las pruebas de VLSM.

Desde la carpeta raíz del proyecto, ejecutar:

```bash
node tests/vlsm.test.js
```

Las pruebas verifican conversiones IPv4, cálculo CIDR, asignación VLSM, múltiples redes principales, detección de solapamientos y validaciones de capacidad.

## Seguridad

- No almacenar contraseñas, tokens, claves privadas ni datos reales de clientes en el código o en Git.
- Validar los datos antes de procesarlos.
- Revisar las configuraciones generadas antes de aplicarlas en equipos reales.
- Verificar la compatibilidad de los comandos con el fabricante, modelo y versión del equipo.
- Las plantillas de ciberdefensa requieren validación antes de su ejecución.

## Limitaciones

- El direccionamiento IPv6 no forma parte del alcance implementado en esta versión.
- Las configuraciones generadas son plantillas de referencia y requieren adaptación a la infraestructura real.
- La compatibilidad de los comandos depende del modelo y versión del sistema operativo del equipo.

## Evidencias y documentación

Las capturas de pantalla y evidencias del desarrollo se encuentran en `docs/capturas/`.

## Alcance académico

Este proyecto corresponde a la versión V3 del Gestor de Redes WAN y reúne funcionalidades de planificación, direccionamiento IPv4, VLSM, diseño de topologías, generación de configuraciones multivendor y ciberdefensa.

El proyecto se desarrolla por etapas y puede ampliarse de acuerdo con los requisitos académicos.

Las configuraciones generadas deben validarse antes de utilizarse en una red de producción.