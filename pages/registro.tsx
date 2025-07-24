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
      const { data: proyectosData, error: errorProyectos } = await supabase
        .from('proyectos')
        .select();
      const { data: coordinadoresData, error: errorCoordinadores } = await supabase
        .from('coordinadores')
        .select();
      const { data: sstsData, error: errorSsts } = await supabase
        .from('ssts')
        .select();
      const { data: operariosData, error: errorOperarios } = await supabase
        .from('operarios')
        .select();

      if (!errorProyectos) setProyectos(proyectosData || []);
      if (!errorCoordinadores) setCoordinadores(coordinadoresData || []);
      if (!errorSsts) setSsts(sstsData || []);
      if (!errorOperarios) setOperarios(operariosData || []);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Registro de Asistencia</h1>
      {/* Aquí va el formulario o contenido principal */}
    </div>
  );
}
