# Manual de usuario – NetBuilding V3

## 1. Descripción general

NetBuilding V3 es una herramienta académica desarrollada con HTML, CSS y JavaScript para apoyar el diseño y la planificación de redes WAN.

Permite registrar los requerimientos de infraestructura, calcular direccionamiento IPv4 mediante VLSM, visualizar topologías, generar plantillas de configuración para diferentes fabricantes y consultar recomendaciones de ciberdefensa.

La herramienta genera resultados y plantillas de referencia. No establece conexiones directas ni configura automáticamente los dispositivos de red.

## 2. Requisitos previos

Para utilizar la aplicación se necesita:

- Un computador con Windows, Linux o macOS.
- Un navegador web actualizado, como Google Chrome, Microsoft Edge o Firefox.
- Los archivos completos del proyecto NetBuilding V3.
- Node.js instalado únicamente si se desea ejecutar las pruebas automatizadas.

## 3. Instalación y ejecución

### 3.1. Descargar el proyecto

1. Ingresar al repositorio de GitHub.
2. Descargar el proyecto como archivo ZIP o clonarlo utilizando Git:

```bash
git clone https://github.com/Brayanc09/Redes-WAN---Carvajal.git
```

3. Abrir la carpeta del proyecto.

### 3.2. Ejecutar la herramienta

1. Ingresar a la carpeta `frontend`.
2. Localizar el archivo `index.html`.
3. Abrirlo con un navegador web.
4. Esperar a que cargue la interfaz principal de NetBuilding V3.

La aplicación funciona desde el navegador y utiliza el archivo `frontend/js/subnetting.js` como motor de cálculo VLSM.

No requiere configurar una base de datos ni introducir credenciales para su funcionamiento local.

## 4. Uso de la herramienta

La interfaz está organizada en cinco módulos principales.

### 4.1. Módulo Datos

Este módulo permite registrar los requerimientos generales del proyecto de red.

Se pueden ingresar los siguientes datos:

- Nombre del proyecto.
- Número de sedes.
- Pisos por sede.
- Áreas o unidades por piso.
- Usuarios por área.
- Dispositivos por usuario.
- Cámaras por área.
- Teléfonos IP por usuario.
- Cantidad de servidores.
- Mbps por usuario.
- Porcentaje de concurrencia.
- Reserva de capacidad.
- Uplink mínimo.
- Red IPv4 principal.

Una vez ingresada la información, se utiliza la opción **Generar segmentos desde requerimientos** para preparar los segmentos que serán utilizados en el cálculo VLSM.

### 4.2. Módulo Subnetting

Este módulo permite trabajar con redes principales y segmentos de red.

Procedimiento:

1. Agregar una red principal IPv4.
2. Asignarle un nombre.
3. Ingresar los segmentos necesarios.
4. Definir la cantidad de hosts requerida para cada segmento.
5. Revisar los datos ingresados.
6. Seleccionar **Calcular VLSM**.

El motor calcula automáticamente los prefijos y la distribución de direcciones IPv4.

Los resultados incluyen:

- Dirección de red.
- Prefijo CIDR.
- Máscara de subred.
- Cantidad de hosts solicitados.
- Cantidad de hosts disponibles.
- Primer host disponible.
- Último host disponible.
- Dirección de broadcast.

El módulo permite trabajar con múltiples redes principales y validar situaciones como falta de capacidad o superposición de redes.

### 4.3. Módulo Topología

Este módulo presenta dos funcionalidades.

**Topología lógica automática**

Muestra la estructura general de una red:

Internet/WAN → Firewall → Router/Gateway → Core Switch → Segmentos de red.

Los segmentos calculados mediante VLSM se incorporan a esta representación.

**Diseñador visual de topologías**

Permite construir una representación personalizada de la infraestructura.

Procedimiento:

1. Seleccionar el tipo de dispositivo.
2. Ingresar su nombre.
3. Seleccionar el fabricante.
4. Especificar el modelo.
5. Presionar **Agregar equipo**.
6. Seleccionar los dispositivos que se desean conectar.
7. Presionar **Conectar equipos**.

Los dispositivos se pueden seleccionar, mover y eliminar.

También se encuentran disponibles las opciones:

- Guardar diseño.
- Cargar diseño guardado.
- Limpiar topología.

El diseño se guarda localmente mediante el almacenamiento del navegador (localStorage).

### 4.4. Módulo Configuración

Este módulo genera plantillas iniciales de configuración según el fabricante seleccionado.

Fabricantes disponibles:

- Cisco IOS / IOS XE.
- Huawei VRP.
- Fortinet FortiOS.
- MikroTik RouterOS.

Procedimiento:

1. Calcular previamente el VLSM.
2. Seleccionar el fabricante.
3. Ingresar el nombre del equipo.
4. Definir la interfaz de acceso.
5. Seleccionar la VLAN de acceso.
6. Ingresar la interfaz troncal cuando corresponda.
7. Presionar **Generar configuración**.
8. Revisar el resultado generado.

Las plantillas incluyen comandos de referencia y, según el fabricante, comandos de verificación.

Se deben revisar los nombres de interfaces, las VLAN, el modelo y la versión del sistema operativo antes de utilizar los comandos.

### 4.5. Módulo Ciberdefensa

Este módulo permite analizar controles de seguridad y generar recomendaciones o plantillas de referencia para los fabricantes disponibles.

Los controles contemplados son:

- Administración segura mediante SSH.
- Port Security.
- DHCP Snooping.
- BPDU Guard.
- Storm Control.
- Dynamic ARP Inspection.
- Listas de control de acceso (ACL).

Procedimiento:

1. Seleccionar el fabricante.
2. Marcar los controles de seguridad que se desean analizar.
3. Presionar **Analizar controles seleccionados**.
4. Revisar las recomendaciones presentadas.
5. Presionar **Generar recomendaciones y comandos**.
6. Revisar el resultado generado.
7. Utilizar las opciones de copiar o descargar la plantilla cuando sea necesario.

Las recomendaciones y comandos dependen del fabricante. Algunas medidas pueden requerir configuraciones específicas del modelo o de la versión del sistema operativo.

## 5. Pruebas automatizadas

El proyecto incorpora pruebas para validar el motor VLSM.

Para ejecutarlas se requiere tener Node.js instalado.

Desde la carpeta raíz del proyecto, abrir una terminal y ejecutar:

```bash
node tests/vlsm.test.js
```

El resultado esperado de la versión validada es:

- 10 pruebas aprobadas.
- 0 pruebas fallidas.

Las pruebas cubren conversiones IPv4, análisis CIDR, asignación VLSM, múltiples redes, capacidad insuficiente, superposición de redes y prefijos especiales.

## 6. Recomendaciones de uso

- Verificar los datos ingresados antes de realizar los cálculos.
- Utilizar redes IPv4 válidas y segmentos con cantidades de hosts correctas.
- Revisar los resultados de VLSM antes de generar configuraciones.
- Comprobar que las VLAN y las interfaces correspondan al equipo que se va a configurar.
- Realizar respaldos antes de aplicar cambios en dispositivos reales.
- Validar los comandos en un laboratorio o entorno de pruebas.
- No ingresar contraseñas, tokens ni información confidencial.
- Conservar copias de los diseños importantes.

## 7. Limitaciones

- Las configuraciones generadas son plantillas de referencia y requieren adaptación.
- No existe conexión automática con routers, switches o firewalls.
- No reemplaza la validación técnica del administrador de red.
- La topología visual es una representación gráfica y no una simulación de tráfico.
- Las recomendaciones de ciberdefensa deben verificarse según las capacidades de cada plataforma.

## 8. Estructura del proyecto

```text
NetBuilding_V3/
│
├── frontend/
│   ├── index.html
│   └── js/
│       └── subnetting.js
│
├── tests/
│   ├── vlsm.test.js
│   └── vlsm_test.html
│
├── docs/
│   ├── capturas/
│   └── informe-corte2.pdf
│
├── versions/
├── .env.example
├── .gitignore
├── CHANGELOG.md
└── README.md
```

## 9. Control de versiones

El proyecto utiliza Git y GitHub para mantener el historial de cambios y respaldar el desarrollo.

Repositorio:

https://github.com/Brayanc09/Redes-WAN---Carvajal

Rama de desarrollo:

`feature/corte3`

---

**Fin del manual de usuario – NetBuilding V3.**