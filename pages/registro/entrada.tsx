// pages/registro/entrada.tsx
import { useState, useEffect, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RegistroEntrada() {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [coordinadores, setCoordinadores] = useState<any[]>([]);
  const [ssts, setSsts] = useState<any[]>([]);
  const [operadores, setOperadores] = useState<any[]>([]);

  const [proyecto, setProyecto] = useState("");
  const [coordinador, setCoordinador] = useState("");
  const [sst, setSst] = useState("");
  const [operador, setOperador] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: proyectosData } = await supabase.from("proyectos").select("*");
      const { data: coordData } = await supabase.from("coordinadores").select("*");
      const { data: sstData } = await supabase.from("ssts").select("*");
      const { data: opData } = await supabase.from("operadores").select("*");

      if (proyectosData) setProyectos(proyectosData);
      if (coordData) setCoordinadores(coordData);
      if (sstData) setSsts(sstData);
      if (opData) setOperadores(opData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fechaHora = new Date().toISOString();

    const { error } = await supabase.from("ingresos").insert([
      {
        tipo: "entrada",
        proyecto_id: proyecto,
        coordinador_id: coordinador,
        sst_id: sst,
        operador_id: operador,
        fecha_hora: fechaHora
      }
    ]);

    if (error) {
      alert("Error al registrar entrada: " + error.message);
    } else {
      alert("Entrada registrada correctamente");
      setProyecto("");
      setCoordinador("");
      setSst("");
      setOperador("");
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
        <h2 style={{ textAlign: "center" }}>Registro de Entrada</h2>

        <select value={proyecto} onChange={e => setProyecto(e.target.value)} required>
          <option value="">Proyecto</option>
          {proyectos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

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

        <select value={operador} onChange={e => setOperador(e.target.value)} required>
          <option value="">Operario</option>
          {operadores.map(o => (
            <option key={o.id} value={o.id}>{o.nombre}</option>
          ))}
        </select>

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
          Registrar Entrada
        </button>
      </form>
    </div>
  );
}
