import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Aquí va la lógica de autenticación
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-green-900 mb-6">
          Ingreso autorizado
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
