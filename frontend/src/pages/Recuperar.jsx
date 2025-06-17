import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Recuperar() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    // Validar que se ingresó el correo
    if (!email.trim()) {
      setError("Por favor ingresa tu correo electrónico.");
        return;
    }

    // Validar formato de correo
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(email)) {
      setError("El formato del correo no es válido.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:80/api/password/forgot", { email });
      setMensaje("✅ Correo de recuperación enviado. Revisa tu bandeja de entrada.");
      setEmail("");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("❌ Hubo un error al enviar el correo. Intenta más tarde.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border border-cyan-600 rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4 text-cyan-700">Recuperar Contraseña</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="text-sm text-gray-600 hover:underline"
              onClick={() => navigate("/")}
            >
              Volver
            </button>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
