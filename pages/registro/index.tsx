/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, FormEvent } from "react";
import supabase from "../../lib/supabaseClient"; // asegúrate que esta ruta existe

interface Persona {
  id: string;
  nombre: string;
}

type TipoRegistro = "entrada" | "salida";

export default function RegistroUnificado() {
  const [coordinadores, setCoordinadores] = useState<Persona[]>([]);
  const [ssts, setSsts] = useState<Persona[]>([]);
  const [operarios, setOperarios] = useState<Persona[]>([]);

  const [tipo, setTipo] = useState<TipoRegistro | null>(null);
  const [proyecto, setProyecto] = useState("");
  const [coordinador, setCoordinador] = useState("");
  const [sst, setSst] = useState("");

  const [operadoresSeleccionados, setOperadoresSeleccionados] = useState<string[]>(
    () => Array(10).fill("")
  );

  const [observaciones, setObservaciones] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false);

  // ubicación (una sola vez)
  const [ubicacionLink, setUbicacionLink] = useState<string | null>(null);
  const [ubicStatus, setUbicStatus] = useState<string>("No obtenida");

  useEffect(() => {
    // traer opciones
    const fetchData = async () => {
      try {
        const { data: coordData } = await supabase.from("coordinadores").select("*");
        const { data: sstData } = await supabase.from("ssts").select("*");
        const { data: opData } = await supabase.from("operarios").select("*");

        if (coordData) setCoordinadores(coordData);
        if (sstData) setSsts(sstData);
        if (opData) setOperarios(opData);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();

    // obtener ubicación una sola vez
    if ("geolocation" in navigator) {
      setUbicStatus("Obteniendo ubicación...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const linkMaps = `https://www.google.com/maps?q=${lat},${lng}`;
          setUbicacionLink(linkMaps);
          setUbicStatus("Ubicación obtenida ✅");
        },
        (err) => {
          console.error("Error geolocalización:", err);
          setUbicStatus("Permiso denegado o error");
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setUbicStatus("Geolocalización no soportada");
    }
  }, []);

  const handleOperarioChange = (index: number, value: string) => {
    const nuevos = [...operadoresSeleccionados];
    nuevos[index] = value;
    setOperadoresSeleccionados(nuevos);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!tipo) {
      alert("Selecciona si es Entrada o Salida");
      return;
    }
    if (!coordinador || !sst) {
      alert("Selecciona un coordinador y un SST");
      return;
    }

    const seleccionadosNoVacios = operadoresSeleccionados.filter((v) => v && v.trim() !== "");
    if (seleccionadosNoVacios.length < 1) {
      alert("Selecciona al menos 1 operario");
      return;
    }

    const operadoresNombres = operadoresSeleccionados.map((id) =>
      id ? operarios.find((o) => o.id === id)?.nombre ?? null : null
    );

    const coordinadorNombre = coordinadores.find((c) => c.id === coordinador)?.nombre;
    const sstNombre = ssts.find((s) => s.id === sst)?.nombre;
    if (!coordinadorNombre || !sstNombre) {
      alert("Datos de coordinador o SST inválidos");
      return;
    }

    const payload: any = {
      proyecto,
      coordinador: coordinadorNombre,
      sst: sstNombre,
      observaciones,
      fecha_hora: new Date().toISOString(),
      ubicacion_link: ubicacionLink, // 👈 ahora se guarda el link en lugar de lat/lon
    };

    for (let i = 0; i < 10; i++) {
      payload[`operario${i + 1}`] = operadoresNombres[i] ?? null;
    }

    const tabla = tipo === "entrada" ? "ingresos_nombres" : "salidas_nombres";

    setCargando(true); 
    setMensajeExito("Procesando registro..."); 

    const { error } = await supabase.from(tabla).insert([payload]);

    if (error) {
      alert(`Error al registrar ${tipo}: ` + error.message);
      setMensajeExito("");
    } else {
      setProyecto("");
      setCoordinador("");
      setSst("");
      setOperadoresSeleccionados(Array(10).fill(""));
      setObservaciones("");

      setMensajeExito(
        tipo === "entrada"
          ? "¡Te has registrado correctamente! Muchas gracias."
          : "¡Salida registrada correctamente! Muchas gracias."
      );

      setTimeout(() => setMensajeExito(""), 5000);
    }

    setCargando(false);
  };

  const btnBase: React.CSSProperties = {
    padding: "10px",
    borderRadius: "6px",
    background: "#2d6a4f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const btnToggle: React.CSSProperties = {
    ...btnBase,
    flex: 1,
    padding: "8px",
    background: "#2d6a4f",
  };

  const btnToggleInactive: React.CSSProperties = {
    ...btnToggle,
    opacity: 0.6,
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
          gap: "12px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          {tipo ? `Registro de ${tipo === "entrada" ? "Entrada" : "Salida"}` : "Registro de Asistencia"}
        </h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="button" onClick={() => setTipo("entrada")} style={tipo === "entrada" ? btnToggle : btnToggleInactive}>
            Entrada
          </button>
          <button type="button" onClick={() => setTipo("salida")} style={tipo === "salida" ? btnToggle : btnToggleInactive}>
            Salida
          </button>
        </div>

        <input type="text" placeholder="Proyecto" value={proyecto} onChange={(e) => setProyecto(e.target.value)} required />

        <select value={coordinador} onChange={(e) => setCoordinador(e.target.value)} required>
          <option value="">Coordinador</option>
          {coordinadores.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <select value={sst} onChange={(e) => setSst(e.target.value)} required>
          <option value="">SST</option>
          {ssts.map((s) => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>

        <label>Operarios (mín 1, máximo 10)</label>
        {[...Array(10)].map((_, i) => (
          <select
            key={i}
            value={operadoresSeleccionados[i] || ""}
            onChange={(e) => handleOperarioChange(i, e.target.value)}
            style={{ marginBottom: "6px" }}
          >
            <option value="">-- Seleccionar operario --</option>
            {operarios.map((op) => (
              <option key={op.id} value={op.id}>{op.nombre}</option>
            ))}
          </select>
        ))}

        {/* Ubicación (ahora muestra link en vez de coordenadas) */}
        <div style={{ fontSize: "12px", marginTop: "6px" }}>
          <div style={{ marginBottom: "4px" }}>Ubicación</div>
          <div style={{ color: "#333" }}>
            {ubicStatus}
            {ubicacionLink && (
              <div style={{ marginTop: "4px" }}>
                <a href={ubicacionLink} target="_blank" rel="noopener noreferrer">
                  Ver en Google Maps
                </a>
              </div>
            )}
          </div>
        </div>

        <textarea
          placeholder="Observaciones del coordinador"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          style={{ minHeight: "60px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <button type="submit" style={btnBase} disabled={cargando}>
          {cargando ? "Registrando..." : tipo ? `Registrar ${tipo === "entrada" ? "Entrada" : "Salida"}` : "Registrar"}
        </button>

        {mensajeExito && <p style={{ color: "#2d6a4f", textAlign: "center", marginTop: "6px" }}>{mensajeExito}</p>}
      </form>
    </div>
  );
}
