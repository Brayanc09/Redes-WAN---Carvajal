# Plan y resultados de pruebas – NetBuilding V3

## 1. Objetivo

Documentar las pruebas realizadas durante el desarrollo y validación de NetBuilding V3, con el propósito de comprobar el funcionamiento de sus módulos principales y registrar los resultados obtenidos.

## 2. Entorno de pruebas

| Elemento | Descripción |
|---|---|
| Aplicación | NetBuilding V3 |
| Lenguajes | HTML, CSS y JavaScript |
| Motor de direccionamiento | VLSM |
| Navegador | Google Chrome |
| Sistema de control de versiones | Git y GitHub |
| Pruebas automatizadas | Node.js |
| Rama de desarrollo | feature/corte3 |

## 3. Pruebas automatizadas de VLSM

Se ejecutaron las pruebas automatizadas mediante el siguiente comando:

```bash
node tests/vlsm.test.js
```

### 3.1. Resultados

| N.º | Prueba | Resultado |
|---|---|---|
| 1 | Conversión IPv4 a número y viceversa | Aprobada |
| 2 | Análisis de red CIDR /24 | Aprobada |
| 3 | Asignación VLSM para diferentes segmentos | Aprobada |
| 4 | Cálculo de múltiples redes principales | Aprobada |
| 5 | Cálculo de tres redes principales | Aprobada |
| 6 | Detección de capacidad insuficiente | Aprobada |
| 7 | Detección de redes superpuestas | Aprobada |
| 8 | Asignación de prefijo /31 para enlaces punto a punto | Aprobada |
| 9 | Asignación de prefijo /32 para Loopback | Aprobada |
| 10 | Normalización de direcciones CIDR de host a red | Aprobada |

**Resultado registrado:** 10 pruebas aprobadas y 0 pruebas fallidas.

Porcentaje de aprobación:

100 %

## 4. Pruebas funcionales por módulo

### 4.1. Módulo Datos

Se verificaron los campos de entrada y las validaciones de los requerimientos del proyecto.

Pruebas realizadas:

- Validación de campos obligatorios.
- Rechazo de valores negativos.
- Validación de cantidades enteras.
- Control de porcentajes de concurrencia y reserva.
- Protección del nombre del proyecto frente a contenido HTML no confiable.
- Generación de segmentos a partir de los requerimientos.

**Resultado:** Las validaciones y la generación de segmentos fueron verificadas satisfactoriamente.

### 4.2. Módulo Subnetting

Se comprobó el funcionamiento del cálculo IPv4 y la asignación VLSM.

Pruebas realizadas:

- Cálculo de subredes.
- Distribución de hosts.
- Cálculo de máscara y broadcast.
- Uso de múltiples redes principales.
- Validación de capacidad.
- Detección de superposición de redes.
- Recalculación después de modificar los datos de entrada.

**Resultado:** Funcionamiento validado mediante pruebas automatizadas y pruebas funcionales.

### 4.3. Módulo Topología

Se verificaron las funciones del diseñador visual.

Pruebas realizadas:

- Agregar dispositivos.
- Seleccionar y mover dispositivos.
- Conectar equipos.
- Rechazar conexiones duplicadas.
- Rechazar conexiones de un dispositivo consigo mismo.
- Eliminar dispositivos y sus conexiones.
- Guardar y recuperar topologías.
- Limpiar el área de trabajo.
- Visualizar diferentes tipos de dispositivos.

**Resultado:** Las operaciones del diseñador visual fueron probadas satisfactoriamente.

### 4.4. Módulo Configuración

Se verificó la generación de plantillas para los siguientes fabricantes:

- Cisco IOS / IOS XE.
- Huawei VRP.
- Fortinet FortiOS.
- MikroTik RouterOS.

Se comprobó que la herramienta generara las plantillas correspondientes según el fabricante seleccionado.

**Resultado:** Los cuatro fabricantes fueron probados y sus resultados revisados.

### 4.5. Módulo Ciberdefensa

Se verificó la selección de controles de seguridad, el análisis de recomendaciones y la generación de plantillas.

Controles revisados:

- SSH.
- Port Security.
- DHCP Snooping.
- BPDU Guard.
- Storm Control.
- Dynamic ARP Inspection.
- ACL.

También se revisaron las advertencias sobre compatibilidad, adaptación y validación de comandos antes de su aplicación.

**Resultado:** Las plantillas y recomendaciones de ciberdefensa fueron probadas para los fabricantes disponibles.

## 5. Pruebas de validación y seguridad

Se realizaron verificaciones relacionadas con:

- Entradas inválidas.
- Direcciones IPv4 y CIDR incorrectas.
- Cálculo sin segmentos válidos.
- Validación de parámetros de entrada.
- Protección del nombre del proyecto frente a contenido HTML.
- Exclusión de archivos de entorno y copias de seguridad mediante Git.

**Resultado:** Las validaciones revisadas funcionaron según lo esperado.

## 6. Evidencias de pruebas

Las evidencias visuales se encuentran en el directorio `docs/capturas/`.

| Archivo | Evidencia |
|---|---|
| 01_dashboard_vlsm.png | Interfaz principal y módulo VLSM |
| 02_resultado_vlsm.png | Resultado del cálculo VLSM |
| 03_pruebas_10_de_10.png | Resultado de pruebas automatizadas |
| 04_rama_github.png | Rama de desarrollo en GitHub |
| 05_pull_request.png | Evidencia del Pull Request |
| 06-config-cisco.png | Generación de configuración Cisco |
| 07-config-huawei.png | Generación de configuración Huawei |

Las capturas adicionales de Fortinet, MikroTik, ciberdefensa, pruebas y aplicación final se incorporarán cuando estén tomadas y verificadas.

## 7. Limitaciones de las pruebas

- No se realizaron pruebas de despliegue automático sobre equipos de producción.
- Las plantillas de configuración requieren validación según el modelo y versión del fabricante.
- IPv6 no forma parte de la implementación validada.
- No se realizaron pruebas de integración con un agente de inteligencia artificial, ya que no está incorporado en la versión actual.
- Las pruebas automatizadas disponibles se concentran en el motor VLSM.

## 8. Conclusión

Las pruebas realizadas permitieron verificar el funcionamiento de los módulos principales de NetBuilding V3 y detectar errores durante el desarrollo.

El motor VLSM obtuvo 10 resultados aprobados de 10 pruebas ejecutadas. Los módulos de topología, generación de configuraciones y ciberdefensa también fueron sometidos a pruebas funcionales.

Los resultados y las evidencias permiten documentar el estado de validación alcanzado por la herramienta en esta versión.

**Documento de pruebas – NetBuilding V3.**