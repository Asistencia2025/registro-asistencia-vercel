// pages/index.tsx
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

    const { data, error } = await supabase.auth.signInWithPassword({
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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #05291e, #0b3a26)', // fondo verde muy oscuro
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: '#ffffff',
          padding: '50px 40px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          width: '100%',
          maxWidth: '400px',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
        noValidate
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            fontWeight: '700',
            color: '#064e3b',
            fontSize: '1.8rem',
          }}
        >
          Ingreso autorizado
        </h2>
        {error && (
          <p
            style={{
              color: '#b91c1c',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            {error}
          </p>
        )}
        <label
          htmlFor="email"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#065f46',
          }}
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            marginBottom: '25px',
            borderRadius: '8px',
            border: '1.8px solid #d1d5db',
            fontSize: '1rem',
            color: '#111827',
            backgroundColor: '#f9fafb',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#22c55e')}
          onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
        />
        <label
          htmlFor="password"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#065f46',
          }}
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            marginBottom: '30px',
            borderRadius: '8px',
            border: '1.8px solid #d1d5db',
            fontSize: '1rem',
            color: '#111827',
            backgroundColor: '#f9fafb',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#22c55e')}
          onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px 0',
            backgroundColor: '#22c55e',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.5)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#22c55e')}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

