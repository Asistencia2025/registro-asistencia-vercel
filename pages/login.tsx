import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí puede agregar autenticación real si quiere
    router.push("/tipo"); // Redirige a la página de selección de tipo
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" }}>
      <form style={{ background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", width: "300px", display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Iniciar Sesión</h2>
        <input type="text" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
        <input type="password" placeholder="Contraseña" value={clave} onChange={e => setClave(e.target.value)} required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
        <button type="submit" style={{ padding: "10px", borderRadius: "6px", background: "#28a745", color: "#fff", border: "none", cursor: "pointer" }}>Ingresar</button>
      </form>
    </div>
  );
}
