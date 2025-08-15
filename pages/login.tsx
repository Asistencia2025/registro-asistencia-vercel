import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/registro/tipo");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          Registro de Asistencia
        </h2>

        <label style={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>
          Usuario
        </label>
        <input
          type="text"
          placeholder="Ingrese su usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />

        <label style={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>
          Contraseña
        </label>
        <input
          type="password"
          placeholder="Ingrese su contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "14px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "6px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}