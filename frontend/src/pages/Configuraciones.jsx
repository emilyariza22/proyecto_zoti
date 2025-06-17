import React from "react";
import { useNavigate } from "react-router-dom";

export default function Configuraciones() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Datos personales",
      description: "Nombre, foto de perfil, cédula, teléfono…"
    },
    {
      title: "Contraseña y seguridad",
      description: "Cambiar contraseña, inicio de sesión guardado, alertas..."
    },
    {
      title: "Favoritos",
      description: "Productos guardados, comentarios..."
    },
    {
      title: "Notificaciones",
      description: "Publicaciones, mensajes, recomendaciones..."
    },
    {
      title: "Ayuda",
      description: "Reportar problemas, estado de cuenta, servicios de ayuda..."
    }
  ];

  const handleLogout = () => {
    // 🧼 Limpia sesión/token
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Configuraciones
      </h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition cursor-pointer"
            onClick={() => console.log(`Navegar a ${item.title}`)}
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="mt-1 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 w-full max-w-xs bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
