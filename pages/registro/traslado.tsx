/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, FormEvent } from "react";
import supabase from '../../lib/supabaseClient'; // <-- cliente central

export default function RegistroTraslado() {
  const [coordinadores, setCoordinadores] = useState<any[]>([]);
  const [ssts, setSsts] = useState<any[]>([]);
  const [operarios, setOperarios] = useState<any[]>([]);

  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [coordinador, setCoordinador] = useState("");
  const [sst, setSst] = useState("");
  const [operadoresSeleccionados, setOperadoresSeleccionados] = useState<string[]>([]);
  const [mensajeExito, setMensajeExito] = useState("");

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

  const handleCheckboxChange = (id: string) => {
    if (operadoresSeleccionados.includes(id)) {
      setOperadoresSeleccionados(operadoresSeleccionados.filter(op => op !== id));
    } else if (operadoresSeleccionados.length < 6) {
      setOperadoresSeleccionados([...operadoresSeleccionados, id]);
    } else {
      alert("Máximo 6 operarios permitidos");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (operadoresSeleccionados.length < 1) {
      alert("Selecciona al menos 1 operario");
      return;
    }

    const operadoresNombres = operadoresSeleccionados
      .map(id => operarios.find(o => o.id === id)?.nombre)
      .filter(Boolean) as string[];

    const coordinadorNombre = coordinadores.find(c => c.id === coordinador)?.nombre;
    const sstNombre = ssts.find(s => s.id === sst)?.nombre;

    if (!coordinadorNombre || !sstNombre) {
      alert("Selecciona un coordinador y SST válidos");
      return;
    }

    const { error } = await supabase.from("traslados").insert([
      {
        proyecto_desde: desde,
        proyecto_hasta: hasta,
        coordinador: coordinadorNombre,
        sst: sstNombre,
        operadores: operadoresNombres,
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
      setOperadoresSeleccionados([]);
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

        <label>Operarios (mín 1, máximo 6)</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", maxHeight: "150px", overflowY: "auto" }}>
          {operarios.map(op => (
            <label key={op.id} style={{ fontSize: "12px" }}>
              <input
                type="checkbox"
                checked={operadoresSeleccionados.includes(op.id)}
                onChange={() => handleCheckboxChange(op.id)}
              />
              {" "}{op.nombre}
            </label>
          ))}
        </div>

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
