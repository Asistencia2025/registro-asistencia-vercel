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
    tipo_registro: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: proyectosData } = await supabase.from('proyectos').select('*');
      const { data: coordinadoresData } = await supabase.from('coordinadores').select('*');
      const { data: sstsData } = await supabase.from('sst').select('*');
      const { data: operariosData } = await supabase.from('operarios').select('*');

      if (proyectosData) setProyectos(proyectosData);
      if (coordinadoresData) setCoordinadores(coordinadoresData);
      if (sstsData) setSsts(sstsData);
      if (operariosData) setOperarios(operariosData);
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
      // Opcional: limpiar formulario
      setFormulario({
        proyecto: '',
        coordinador: '',
        sst: '',
        operario1: '',
        operario2: '',
        operario3: '',
        operario4: '',
        operario5: '',
        operario6: '',
        tipo_registro: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-green-900 mb-6 tracking-wide">
          Registro de Asistencia
        </h2>

        <select
          name="proyecto"
          value={formulario.proyecto}
          onChange={handleChange}
          className="w-full p-3 border border-green-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          required
        >
          <option value="" disabled>Seleccione Proyecto</option>
          {proyectos.map((p) => (
            <option key={p.id} value={p.nombre}>{p.nombre}</option>
          ))}
        </select>

        <select
          name="coordinador"
          value={formulario.coordinador}
          onChange={handleChange}
          className="w-full p-3 border border-green-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          required
        >
          <option value="" disabled>Seleccione Coordinador</option>
          {coordinadores.map((c) => (
            <option key={c.id} value={c.nombre}>{c.nombre}</option>
          ))}
        </select>

        <select
          name="sst"
          value={formulario.sst}
          onChange={handleChange}
          className="w-full p-3 border border-green-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          required
        >
          <option value="" disabled>Seleccione SST</option>
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
            className="w-full p-3 border border-green-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          >
            <option value="">Seleccione Operario {i}</option>
            {operarios.map((o) => (
              <option key={o.id} value={o.nombre}>{o.nombre}</option>
            ))}
          </select>
        ))}

        <select
          name="tipo_registro"
          value={formulario.tipo_registro}
          onChange={handleChange}
          className="w-full p-3 border border-green-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          required
        >
          <option value="" disabled>Seleccione Tipo de Registro</option>
          <option value="Entrada">Entrada</option>
          <option value="Salida">Salida</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-600 active:bg-green-800 transition"
        >
          Registrar Asistencia
        </button>
      </form>
    </div>
  );
}
