import { useState, FormEvent, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Traslado() {
  const [coordinadores, setCoordinadores] = useState<string[]>([]);
  const [ssts, setSsts] = useState<string[]>([]);
  const [operarios, setOperarios] = useState<string[]>(["", "", "", ""]);

  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: coord } = await supabase.from("coordinadores").select("nombre");
      setCoordinadores(coord?.map(c => c.nombre) || []);
      const { data: sstData } = await supabase.from("sst").select("nombre");
      setSsts(sstData?.map(s => s.nombre) || []);
      const { data: ops } = await supabase.from("operadores").select("nombre");
      setOperarios(ops?.map(o => o.nombre) || ["", "", "", ""]);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const registro = { desde, hasta, coordinadores, ssts, operarios };
    await supabase.from("traslados").insert([registro]);
    alert("Traslado registrado ✅");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Traslado</h2>
      <input placeholder="Desde" value={desde} onChange={e => setDesde(e.target.value)} required />
      <input placeholder="Hasta" value={hasta} onChange={e => setHasta(e.target.value)} required />

      <select>
        <option value="">Coordinador</option>
        {coordinadores.map((c, i) => <option key={i}>{c}</option>)}
      </select>

      <select>
        <option value="">SST</option>
        {ssts.map((s, i) => <option key={i}>{s}</option>)}
      </select>

      {[0,1,2,3].map(i => (
        <select key={i}>
          <option value="">Operario {i+1}</option>
          {operarios.map((o, j) => <option key={j}>{o}</option>)}
        </select>
      ))}

      <button type="submit">Registrar Traslado</button>
    </form>
  );
}

