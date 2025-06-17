import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ZoticLogo from "../assets/Zotic.jpeg"; // ✅ Corrige la ruta a tu logo principal
import UserIcon from "../assets/Logo_usuario.png"; // ✅ Corrige la ruta al ícono del usuario

export default function LoginTI360() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const allowedRegex = /^[a-zA-Z0-9@.]+$/;
    if (!allowedRegex.test(email)) {
      setError("Solo se permiten letras, números, '.' y '@' en el correo.");
      return;
    }

    const atCount = (email.match(/@/g) || []).length;
    const dotCount = (email.match(/\./g) || []).length;
    if (atCount !== 1 || dotCount !== 1) {
      setError("El correo debe contener solo un '@' y un '.'");
      return;
    }

    if (email.length > 30) {
      setError("El correo debe tener menos de 30 caracteres.");
      return;
    }

    if (!email.includes(".")) {
      setError("El correo debe contener al menos un punto '.'");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
    if (!passwordRegex.test(password)) {
      setError("La contraseña debe contener al menos una mayúscula, un número y un carácter especial.");
      return;
    }

    // Aquí iría tu lógica real de login con backend

    navigate("/home"); // Simulación de login exitoso
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra superior */}
      <div className="bg-[#243E69] h-20 flex items-center px-6">
        <img src={ZoticLogo} alt="Logo Zotic" className="h-16" /> {/* ✅ Imagen corregida */}
      </div>

      {/* Contenido del formulario */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-gray-300 border-2 border-cyan-600 rounded-md p-6 w-full max-w-md shadow-md">
          <div className="flex justify-center mb-4">
            <img src={UserIcon} alt="User Icon" className="w-10 h-10" /> {/* ✅ Imagen corregida */}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre de usuario o correo electrónico
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded border focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded border focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember" className="text-sm">Recordar</label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-700 hover:underline"
                onClick={() => navigate("/recuperar")}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-between mt-2">
              <button
                type="button"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm"
                onClick={() => navigate("/registro")}
              >
                Crear cuenta
              </button>
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm"
              >
                Acceder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
