# Gestor de Redes WAN

Plataforma académica para el diseño, direccionamiento, configuración y seguridad de redes WAN. Permite planificar redes, calcular subredes mediante VLSM, visualizar topologías y generar plantillas de configuración para equipos de red.

## Versión actual

Gestor de Redes WAN — V3

## Objetivo del proyecto

Facilitar el diseño y la administración de redes mediante herramientas de direccionamiento IP, planificación de VLAN, representación de topologías y generación de configuraciones para equipos de diferentes fabricantes.

## Funcionalidades desarrolladas

1. **Requerimientos de red:** registro de usuarios, dispositivos y necesidades de conectividad.
2. **Subnetting VLSM:** cálculo de subredes según la cantidad de hosts requerida.
3. **Topología:** representación lógica de la red y sus segmentos.
4. **Configuraciones:** generación de plantillas para Cisco IOS y Huawei VRP.
5. **Ciberdefensa:** módulo contemplado en el proyecto, cuyo alcance se ampliará progresivamente.

## Tecnologías utilizadas

- HTML, CSS y JavaScript.
- Node.js para ejecutar pruebas automatizadas.
- Git y GitHub para el control de versiones.

## Estructura del proyecto

- `frontend/`: interfaz web.
- `frontend/js/subnetting.js`: lógica de cálculo VLSM.
- `tests/`: pruebas automatizadas.
- `docs/`: documentación y evidencias.
- `versions/`: versiones anteriores del proyecto.

## Cómo ejecutar el proyecto

1. Abrir `frontend/index.html` en un navegador web.
2. Ingresar los requerimientos de red.
3. Ejecutar el cálculo de subnetting y revisar los resultados.
4. Consultar la topología y generar las plantillas de configuración disponibles.

Para ejecutar las pruebas automatizadas, instala Node.js y ejecuta desde la carpeta raíz:

```bash
node tests/vlsm.test.js
```

## Seguridad

- No almacenar contraseñas, tokens, claves privadas ni datos reales de clientes en el código o en Git.
- Validar los datos antes de procesarlos.
- Revisar las configuraciones generadas antes de aplicarlas en equipos reales.
- Verificar la compatibilidad de los comandos con el modelo y la versión del equipo.

## Evidencias y documentación

Las capturas de pantalla se encuentran en `docs/capturas/`.

## Alcance académico

Este proyecto se desarrolla por etapas. Las funcionalidades documentadas corresponden al avance actual y se ampliarán de acuerdo con los requisitos de los siguientes cortes académicos.

Las configuraciones generadas son plantillas y deben validarse antes de utilizarse en una red de producción.