#!/bin/bash
# update_db_connection.sh
# Este script actualiza la configuración de conexión de la base de datos
# cuando cambia tu dirección IP

# Obtener la IP pública actual
PUBLIC_IP=$(curl -s https://api.ipify.org)

# Actualizar el archivo de instrucciones con la nueva IP
sed -i "s/- \*\*Host:\*\* [0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+/- **Host:** $PUBLIC_IP/g" /home/emilyariza22/Zoti/GUIA_CONEXION_DB.md

# Mostrar la nueva configuración
echo "====================================="
echo "Configuración actualizada con éxito!"
echo "====================================="
echo ""
echo "Nueva IP pública: $PUBLIC_IP"
echo ""
echo "Recuerda compartir la nueva dirección IP con tus compañeros."
echo "También tendrás que verificar que el reenvío de puertos en tu router"
echo "apunte a tu IP local actual si ésta ha cambiado."
echo ""
echo "Para obtener tu IP local actual:"
echo "ip addr show | grep 'inet ' | grep -v '127.0.0.1'"
