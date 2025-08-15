import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Aquí puedes poner tu lógica de autenticación
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900">
      {/* Cuadro encerrado */}
      <div className="bg-white border-2 border-green-700 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-900 mb-6">
          Ingreso autorizado
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo correo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Tu correo"
              required
            />
          </div>
          {/* Campo contraseña */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Tu contraseña"
              required
            />
          </div>
          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-green-800 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}