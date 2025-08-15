import { useRouter } from "next/router";

export default function Tipo() {
  const router = useRouter();

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", gap: "20px" }}>
      <h2>Página de selección de tipo</h2>
      <button onClick={() => router.push("/registro/entrada")}>Entrada</button>
      <button onClick={() => router.push("/registro/salida")}>Salida</button>
      <button onClick={() => router.push("/registro/traslado")}>Traslado</button>
    </div>
  );
}
