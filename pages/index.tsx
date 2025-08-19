import { useState, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

// Conexión con Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Buscar el usuario en la tabla usuarios_login
    const { data, error } = await supabase
      .from("usuarios_login")
      .select("*")
      .eq("email", email)
      .eq("password", password) // ⚠️ en producción deberías encriptar, pero así está bien para pruebas
      .single();

    if (error || !data) {
      setErrorMsg("Usuario o contraseña incorrectos");
      return;
    }

    // Si pasa la validación, redirigir al menú
    window.location.href = "/menu"; // 👈 ajusta según tu ruta
  };

  return (
    <div
      style={{
        backgroundColor: "#1b4332",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#2d6a4f" }}>
          Iniciar Sesión
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
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
            border: "1px solid #ccc",
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
            fontWeight: "bold",
          }}
        >
          Entrar
        </button>

        {errorMsg && (
          <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
