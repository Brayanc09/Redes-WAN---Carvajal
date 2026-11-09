# Políticas de ciberdefensa contra riesgos de inteligencia artificial – NetBuilding V3

## 1. Objetivo

Establecer políticas de seguridad para prevenir riesgos relacionados con el uso de herramientas de inteligencia artificial durante el diseño, análisis y generación de configuraciones de redes mediante NetBuilding V3.

Estas políticas buscan proteger la información, evitar configuraciones inseguras y mantener la supervisión humana sobre las decisiones técnicas.

## 2. Alcance

Estas políticas aplican al uso académico y técnico de NetBuilding V3, incluyendo:

- Registro de requerimientos de red.
- Cálculo de direccionamiento IPv4 mediante VLSM.
- Diseño de topologías.
- Generación de configuraciones multivendor.
- Análisis y generación de recomendaciones de ciberdefensa.
- Consulta de herramientas externas de inteligencia artificial como apoyo al desarrollo o análisis.

**Estado actual:** NetBuilding V3 no incorpora un agente de inteligencia artificial conectado ni ejecuta acciones autónomas sobre equipos de red. Estas políticas establecen medidas preventivas para el uso de IA como herramienta de apoyo y para futuras integraciones.

## 3. Protección de información sensible

**Política:** No se permite compartir información confidencial de infraestructura con herramientas de inteligencia artificial externas.

Medidas:

- No introducir contraseñas, tokens ni claves privadas.
- No compartir credenciales de administración de routers, switches o firewalls.
- No proporcionar direcciones IP públicas reales cuando permitan identificar infraestructura sensible.
- Utilizar datos ficticios o anonimizados para realizar pruebas.
- No almacenar secretos dentro del código fuente ni en el repositorio GitHub.

## 4. Validación de instrucciones y entradas

**Política:** Toda información recibida de usuarios o generada mediante herramientas de IA debe ser revisada antes de utilizarse.

Medidas:

- Validar los campos obligatorios.
- Comprobar los formatos de direcciones IPv4 y CIDR.
- Rechazar cantidades de hosts inválidas.
- Detectar redes superpuestas.
- Validar los nombres y parámetros utilizados para generar configuraciones.
- No ejecutar instrucciones externas sin comprender su propósito.

La herramienta incorpora validaciones de entradas para controlar datos incorrectos antes de procesarlos.

## 5. Prevención de inyección de instrucciones (Prompt Injection)

**Política:** Las instrucciones provenientes de textos externos, documentos o resultados de IA no deben considerarse automáticamente confiables.

Medidas preventivas:

- No ejecutar comandos sugeridos sin revisión técnica.
- No permitir que instrucciones externas modifiquen las políticas de seguridad.
- No compartir información sensible como respuesta a solicitudes inesperadas.
- Revisar los comandos antes de copiarlos a un dispositivo.
- Mantener la supervisión humana sobre cualquier decisión que afecte la infraestructura.

## 6. Validación de configuraciones generadas por IA

**Política:** Ninguna configuración generada por IA debe aplicarse directamente sobre equipos de producción sin validación.

Medidas:

1. Identificar fabricante, modelo y versión del equipo.
2. Revisar la sintaxis de los comandos.
3. Verificar interfaces, VLAN y direccionamiento.
4. Comprobar que no existan reglas que permitan accesos innecesarios.
5. Realizar un respaldo de la configuración actual.
6. Probar los cambios en un entorno controlado.
7. Autorizar la implementación mediante personal técnico responsable.

Las plantillas generadas por NetBuilding V3 también requieren este procedimiento de validación.

## 7. Control de acceso y privilegios

**Política:** Las herramientas de IA no deben recibir privilegios de administración sobre la infraestructura de red sin controles y autorización explícitos.

Medidas:

- Aplicar el principio de mínimo privilegio.
- Restringir el acceso administrativo a personal autorizado.
- Utilizar SSH en lugar de Telnet cuando la plataforma lo permita.
- Restringir los orígenes desde los cuales se permite la administración.
- No entregar credenciales de dispositivos a herramientas externas.
- Mantener la aprobación humana antes de realizar cambios.

## 8. Protección contra configuraciones inseguras

**Política:** Las recomendaciones de IA deben analizarse para identificar errores, configuraciones incompletas o medidas que reduzcan la seguridad de la red.

Se deben revisar especialmente:

- ACL demasiado permisivas.
- Puertos administrativos expuestos.
- VLAN sin segmentación adecuada.
- Servicios innecesarios habilitados.
- Reglas de firewall incorrectas.
- Configuraciones incompatibles con el fabricante.
- Ausencia de mecanismos de autenticación y control.

En NetBuilding V3 se incluyen advertencias para revisar las plantillas según el modelo, versión y topología antes de aplicarlas.

## 9. Supervisión humana

**Política:** Las decisiones finales relacionadas con direccionamiento, seguridad y configuración de equipos deben permanecer bajo responsabilidad de una persona técnicamente capacitada.

La inteligencia artificial puede utilizarse como apoyo para:

- Explicar comandos.
- Analizar configuraciones.
- Identificar posibles errores.
- Proponer recomendaciones.
- Documentar procedimientos.

Sin embargo, sus resultados no sustituyen la validación técnica ni la autorización del responsable de la red.

## 10. Tratamiento de errores y resultados incorrectos

**Política:** Toda recomendación o resultado que presente inconsistencias debe ser revisado y corregido antes de utilizarse.

Medidas:

- Contrastar los resultados con la documentación del fabricante.
- Verificar las operaciones de direccionamiento.
- Comprobar la compatibilidad de los comandos.
- Rechazar configuraciones que no puedan justificarse técnicamente.
- Registrar los errores encontrados durante las pruebas.

## 11. Aplicación en NetBuilding V3

Las medidas implementadas que respaldan estas políticas incluyen:

- Validación de entradas y parámetros.
- Protección del nombre del proyecto frente a inserción de HTML no confiable.
- Uso de mecanismos seguros de presentación de datos como `textContent`.
- Exclusión de archivos de entorno y secretos mediante `.gitignore`.
- Plantillas de ciberdefensa para Cisco, Huawei, Fortinet y MikroTik.
- Advertencias para revisar las configuraciones antes de aplicarlas.
- Recomendaciones de SSH, Port Security, DHCP Snooping, BPDU Guard, Storm Control, DAI y ACL.

Estas funciones no representan una integración de IA ni una protección automática frente a todos los ataques basados en inteligencia artificial.

## 12. Limitaciones y mejoras futuras

Para una futura integración de un agente de inteligencia artificial se recomienda:

- Validar las instrucciones antes de procesarlas.
- Evitar el envío de secretos a servicios externos.
- Separar la generación de comandos de su ejecución.
- Implementar revisión de sintaxis y compatibilidad por fabricante.
- Incorporar autorización humana antes de cualquier acción.
- Registrar las solicitudes y resultados relevantes.
- Limitar los permisos y recursos disponibles para el agente.
- Realizar pruebas específicas contra prompt injection y generación de configuraciones inseguras.

## 13. Conclusión

Las políticas de ciberdefensa de NetBuilding V3 establecen criterios para utilizar herramientas de inteligencia artificial de manera responsable, proteger la información de infraestructura y evitar la aplicación de configuraciones inseguras.

La validación técnica, la protección de datos y la supervisión humana son principios fundamentales para mantener la seguridad de la herramienta y de las redes que se diseñan con ella.

**Documento de políticas de IA – NetBuilding V3.**