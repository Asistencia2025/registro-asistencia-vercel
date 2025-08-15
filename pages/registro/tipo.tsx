export default function Tipo() {
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
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#333" }}>
          Selecciona el tipo de registro
        </h2>

        <button
          style={{
            padding: "12px",
            borderRadius: "6px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => (window.location.href = "/registro/entrada")}
        >
          Entrada
        </button>

        <button
          style={{
            padding: "12px",
            borderRadius: "6px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => (window.location.href = "/registro/salida")}
        >
          Salida
        </button>

        <button
          style={{
            padding: "12px",
            borderRadius: "6px",
            background: "#ffc107",
            color: "#000",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => (window.location.href = "/registro/traslado")}
        >
          Traslado
        </button>
      </div>
    </div>
  );
}
