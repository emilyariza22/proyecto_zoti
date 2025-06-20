# Configuración de Ngrok para acceso remoto a la base de datos

Para proporcionar acceso remoto a la base de datos sin configurar el reenvío de puertos, puedes usar ngrok. Aquí te explico cómo hacerlo:

## 1. Crear una cuenta en ngrok

1. Ve a [https://ngrok.com](https://ngrok.com) y regístrate para obtener una cuenta gratuita
2. Una vez registrado, ve a la [página de tu panel de control](https://dashboard.ngrok.com)
3. En la página de "Getting Started", encontrarás tu token de autenticación

## 2. Autenticar ngrok en tu máquina

```bash
# Reemplaza YOUR_AUTH_TOKEN con el token que encontraste en el paso anterior
~/ngrok/ngrok config add-authtoken YOUR_AUTH_TOKEN
```

## 3. Crear un túnel para PostgreSQL

```bash
~/ngrok/ngrok tcp 5432
```

Esto iniciará un túnel y te mostrará una URL como:
```
tcp://2.tcp.ngrok.io:12345
```

## 4. Compartir los datos de conexión con tus compañeros

Ahora tus compañeros pueden conectarse usando:
- **Host**: 2.tcp.ngrok.io (el dominio que te dio ngrok)
- **Puerto**: 12345 (el puerto que te dio ngrok, cambiará cada vez que ejecutes ngrok)
- **Usuario**: admin
- **Contraseña**: zoti360
- **Base de datos**: zoti_db

## 5. Para mantener el túnel abierto

El túnel se cerrará si cierras la terminal o apagas la computadora. Para mantenerlo abierto por más tiempo:

- Ejecuta el comando en una sesión de screen o tmux
- Considera actualizar a ngrok Pro para túneles persistentes
- Para cerrar el túnel cuando ya no lo necesites, simplemente presiona Ctrl+C

**Nota**: La versión gratuita de ngrok cambia la URL cada vez que reinicas el túnel y tiene algunas limitaciones de tiempo. Si necesitas una solución más permanente, considera configurar el reenvío de puertos en tu router o actualizar a ngrok Pro.
