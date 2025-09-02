/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, FormEvent } from "react";
import supabase from '../../lib/supabaseClient';

export default function RegistroTraslado() {
  const [coordinadores, setCoordinadores] = useState<any[]>([]);
  const [ssts, setSsts] = useState<any[]>([]);
  const [operarios, setOperarios] = useState<any[]>([]);

  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [coordinador, setCoordinador] = useState("");
  const [sst, setSst] = useState("");
  const [operario1, setOperario1] = useState("");
  const [operario2, setOperario2] = useState("");
  const [operario3, setOperario3] = useState("");
  const [operario4, setOperario4] = useState("");
  const [operario5, setOperario5] = useState("");
  const [operario6, setOperario6] = useState("");
  const [observacion, setObservacion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  // Traer datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      const { data: coordData } = await supabase.from("coordinadores").select("*");
      const { data: sstData } = await supabase.from("ssts").select("*");
      const { data: opData } = await supabase.from("operarios").select("*");

      if (coordData) setCoordinadores(coordData);
      if (sstData) setSsts(sstData);
      if (opData) setOperarios(opData);
    };

    fetchData();
  }, []);

  // Capturar ubicación en tiempo real
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUbicacion(`https://www.google.com/maps?q=${latitude},${longitude}`);
        },
        (err) => {
          console.error("Error al obtener ubicación:", err);
          setUbicacion("No disponible");
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const coordinadorNombre = coordinadores.find(c => c.id === coordinador)?.nombre;
    const sstNombre = ssts.find(s => s.id === sst)?.nombre;

    if (!coordinadorNombre || !sstNombre || !operario1) {
      alert("Debes seleccionar coordinador, SST y al menos un operario");
      return;
    }

    const { error } = await supabase.from("traslados").insert([
      {
        proyecto_desde: desde,
        proyecto_hasta: hasta,
        coordinador: coordinadorNombre,
        sst: sstNombre,
        operario1,
        operario2,
        operario3,
        operario4,
        operario5,
        operario6,
        observacion,
        ubicacion,
        fecha_hora: new Date().toISOString()
      }
    ]);

    if (error) {
      alert("Error al registrar traslado: " + error.message);
    } else {
      setDesde("");
      setHasta("");
      setCoordinador("");
      setSst("");
      setOperario1("");
      setOperario2("");
      setOperario3("");
      setOperario4("");
      setOperario5("");
      setOperario6("");
      setObservacion("");
      setMensajeExito("¡Traslado registrado correctamente! Muchas gracias.");
    }
  };

  return (
    <div style={{ background: "#1b4332", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
          gap: "15px"
        }}
      >
        <h2 style={{ textAlign: "center" }}>Registro de Traslado</h2>

        <input
          type="text"
          placeholder="Desde"
          value={desde}
          onChange={e => setDesde(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Hasta"
          value={hasta}
          onChange={e => setHasta(e.target.value)}
          required
        />

        <select value={coordinador} onChange={e => setCoordinador(e.target.value)} required>
          <option value="">Coordinador</option>
          {coordinadores.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <select value={sst} onChange={e => setSst(e.target.value)} required>
          <option value="">SST</option>
          {ssts.map(s => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>

        {/* Seis campos de operario */}
        {[ 
          {label: "Operario 1", value: operario1, set: setOperario1, required: true},
          {label: "Operario 2", value: operario2, set: setOperario2},
          {label: "Operario 3", value: operario3, set: setOperario3},
          {label: "Operario 4", value: operario4, set: setOperario4},
          {label: "Operario 5", value: operario5, set: setOperario5},
          {label: "Operario 6", value: operario6, set: setOperario6}
        ].map((op, idx) => (
          <select
            key={idx}
            value={op.value}
            onChange={e => op.set(e.target.value)}
            required={op.required}
          >
            <option value="">{op.label}</option>
            {operarios.map(o => (
              <option key={o.id} value={o.nombre}>{o.nombre}</option>
            ))}
          </select>
        ))}

        <textarea
          placeholder="Observaciones"
          value={observacion}
          onChange={e => setObservacion(e.target.value)}
          style={{ resize: "none", minHeight: "60px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "6px",
            background: "#2d6a4f",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Registrar Traslado
        </button>

        {mensajeExito && <p style={{ color: "#2d6a4f", textAlign: "center", marginTop: "10px" }}>{mensajeExito}</p>}
      </form>
    </div>
  );
}
