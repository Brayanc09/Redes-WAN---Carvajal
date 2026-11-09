# Seguridad de la aplicación – NetBuilding V3

## 1. Introducción

NetBuilding V3 incorpora medidas de seguridad orientadas a proteger la información ingresada, validar los datos utilizados en los cálculos y reducir los riesgos asociados con la generación de configuraciones de red.

Estas medidas forman parte del desarrollo académico de la herramienta y buscan promover buenas prácticas de seguridad durante su utilización.

## 2. Validación de entradas

Se implementaron validaciones para evitar que los datos incorrectos afecten los procesos de la aplicación.

Entre las validaciones realizadas se encuentran:

- Verificación de campos obligatorios.
- Validación de cantidades enteras y no negativas.
- Comprobación de valores mínimos y máximos.
- Validación del nombre del equipo utilizado en las configuraciones.
- Comprobación de redes IPv4 y prefijos CIDR.
- Validación de la cantidad de hosts solicitados.
- Detección de redes superpuestas.
- Verificación de capacidad disponible antes de asignar subredes.

Estas comprobaciones permiten controlar entradas incorrectas antes de procesarlas.

## 3. Protección contra inyección de código

Se incorporó protección para el nombre del proyecto cuando se presenta dinámicamente en la interfaz.

Los caracteres especiales que pueden interpretarse como HTML se escapan antes de insertarse en el contenido correspondiente.

También se utilizan propiedades como `textContent` y `createTextNode` en diferentes elementos dinámicos para presentar información sin interpretarla directamente como código HTML.

Estas medidas reducen el riesgo de ataques de Cross-Site Scripting (XSS) asociados con entradas controladas por el usuario.

## 4. Protección de información sensible

El proyecto incorpora las siguientes recomendaciones:

- No almacenar contraseñas reales en el código fuente.
- No publicar tokens, claves privadas ni credenciales en GitHub.
- Mantener el archivo `.env` fuera del repositorio.
- Utilizar `.env.example` como referencia de variables de entorno.
- No introducir información confidencial en los campos de la aplicación.
- Revisar los archivos antes de realizar un commit.

El archivo `.gitignore` excluye archivos de entorno y otros elementos que no deben publicarse.

## 5. Seguridad en las configuraciones de red

Las configuraciones generadas por NetBuilding V3 son plantillas de referencia.

Para reducir riesgos durante su utilización, se incorporaron las siguientes recomendaciones:

- Verificar el fabricante, modelo y versión del sistema operativo.
- Revisar las interfaces y VLAN antes de aplicar comandos.
- Realizar respaldos de las configuraciones existentes.
- Validar los comandos en un entorno de laboratorio.
- Revisar los comandos de verificación disponibles.
- Evitar aplicar configuraciones incompletas o incompatibles.

La herramienta advierte que las plantillas deben revisarse antes de utilizarlas en dispositivos reales.

## 6. Medidas de ciberdefensa contempladas

El módulo de ciberdefensa incluye recomendaciones y plantillas relacionadas con:

- Administración segura mediante SSH.
- Port Security.
- DHCP Snooping.
- BPDU Guard.
- Storm Control.
- Dynamic ARP Inspection.
- Listas de control de acceso (ACL).

La disponibilidad y sintaxis de estos controles dependen del fabricante, modelo y versión del equipo.

En MikroTik, por ejemplo, algunas recomendaciones utilizan mecanismos propios de RouterOS que no equivalen directamente a las funciones de otras plataformas.

## 7. Seguridad en Git y GitHub

Para proteger el repositorio se utilizan las siguientes prácticas:

- Exclusión de archivos `.env`.
- Conservación de `.env.example` como plantilla.
- Exclusión de archivos temporales y copias de seguridad.
- Uso de ramas para organizar el desarrollo.
- Registro de cambios mediante commits.
- Revisión del estado del repositorio antes de publicar modificaciones.

## 8. Limitaciones de seguridad

NetBuilding V3 es una herramienta académica y no reemplaza una plataforma profesional de administración de infraestructura.

Actualmente:

- No administra credenciales de dispositivos.
- No establece sesiones SSH ni conexiones directas con los equipos.
- No aplica automáticamente configuraciones.
- No dispone de autenticación de usuarios ni control de acceso por roles.
- No realiza auditorías automáticas de dispositivos reales.
- No garantiza que una plantilla sea compatible con todos los modelos de un fabricante.

Por lo anterior, las configuraciones y recomendaciones deben ser verificadas por personal técnico antes de su implementación.

## 9. Conclusión

Las medidas incorporadas en NetBuilding V3 buscan mejorar la validación de información, reducir riesgos de inyección de código, proteger los archivos del proyecto y promover configuraciones de red más seguras.

La herramienta también fomenta el uso de buenas prácticas de ciberdefensa mediante recomendaciones adaptadas a diferentes fabricantes.

**Documento de seguridad – NetBuilding V3.**