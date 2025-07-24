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

  // Componente para select con label flotante
  const FloatingSelect = ({
    label,
    name,
    value,
    options,
    onChange,
    required = false,
  }: {
    label: string;
    name: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
  }) => (
    <div className="relative w-full">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="peer block w-full appearance-none rounded-xl border border-green-700 bg-transparent px-3 pt-6 pb-2 text-green-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
      >
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="absolute left-3 top-2 text-green-700 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-green-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-700 pointer-events-none"
      >
        {label}
      </label>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-700">
        ▼
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-2xl space-y-8"
      >
        <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8 tracking-wide">
          Registro de Asistencia
        </h2>

        <FloatingSelect
          label="Proyecto"
          name="proyecto"
          value={formulario.proyecto}
          onChange={handleChange}
          required
          options={proyectos.map((p) => ({ value: p.nombre, label: p.nombre }))}
        />

        <FloatingSelect
          label="Coordinador"
          name="coordinador"
          value={formulario.coordinador}
          onChange={handleChange}
          required
          options={coordinadores.map((c) => ({ value: c.nombre, label: c.nombre }))}
        />

        <FloatingSelect
          label="SST"
          name="sst"
          value={formulario.sst}
          onChange={handleChange}
          required
          options={ssts.map((s) => ({ value: s.nombre, label: s.nombre }))}
        />

        {[1, 2, 3, 4, 5, 6].map((i) => (
          <FloatingSelect
            key={i}
            label={`Operario ${i}`}
            name={`operario${i}`}
            value={formulario[`operario${i}` as keyof typeof formulario]}
            onChange={handleChange}
            options={operarios.map((o) => ({ value: o.nombre, label: o.nombre }))}
          />
        ))}

        <FloatingSelect
          label="Tipo de Registro"
          name="tipo_registro"
          value={formulario.tipo_registro}
          onChange={handleChange}
          required
          options={[
            { value: 'Entrada', label: 'Entrada' },
            { value: 'Salida', label: 'Salida' },
          ]}
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-600 active:bg-green-800 transition"
        >
          Registrar Asistencia
        </button>
      </form>
    </div>
  );
}