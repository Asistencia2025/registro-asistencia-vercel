import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabaseClient";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { data, error } = await supabase
      .from("usuarios_login")
      .select("id, email, password, rol, activo")
      .eq("email", email.trim())
      .eq("password", password)
      .eq("activo", true)
      .single();

    setLoading(false);

    if (error) {
  console.error("ERROR SUPABASE:", error);
  setError(`Error Supabase: ${error.message}`);
  return;
}

if (!data) {
  console.error("NO SE ENCONTRÓ EL USUARIO");
  setError("No se encontró el usuario");
  return;
}

    // Guardamos los datos básicos de la sesión
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        id: data.id,
        email: data.email,
        rol: data.rol,
      })
    );

    // Enviamos al menú
    router.push("/menu");
  };

  return (
    <div
      style={{
        background: "#1b4332",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
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
          disabled={loading}
          style={{
            padding: "10px",
            borderRadius: "6px",
            background: "#2d6a4f",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              margin: 0,
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
