# Guía para conectarse a la base de datos remota

## Información de conexión

- **Host:** 179.1.219.194 (IP pública)
- **Puerto:** 5432
- **Base de datos:** zoti_db
- **Usuario:** admin
- **Contraseña:** zoti360

## Opciones para conectarse

### 1. Usando el cliente de PostgreSQL (psql)

```bash
psql -h 179.1.219.194 -p 5432 -U admin -d zoti_db
# Cuando se solicite, ingresa la contraseña: zoti360
```

### 2. Usando pgAdmin 4

1. Abre pgAdmin 4
2. Haz clic derecho en "Servers" y selecciona "Create" > "Server..."
3. En la pestaña "General", ingresa un nombre para el servidor (ej. "Zoti DB Remote")
4. En la pestaña "Connection", ingresa:
   - Host: 179.1.219.194
   - Port: 5432
   - Maintenance database: zoti_db
   - Username: admin
   - Password: zoti360
5. Haz clic en "Save"

### 3. Usando DBeaver

1. Abre DBeaver
2. Ve a "Database" > "New Database Connection"
3. Selecciona "PostgreSQL"
4. En la ventana de conexión, ingresa:
   - Server Host: 179.1.219.194
   - Port: 5432
   - Database: zoti_db
   - Username: admin
   - Password: zoti360
5. Prueba la conexión y guarda

### 4. Configurando tu proyecto

Si estás trabajando en el proyecto, modifica tu archivo `.env` en la carpeta `/backend`:

```
DB_HOST=179.1.219.194
DB_PORT=5432
DB_NAME=zoti_db
DB_USER=admin
DB_PASSWORD=zoti360
PORT=3002
```

## Solución de problemas

### Probar la conexión

Puedes usar el script de prueba proporcionado:

```bash
# Descarga el script
wget https://raw.githubusercontent.com/emilyariza22/proyecto_zoti/main/scripts/test_db_connection.sh
chmod +x test_db_connection.sh

# Ejecuta el script con la IP del servidor
./test_db_connection.sh 179.1.219.194
```

### Problemas comunes

1. **Error "Connection refused"**
   - Verifica que la IP sea correcta
   - El puerto 5432 podría estar bloqueado por un firewall
   - El servidor PostgreSQL podría no estar ejecutándose

2. **Error "Connection timed out"**
   - La IP pública podría haber cambiado
   - El reenvío de puertos podría no estar configurado correctamente

3. **Error de autenticación**
   - Verifica que estés usando el nombre de usuario y contraseña correctos

## Contacto para soporte

Si sigues teniendo problemas, contacta a Emily para obtener ayuda.
