import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function RegistroPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    proyecto: '',
    coordinador: '',
    sst: '',
    operario1: '',
    operario2: '',
    operario3: '',
    operario4: '',
    operario5: '',
    operario6: ''
  });

  const [mensaje, setMensaje] = useState('');

  // Estados para listas desplegables
  const [proyectos, setProyectos] = useState<string[]>([]);
  const [coordinadores, setCoordinadores] = useState<string[]>([]);
  const [ssts, setSsts] = useState<string[]>([]);
  const [operarios, setOperarios] = useState<string[]>([]);

  useEffect(() => {
    // Cargar datos para selects al montar el componente
    async function fetchData() {
      const { data: proyectosData, error: errorProyectos } = await supabase.from('proyectos').select('nombre');
      const { data: coordinadoresData, error: errorCoordinadores } = await supabase.from('coordinadores').select('nombre');
      const { data: sstsData, error: errorSsts } = await supabase.from('ssts').select('nombre');
      const { data: operariosData, error: errorOperarios } = await supabase.from('operarios').select('nombre');

      if (!errorProyectos && proyectosData) setProyectos(proyectosData.map(p => p.nombre));
      if (!errorCoordinadores && coordinadoresData) setCoordinadores(coordinadoresData.map(c => c.nombre));
      if (!errorSsts && sstsData) setSsts(sstsData.map(s => s.nombre));
      if (!errorOperarios && operariosData) setOperarios(operariosData.map(o => o.nombre));
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('registros_asistencia').insert([formData]);

    if (error) {
      console.error(error);
      setMensaje('Error al guardar la información.');
    } else {
      router.push('/confirmacion');
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#1b3a2f' }}>Registro de Asistencia</h2>
        {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}

        <label>Proyecto</label>
        <select name="proyecto" value={formData.proyecto} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione un proyecto</option>
          {proyectos.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <label>Coordinador</label>
        <select name="coordinador" value={formData.coordinador} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione un coordinador</option>
          {coordinadores.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label>SST</label>
        <select name="sst" value={formData.sst} onChange={handleChange} required style={inputStyle}>
          <option value="">Seleccione un SST</option>
          {ssts.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {[1, 2, 3, 4, 5, 6].map(n => (
          <div key={n}>
            <label>Operario {n}</label>
            <select
              name={`operario${n}`}
              value={formData[`operario${n}` as keyof typeof formData]}
              onChange={handleChange}
              required={n === 1}
              style={inputStyle}
            >
              <option value="">Seleccione un operario</option>
              {operarios.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        ))}

        <button type="submit" style={buttonStyle}>Registrar</button>
      </form>
    </div>
  );
}

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1b3a2f',
  padding: '1rem'
};

const formStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  width: '100%',
  maxWidth: '400px'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '12px',
  border: '1px solid #ccc',
  borderRadius: '6px'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '16px',
  marginTop: '10px'
};
