// pages/login.tsx
import { useState, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error al iniciar sesión: " + error.message);
    } else {
      alert("Inicio de sesión exitoso");
      window.location.href = "/"; // Redirigir a página principal
    }
  };

  return (
    <div style={{
      background: "#1b4332",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#1b4332" }}>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "6px",
            background: "#2d6a4f",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
