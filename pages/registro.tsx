'use client';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen flex items-center justify-center bg-green-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full space-y-6 text-center"
      >
        <h2 className="text-3xl font-bold text-green-900">Registro de Asistencia</h2>

        <select
          name="proyecto"
          value={formulario.proyecto}
          onChange={handleChange}
          className="w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="" disabled>
            Seleccione Proyecto
          </option>
          {proyectos.map((p) => (
            <option key={p.id} value={p.nombre}>
              {p.nombre}
            </option>
          ))}
        </select>

        <select
          name="coordinador"
          value={formulario.coordinador}
          onChange={handleChange}
          className="w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="" disabled>
            Seleccione Coordinador
          </option>
          {coordinadores.map((c) => (
            <option key={c.id} value={c.nombre}>
              {c.nombre}
            </option>
          ))}
        </select>

        <select
          name="sst"
          value={formulario.sst}
          onChange={handleChange}
          className="w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="" disabled>
            Seleccione SST
          </option>
          {ssts.map((s) => (
            <option key={s.id} value={s.nombre}>
              {s.nombre}
            </option>
          ))}
        </select>

        {[1, 2, 3, 4, 5, 6].map((i) => (
          <select
            key={i}
            name={`operario${i}`}
            value={formulario[`operario${i}` as keyof typeof formulario]}
            onChange={handleChange}
            className="w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">{`Seleccione Operario ${i}`}</option>
            {operarios.map((o) => (
              <option key={o.id} value={o.nombre}>
                {o.nombre}
              </option>
            ))}
          </select>
        ))}

        <select
          name="tipo_registro"
          value={formulario.tipo_registro}
          onChange={handleChange}
          className="w-full p-3 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="" disabled>
            Seleccione Tipo de Registro
          </option>
          <option value="Entrada">Entrada</option>
          <option value="Salida">Salida</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Registrar Asistencia
        </button>
      </form>
    </div>
  );
}

