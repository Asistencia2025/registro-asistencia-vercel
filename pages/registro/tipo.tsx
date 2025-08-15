// pages/registro/tipo.tsx
export default function Tipo() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          textAlign: "center",
        }}
      >
        <h1>Selecciona el tipo de registro</h1>
        <button
          style={{
            padding: "10px",
            borderRadius: "6px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Ir a Entrada")}
        >
          Entrada
        </button>
        <button
          style={{
            padding: "10px",
            borderRadius: "6px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Ir a Salida")}
        >
          Salida
        </button>
        <button
          style={{
            padding: "10px",
            borderRadius: "6px",
            background: "#ffc107",
            color: "#000",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Ir a Traslado")}
        >
          Traslado
        </button>
      </div>
    </div>
  );
}
