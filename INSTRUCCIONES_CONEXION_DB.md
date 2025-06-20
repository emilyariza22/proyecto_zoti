# Instrucciones para conectarse a la base de datos

## Para el dueño de la base de datos

1. **Configurar PostgreSQL para aceptar conexiones remotas**:

   a. Edita el archivo `postgresql.conf`:
   ```bash
   sudo nano /etc/postgresql/[version]/main/postgresql.conf
   ```
   
   b. Busca la línea `listen_addresses` y cámbiala a:
   ```
   listen_addresses = '*'
   ```
   
   c. Guarda y cierra el archivo.

   d. Edita el archivo `pg_hba.conf`:
   ```bash
   sudo nano /etc/postgresql/[version]/main/pg_hba.conf
   ```
   
   e. Añade esta línea al final del archivo para permitir conexiones desde cualquier IP:
   ```
   host    all             all             0.0.0.0/0               md5
   ```
   
   f. Reinicia PostgreSQL:
   ```bash
   sudo systemctl restart postgresql
   ```

2. **Abre el puerto en el firewall**:
   ```bash
   sudo ufw allow 5432/tcp
   ```

3. **Obtén tu dirección IP para compartir**:
   ```bash
   ip addr show | grep inet
   ```
   
   Busca la dirección IP de tu red local (normalmente comienza con 192.168.x.x o 10.x.x.x)

## Para tus compañeros

Para conectarse a la base de datos, necesitarán:

1. **Datos de conexión**:
   - Host: [TU_DIRECCIÓN_IP]
   - Puerto: 5432
   - Nombre de la base de datos: zoti_db
   - Usuario: admin
   - Contraseña: zoti360

2. **Configuración en su archivo .env**:
   
   Deben crear o modificar su archivo `.env` en la carpeta `/backend` con estos valores:
   ```
   DB_HOST=[TU_DIRECCIÓN_IP]
   DB_PORT=5432
   DB_NAME=zoti_db
   DB_USER=admin
   DB_PASSWORD=zoti360
   PORT=3002
   ```

3. **Prueba de conexión**:

   Pueden probar la conexión utilizando el comando:
   ```bash
   psql -h [TU_DIRECCIÓN_IP] -p 5432 -U admin -d zoti_db
   ```

   O usando una herramienta gráfica como pgAdmin, DBeaver, o DataGrip.

4. **Solución de problemas**:
   - Asegúrate de que estás en la misma red que el servidor
   - Verifica que no hay un firewall bloqueando las conexiones
   - Confirma que los credenciales son correctos

## Notas de seguridad

Esta configuración es adecuada para un entorno de desarrollo, pero no para producción. Para un entorno de producción, se recomienda:

1. Limitar las IP que pueden conectarse
2. Usar contraseñas más robustas
3. Considerar el uso de certificados SSL para conexiones cifradas
4. Implementar un proxy inverso o VPN para conexiones remotas
