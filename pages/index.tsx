import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error en login:', error);
      setError(error.message || 'Error desconocido al iniciar sesión');
    } else {
      router.push('/registro');
    }
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#05291e] to-[#0b3a26] flex justify-center items-center p-5">
    <form
      onSubmit={handleLogin}
      className="bg-white p-12 rounded-xl shadow-lg w-full max-w-md font-sans"
      noValidate
    >
      <h2 className="text-center mb-8 font-bold text-[#064e3b] text-2xl">
        Ingreso autorizado
      </h2>
      {error && (
        <p className="text-red-700 mb-5 text-center font-semibold">
          {error}
        </p>
      )}
      <label htmlFor="email" className="block mb-2 font-semibold text-[#065f46]">
        Correo electrónico
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg border border-gray-300 text-gray-900 bg-gray-50 focus:outline-none focus:border-green-500"
      />
      <label htmlFor="password" className="block mb-2 font-semibold text-[#065f46]">
        Contraseña
      </label>
      <input
        id="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg border border-gray-300 text-gray-900 bg-gray-50 focus:outline-none focus:border-green-500"
      />
      <button
        type="submit"
        className="w-full py-3 bg-green-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-600 transition-colors"
      >
        Iniciar sesión
      </button>
    </form>
  </div>
);
}