import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Registro() {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [coordinadores, setCoordinadores] = useState<any[]>([]);
  const [ssts, setSsts] = useState<any[]>([]);
  const [operarios, setOperarios] = useState<any[]>([]);

  const [formulario, setFormulario] = useState({
    proyecto: '',
    coordinador: '',
    sst: '',
    operario1: '',
    operario2: '',
    operario3: '',
    operario4: '',
    operario5: '',
    operario6: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: proyectosData, error: errorProyectos } = await supabase.from('proyectos').select('*');
      const { data: coordinadoresData, error: errorCoordinadores } = await supabase.from('coordinadores').select('*');
      const { data: sstsData, error: errorSsts } = await supabase.from('sst').select('*');
      const { data: operariosData, error: errorOperarios } = await supabase.from('operarios').select('*');

      if (!errorProyectos) setProyectos(proyectosData || []);
      if (!errorCoordinadores) setCoordinadores(coordinadoresData || []);
      if (!errorSsts) setSsts(sstsData || []);
      if (!errorOperarios) setOperarios(operariosData || []);
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevaAsistencia = {
      ...formulario,
      fecha: new Date().toISOString(),
    };

    const { error } = await supabase.from('asistencias').insert([nuevaAsistencia]);

    if (error) {
      alert('Error al registrar la asistencia.');
      console.error(error);
    } else {
      alert('Asistencia registrada con éxito.');
    }
  };

  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Registro de Asistencia</h2>

        <select name="proyecto" value={formulario.proyecto} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Seleccione Proyecto</option>
          {proyectos.map((p) => (
            <option key={p.id} value={p.nombre}>{p.nombre}</option>
          ))}
        </select>

        <select name="coordinador" value={formulario.coordinador} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Seleccione Coordinador</option>
          {coordinadores.map((c) => (
            <option key={c.id} value={c.nombre}>{c.nombre}</option>
          ))}
        </select>

        <select name="sst" value={formulario.sst} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Seleccione SST</option>
          {ssts.map((s) => (
            <option key={s.id} value={s.nombre}>{s.nombre}</option>
          ))}
        </select>

        {[1, 2, 3, 4, 5, 6].map((i) => (
          <select
            key={i}
            name={`operario${i}`}
            value={formulario[`operario${i}` as keyof typeof formulario]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">{`Seleccione Operario ${i}`}</option>
            {operarios.map((o) => (
              <option key={o.id} value={o.nombre}>{o.nombre}</option>
            ))}
          </select>
        ))}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Registrar Asistencia
        </button>
      </form>
    </div>
  );
}
