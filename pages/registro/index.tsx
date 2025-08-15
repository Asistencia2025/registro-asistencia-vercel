export default function RegistroIndex() {
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
          Menú de Registro
        </h2>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Selecciona el tipo de registro que deseas realizar.
        </p>

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

        <button
          style={{
            padding: "12px",
            borderRadius: "6px",
            background: "#6c757d",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
          }}
          onClick={() => (window.location.href = "/")}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
