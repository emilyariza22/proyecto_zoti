#!/bin/bash
# Archivo: test_db_connection.sh
# Descripción: Este script prueba la conexión a la base de datos PostgreSQL remota

echo "Probando conexión a la base de datos remota..."
echo "Host: $1"
echo "Puerto: 5432"
echo "Usuario: admin"
echo "Base de datos: zoti_db"
echo ""

# Intentamos una conexión simple
PGPASSWORD=zoti360 psql -h "$1" -p 5432 -U admin -d zoti_db -c "SELECT version();" 2>/dev/null

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Conexión exitosa! La base de datos está accesible."
else
    echo ""
    echo "❌ Error: No se pudo conectar a la base de datos."
    echo "Posibles razones:"
    echo "  1. El servidor PostgreSQL no está ejecutándose"
    echo "  2. El firewall está bloqueando la conexión"
    echo "  3. El reenvío de puertos no está configurado correctamente"
    echo "  4. La dirección IP proporcionada no es correcta"
    echo ""
    echo "Comprueba tu conexión e intenta de nuevo."
fi
