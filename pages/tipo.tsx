import { useRouter } from "next/router";

export default function Tipo() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", gap: "20px" }}>
      <h2>Seleccione Tipo de Registro</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={() => router.push("/registro/entrada")} style={{ padding: "15px 25px", borderRadius: "8px", background: "#28a745", color: "#fff", cursor: "pointer" }}>Entrada</button>
        <button onClick={() => router.push("/registro/salida")} style={{ padding: "15px 25px", borderRadius: "8px", background: "#ffc107", color: "#fff", cursor: "pointer" }}>Salida</button>
        <button onClick={() => router.push("/registro/traslado")} style={{ padding: "15px 25px", borderRadius: "8px", background: "#17a2b8", color: "#fff", cursor: "pointer" }}>Traslado</button>
      </div>
    </div>
  );
}
