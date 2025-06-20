# Guía Completa para Acceso Remoto a la Base de Datos

Este documento explica todas las opciones disponibles para permitir que tus compañeros se conecten remotamente a la base de datos PostgreSQL.

## Índice
1. [Opción 1: Reenvío de puertos (Port Forwarding)](#opción-1-reenvío-de-puertos)
2. [Opción 2: Usar Ngrok (Solución más sencilla)](#opción-2-usar-ngrok)
3. [Opción 3: Mover la base de datos a la nube](#opción-3-mover-la-base-de-datos-a-la-nube)
4. [Solución de problemas comunes](#solución-de-problemas-comunes)

## Opción 1: Reenvío de puertos

Esta opción requiere configurar tu router para reenviar el puerto 5432 a tu máquina local.

### Pasos a seguir:

1. **Encuentra tu dirección IP local**:
   ```bash
   ip addr show | grep 'inet ' | grep -v '127.0.0.1'
   ```
   
2. **Accede a la configuración de tu router**:
   - Abre un navegador y navega a la IP de tu router (generalmente 192.168.0.1 o 192.168.1.1)
   - Inicia sesión con tus credenciales
   
3. **Configura el reenvío de puertos**:
   - Busca la sección "Port Forwarding" o "Reenvío de puertos"
   - Añade una nueva regla:
     - Nombre: PostgreSQL
     - Puerto externo: 5432
     - IP interna: [Tu IP local]
     - Puerto interno: 5432
     - Protocolo: TCP
   - Guarda la configuración

4. **Comparte tu IP pública con tus compañeros**:
   - Tu IP pública actual es: 179.1.219.194
   - Para actualizar este valor si cambia: `scripts/update_db_connection.sh`

### Ventajas:
- Conexión directa y estable
- No requiere herramientas adicionales

### Desventajas:
- Requiere acceso al router
- Tu IP pública puede cambiar
- Algunos ISP bloquean ciertos puertos

## Opción 2: Usar Ngrok

Ngrok crea un túnel seguro desde Internet a tu máquina local, evitando la necesidad de configurar el reenvío de puertos.

### Pasos a seguir:

1. **Registrarse en ngrok**:
   - Ve a [https://ngrok.com](https://ngrok.com) y crea una cuenta gratuita
   - Obtén tu token de autenticación del panel de control

2. **Autenticar ngrok**:
   ```bash
   ~/ngrok/ngrok config add-authtoken TU_TOKEN_DE_NGROK
   ```

3. **Iniciar el túnel**:
   ```bash
   ~/start_ngrok_tunnel.sh
   ```
   
4. **Compartir los datos de conexión**:
   - Cuando inicie el túnel, te mostrará una dirección como: `tcp://0.tcp.ngrok.io:12345`
   - Comparte esta dirección y puerto con tus compañeros
   - Los demás datos de conexión (usuario, contraseña, nombre de la base de datos) siguen siendo los mismos

### Ventajas:
- Muy fácil de configurar
- No requiere acceso al router
- Funciona incluso con IPs dinámicas o detrás de firewalls corporativos

### Desventajas:
- En la versión gratuita, la dirección cambia cada vez que reinicias el túnel
- Hay límites de tiempo y ancho de banda en la versión gratuita

## Opción 3: Mover la base de datos a la nube

Esta es la solución más robusta para un entorno de producción o desarrollo continuo.

### Opciones disponibles:

1. **Servicios gratuitos o de bajo costo**:
   - [ElephantSQL](https://www.elephantsql.com/) - Tiene un plan gratuito
   - [Supabase](https://supabase.io/) - Tiene un plan gratuito
   - [Railway](https://railway.app/) - Tiene un plan gratuito/económico

2. **Servicios más robustos**:
   - AWS RDS
   - Google Cloud SQL
   - Azure Database for PostgreSQL

### Ventajas:
- Disponibilidad 24/7
- No depende de tu conexión a Internet
- Mayor seguridad y respaldo

### Desventajas:
- Puede tener un costo
- Requiere migrar la base de datos

## Solución de problemas comunes

### 1. "Connection refused" al intentar conectar

**Posibles causas**:
- PostgreSQL no está ejecutándose
- El firewall está bloqueando el puerto
- La IP o puerto son incorrectos

**Soluciones**:
- Verifica que el contenedor esté ejecutándose: `docker ps | grep postgres`
- Verifica la configuración del firewall: `sudo firewall-cmd --list-ports`
- Verifica que PostgreSQL esté escuchando en todas las interfaces: `docker exec zoti_postgres psql -U admin -d zoti_db -c "SHOW listen_addresses;"`

### 2. "Connection timed out" al intentar conectar

**Posibles causas**:
- El reenvío de puertos no está configurado correctamente
- Tu ISP está bloqueando el puerto

**Soluciones**:
- Verifica la configuración de reenvío de puertos en tu router
- Intenta con un puerto diferente (ej: 54321) y actualiza el reenvío
- Usa ngrok como alternativa

### 3. Problemas de autenticación

**Posibles causas**:
- Credenciales incorrectas
- Configuración incorrecta de pg_hba.conf

**Soluciones**:
- Verifica las credenciales
- Verifica la configuración de autenticación: `docker exec zoti_postgres grep "host all all" /var/lib/postgresql/data/pg_hba.conf`

## Contacto para soporte

Si sigues teniendo problemas, contacta a Emily para obtener ayuda.
