# CHANGELOG

## V2.2.0 - Base del proyecto
- Se conserva el dashboard completo de V2.1.1.
- Se organiza la estructura del proyecto.
- Se agrega `.gitignore`.
- Se agrega `.env.example`.
- Se agrega documentación inicial.
- Se crea espacio para pruebas y versiones.
- No se modifica todavía la lógica funcional del dashboard.

## V2.2.0-A5
- Integrado el motor VLSM DEV-001 al dashboard en la sección IP/VLAN.
- Soporte para múltiples redes principales y segmentos dinámicos.
- Tabla de resultados VLSM con CIDR, red, hosts, broadcast y capacidad.
- Se conserva el dashboard existente y el backup V2.1.1.
## V3.0.0 - Mejoras y consolidación del proyecto

- Modernización de la interfaz gráfica con diseño visual.
- Mejoras en el módulo de requerimientos y validación de datos.
- Protección de entradas del usuario frente a inyección HTML.
- Mejoras en el motor VLSM y soporte para múltiples redes principales.
- Incorporación de pruebas automatizadas para validar los cálculos VLSM.
- Implementación de diseñador visual de topologías con creación, movimiento, conexión y eliminación de dispositivos.
- Incorporación de almacenamiento y recuperación de topologías.
- Generación de plantillas de configuración para Cisco IOS, Huawei VRP, Fortinet FortiOS y MikroTik RouterOS.
- Mejoras en las plantillas de ciberdefensa multivendor.
- Incorporación de recomendaciones y comandos de verificación.
- Validación de datos de entrada en los módulos principales.
- Organización y documentación del proyecto para su entrega académica.

### Estado de pruebas

- Pruebas automatizadas VLSM: 10 exitosas, 0 fallidas.
- Validación funcional de los módulos principales realizada.

### Limitaciones conocidas

- Las configuraciones generadas son plantillas que requieren validación y adaptación antes de ejecutarse en equipos reales.