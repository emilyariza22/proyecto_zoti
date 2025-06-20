# Guía para configurar el reenvío de puertos en tu router

## Información importante
- Tu IP pública actual: 179.1.219.194
- Tu IP local: 10.2.176.242
- Puerto a reenviar: 5432 (PostgreSQL)

## Pasos para configurar el reenvío de puertos

1. **Accede a la interfaz de administración de tu router**:
   - Abre un navegador web
   - Escribe la dirección IP de tu router en la barra de direcciones (generalmente 192.168.0.1, 192.168.1.1 o similar)
   - Inicia sesión con tu nombre de usuario y contraseña del router

2. **Encuentra la sección de reenvío de puertos**:
   - Busca en el menú opciones como:
     - "Port Forwarding" / "Reenvío de puertos"
     - "Virtual Server"
     - "NAT" o "PAT"
     - "Aplicaciones y juegos"
     - "Servicios"
   - Esta sección suele encontrarse dentro de ajustes avanzados o configuración de red

3. **Crea una nueva regla de reenvío de puertos**:
   - Nombre/Descripción: PostgreSQL
   - IP interna/destino: 10.2.176.242 (tu IP local)
   - Puerto interno: 5432
   - Puerto externo: 5432
   - Protocolo: TCP
   - Estado/Habilitado: Activado/Sí

4. **Guarda la configuración**:
   - Haz clic en "Guardar", "Aplicar" o "Aceptar"
   - Es posible que el router necesite reiniciarse

## Capturas de pantalla para diferentes tipos de routers

### Para routers TP-Link:
1. Ve a "Forwarding" → "Virtual Servers"
2. Completa el formulario con los datos anteriores

### Para routers Linksys/Cisco:
1. Ve a "Applications & Gaming" → "Port Range Forward"
2. Completa la tabla con los datos anteriores

### Para routers ASUS:
1. Ve a "WAN" → "Virtual Server / Port Forwarding"
2. Completa el formulario con los datos anteriores

### Para routers Netgear:
1. Ve a "Advanced" → "Advanced Setup" → "Port Forwarding / Port Triggering"
2. Selecciona "Port Forwarding" y completa con los datos anteriores

## Verificación de la configuración

Después de configurar el reenvío de puertos:

1. **Verifica que el puerto esté abierto**:
   - Visita https://www.yougetsignal.com/tools/open-ports/
   - Ingresa tu IP pública (179.1.219.194) y el puerto (5432)
   - Si indica "Port 5432 is open on 179.1.219.194", la configuración es correcta

2. **Prueba la conexión desde otro dispositivo**:
   - Desde otro dispositivo fuera de tu red local (como usando datos móviles)
   - Intenta conectarte a la base de datos usando la IP pública

## Notas importantes

1. **IP dinámica vs estática**:
   - La mayoría de las conexiones domésticas tienen IP pública dinámica (cambia periódicamente)
   - Si tu IP cambia, deberás actualizar la información que compartes con tus compañeros
   - Puedes usar el script `scripts/update_db_connection.sh` para actualizar la documentación con tu nueva IP

2. **Seguridad**:
   - Abrir puertos aumenta ligeramente el riesgo de seguridad
   - Asegúrate de tener contraseñas fuertes para tu base de datos
   - Considera cerrar el puerto cuando no lo necesites

3. **Problemas comunes**:
   - Algunos ISP bloquean puertos por debajo del 1024
   - Algunos routers no permiten pruebas de reenvío de puertos desde dentro de la misma red local
