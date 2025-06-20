# Guía para conectarse a la base de datos remota

Esta guía te permitirá conectarte a la base de datos PostgreSQL del proyecto Zoti que está alojada en el servidor de Emily.

## Datos de conexión

Utiliza la siguiente información para conectarte:

- **Host/IP:** 179.1.219.194
- **Puerto:** 5432
- **Base de datos:** zoti_db
- **Usuario:** admin
- **Contraseña:** zoti360

## Opciones para conectarse

### Opción 1: Usando psql (cliente de línea de comandos)

Si tienes PostgreSQL instalado en tu computadora, puedes usar el comando psql:

```bash
psql -h 179.1.219.194 -p 5432 -U admin -d zoti_db
```

Cuando te solicite la contraseña, escribe: `zoti360`

### Opción 2: Usando pgAdmin 4

1. Abre pgAdmin 4
2. Haz clic derecho en "Servers" y selecciona "Create" > "Server..."
3. En la pestaña "General", escribe un nombre descriptivo como "Zoti Remote DB"
4. En la pestaña "Connection", completa:
   - Host: `179.1.219.194`
   - Port: `5432`
   - Maintenance database: `zoti_db`
   - Username: `admin`
   - Password: `zoti360`
5. Marca la opción "Save password" si quieres
6. Haz clic en "Save"

### Opción 3: Usando DBeaver

1. Abre DBeaver
2. Haz clic en "Nueva conexión" (icono de enchufe +)
3. Selecciona "PostgreSQL"
4. Completa los campos:
   - Server Host: `179.1.219.194`
   - Port: `5432`
   - Database: `zoti_db`
   - Username: `admin`
   - Password: `zoti360`
5. Haz clic en "Test Connection" para verificar
6. Si la prueba es exitosa, haz clic en "Finish"

### Opción 4: Configurando tu proyecto local

Si estás trabajando en el código del proyecto, actualiza tu archivo `.env` en la carpeta `/backend`:

```
DB_HOST=179.1.219.194
DB_PORT=5432
DB_NAME=zoti_db
DB_USER=admin
DB_PASSWORD=zoti360
PORT=3002
```

Luego reinicia tu servidor para aplicar los cambios.

## Solución de problemas

Si no puedes conectarte:

1. **Verifica tu conexión a Internet**:
   Asegúrate de tener una conexión estable.

2. **Problemas con la IP**:
   La IP del servidor podría haber cambiado. Contacta a Emily para obtener la IP actualizada.

3. **Firewall o restricciones de red**:
   Tu red podría estar bloqueando conexiones al puerto 5432. Intenta conectarte desde otra red.

4. **Error de autenticación**:
   Verifica que estés usando las credenciales correctas (usuario y contraseña).

## Script de prueba rápida

Para verificar rápidamente si puedes conectarte, descarga y ejecuta este script:

```bash
# Descargar el script de prueba
curl -O https://raw.githubusercontent.com/emilyariza22/proyecto_zoti/main/scripts/test_db_connection.sh
chmod +x test_db_connection.sh

# Ejecutar el script
./test_db_connection.sh 179.1.219.194
```

Si el script muestra "✅ ¡Conexión exitosa!", todo está configurado correctamente.

## Contacto para soporte

Si continúas teniendo problemas, contacta a Emily para recibir ayuda adicional.
