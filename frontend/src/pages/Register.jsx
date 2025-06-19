import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ZoticLogo from "../assets/Zotic.jpeg"; // ✅ Importación correcta de la imagen

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    document_type: "",
    document_number: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { email, password, document_number, phone } = formData;
    const allowedEmail = /^[a-zA-Z0-9@.]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
    const onlyNumbers = /^\d+$/;

    if (!allowedEmail.test(email)) {
      return "Correo inválido: solo letras, números, '.' y '@'.";
    }

    if ((email.match(/@/g) || []).length !== 1 || (email.match(/\./g) || []).length !== 1) {
      return "El correo debe contener exactamente un '@' y un '.'";
    }

    if (email.length > 30) {
      return "El correo debe tener menos de 30 caracteres.";
    }

    if (!passwordRegex.test(password)) {
      return "La contraseña debe tener al menos una mayúscula, un número y un carácter especial.";
    }

    if (password.length < 8) {
      return "La contraseña debe tener mínimo 8 caracteres.";
    }

    if (!onlyNumbers.test(document_number)) {
      return "El número de documento solo debe contener números.";
    }
    if (document_number.length !== 10) {
      return "El número de documento debe tener exactamente 10 dígitos.";
    }
    if (!onlyNumbers.test(phone)) {
      return "El número de teléfono solo debe contener números.";
    }
    if (phone.length !== 10) {
      return "El número de teléfono debe tener exactamente 10 dígitos.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:80/api/auth/register", formData);
      setSuccess("Registro exitoso. Bienvenido.");
      // ✅ Redirigir al inicio (página principal)
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.error || "Error al registrar el usuario.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#243E69] h-20 flex items-center px-6">
        <img src={ZoticLogo} alt="Logo Zotic" className="h-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-gray-300 border-2 border-cyan-600 rounded-md p-6 w-full max-w-md shadow-md">
          <h2 className="text-center text-xl font-bold mb-4">Registro de Usuario</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="full_name"
              placeholder="Nombre completo"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border"
            />

            <select
              name="document_type"
              value={formData.document_type}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border"
            >
              <option value="">Tipo de documento</option>
              <option value="CC">Cédula de ciudadanía</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="CE">Cédula de extranjería</option>
            </select>

            <input
              type="text"
              name="document_number"
              placeholder="Número de documento"
              value={formData.document_number}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border"
            />

            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border"
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border"
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border"
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <div className="flex justify-between mt-2">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
                onClick={() => navigate("/inicio-sesion")}
              >
                Volver
              </button>

              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}