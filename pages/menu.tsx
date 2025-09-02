import Link from 'next/link';

export default function Menu() {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#2d6a4f" }}>Menú Principal</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Opción unificada de Registro */}
          <Link
            href="/registro"
            style={{
              padding: "12px",
              borderRadius: "6px",
              background: "#2d6a4f",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Registrar Entrada / Salida
          </Link>

          {/* Opción Traslado */}
          <Link
            href="/registro/traslado"
            style={{
              padding: "12px",
              borderRadius: "6px",
              background: "#74c69d",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Registrar Traslado
          </Link>
        </div>
      </div>
    </div>
  );
}
