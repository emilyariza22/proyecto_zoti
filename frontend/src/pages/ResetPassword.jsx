import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = 'http://localhost:80/api';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token: resetToken } = useParams();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  useEffect(() => {
    if (!resetToken) {
      setError("El código de restablecimiento es inválido o ha expirado. Por favor, solicita uno nuevo.");
    }
  }, [resetToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    const { newPassword, confirmPassword } = formData;

    // Validaciones básicas
    if (!newPassword || !confirmPassword) {
      setError("Por favor, completa todos los campos.");
      setIsLoading(false);
      return;
    }

    // Validación de seguridad de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
    if (!passwordRegex.test(newPassword)) {
      setError("La contraseña debe tener al menos una mayúscula, un número y un carácter especial.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        `${API_URL}/password/reset`,
        { 
          resetCode: resetToken,
          newPassword
        }
      );
      
      setMessage("¡Contraseña actualizada exitosamente! Serás redirigido al inicio de sesión...");
      setTimeout(() => navigate("/inicio-sesion"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al restablecer la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Restablecer Contraseña</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Cambiar Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}