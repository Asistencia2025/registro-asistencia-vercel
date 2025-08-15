export default function Traslado() {
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
        <h2 style={{ textAlign: "center", color: "#333" }}>
          Registro de Traslado
        </h2>

        <input
          type="text"
          placeholder="Proyecto Origen"
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Proyecto Destino"
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          placeholder="Operario"
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="time"
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "6px",
            background: "#ffc107",
            color: "#000",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Registrar Traslado
        </button>
      </form>
    </div>
  );
}
