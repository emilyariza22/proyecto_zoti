# Instrucciones para Conexión Remota a la Base de Datos

## Datos de Conexión

Para conectarse a nuestra base de datos de forma remota, necesitarás los siguientes datos:

- **Host/IP:** 179.1.219.194
- **Puerto:** 5432
- **Base de datos:** zoti_db
- **Usuario:** admin
- **Contraseña:** zoti360

## Pasos para Conectarse desde tu Computadora

### 1. Usando el archivo .env (para desarrolladores del proyecto)

Si eres parte del equipo de desarrollo, modifica tu archivo `/backend/.env` con estos valores:

```
DB_HOST=179.1.219.194
DB_PORT=5432
DB_NAME=zoti_db
DB_USER=admin
DB_PASSWORD=zoti360
PORT=3002
```

Después reinicia tu servidor backend.

### 2. Probando la conexión con psql (línea de comandos)

Si tienes PostgreSQL instalado en tu máquina, puedes probar la conexión con este comando:

```bash
psql -h 179.1.219.194 -p 5432 -U admin -d zoti_db
```

Se te pedirá la contraseña: `zoti360`

### 3. Usando herramientas gráficas

#### Con pgAdmin

1. Abre pgAdmin
2. Haz clic derecho en "Servers" y selecciona "Create" > "Server..."
3. En la pestaña "General", escribe un nombre descriptivo como "Zoti DB Remota"
4. En la pestaña "Connection":
   - Host: `179.1.219.194`
   - Port: `5432`
   - Maintenance database: `zoti_db`
   - Username: `admin`
   - Password: `zoti360`
5. Guarda y la conexión debería establecerse

#### Con DBeaver

1. Haz clic en "Nueva Conexión"
2. Selecciona "PostgreSQL"
3. Rellena los datos:
   - Host: `179.1.219.194`
   - Puerto: `5432`
   - Base de datos: `zoti_db`
   - Usuario: `admin`
   - Contraseña: `zoti360`
4. Prueba la conexión y guarda

## Solución de Problemas

Si no puedes conectarte:

1. **Verifica tu conexión a Internet**: Asegúrate de tener una conexión estable.

2. **Verifica que el servidor esté encendido**: Pregunta al administrador (Emily) si el servidor está funcionando.

3. **Problemas de firewall**: Si tienes un firewall corporativo o en tu red, puede que esté bloqueando las conexiones al puerto 5432.

4. **Cambia de red**: Algunas redes (especialmente las públicas como cafeterías) pueden bloquear estos puertos por seguridad.

## Notas de Seguridad

Esta configuración es para entorno de desarrollo. En un entorno de producción:

- Usaríamos SSL/TLS para encriptar las conexiones
- Limitaríamos el acceso por IP
- Usaríamos contraseñas más robustas
- Implementaríamos VPN para conexiones remotas

## Contacto para Soporte

Si tienes problemas para conectarte, contacta a Emily para obtener ayuda.
