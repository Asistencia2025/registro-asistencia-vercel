import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Registro() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Estados para formulario
  const [proyecto, setProyecto] = useState("");
  const [coordinador, setCoordinador] = useState("");
  const [sst, setSst] = useState("");
  const [operarios, setOperarios] = useState<string[]>(["", "", "", "", "", ""]);
  const [tipoRegistro, setTipoRegistro] = useState("Entrada");
  const [mensaje, setMensaje] = useState("");

  // Estados para listas desplegables
  const [listaCoordinadores, setListaCoordinadores] = useState<string[]>([]);
  const [listaSst, setListaSst] = useState<string[]>([]);
  const [listaOperadores, setListaOperadores] = useState<string[]>([]);

  // Verificar sesión
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) router.push("/login");
      else setLoading(false);
    };
    checkSession();
  }, [router]);

  // Obtener datos para listas desplegables
  useEffect(() => {
    const fetchDatos = async () => {
      const { data: coordData } = await supabase.from("coordinadores").select("nombre");
      const { data: sstData } = await supabase.from("sst").select("nombre");
      const { data: operadoresData } = await supabase.from("operadores").select("nombre");

      setListaCoordinadores(coordData?.map((c: any) => c.nombre) || []);
      setListaSst(sstData?.map((s: any) => s.nombre) || []);
      setListaOperadores(operadoresData?.map((o: any) => o.nombre) || []);
    };
    fetchDatos();
  }, []);

  const handleOperarioChange = (index: number, value: string) => {
    const nuevosOperarios = [...operarios];
    nuevosOperarios[index] = value;
    setOperarios(nuevosOperarios);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const registro = {
      proyecto,
      coordinador,
      sst,
      operarios,
      tipoRegistro,
    };

    const { error } = await supabase
      .from("registros_asistencia")
      .insert([registro]);

    if (error) {
      console.error("❌ Error guardando asistencia:", error.message);
      setMensaje("❌ Error guardando asistencia: " + error.message);
    } else {
      console.log("✅ Registro guardado con éxito");
      setMensaje("✅ Registro guardado con éxito");

      // Limpiar formulario
      setProyecto("");
      setCoordinador("");
      setSst("");
      setOperarios(["", "", "", "", "", ""]);
      setTipoRegistro("Entrada");
    }
  };

  if (loading) return <div>Cargando sesión...</div>;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Registro de Asistencia</h2>

        {mensaje && <div style={{ marginBottom: "10px" }}>{mensaje}</div>}

        <input
          type="text"
          placeholder="Nombre del Proyecto"
          value={proyecto}
          onChange={(e) => setProyecto(e.target.value)}
          required
        />

        {/* Coordinador desplegable */}
        <select
          value={coordinador}
          onChange={(e) => setCoordinador(e.target.value)}
          required
        >
          <option value="">Seleccione Coordinador</option>
          {listaCoordinadores.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>

        {/* SST desplegable */}
        <select
          value={sst}
          onChange={(e) => setSst(e.target.value)}
          required
        >
          <option value="">Seleccione SST</option>
          {listaSst.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>

        {/* Tipo de registro */}
        <select
          value={tipoRegistro}
          onChange={(e) => setTipoRegistro(e.target.value)}
        >
          <option value="Entrada">Entrada</option>
          <option value="Salida">Salida</option>
        </select>

        {/* Operarios desplegables */}
        {operarios.map((operario, index) => (
          <select
            key={index}
            value={operario}
            onChange={(e) => handleOperarioChange(index, e.target.value)}
          >
            <option value="">Operario {index + 1}</option>
            {listaOperadores.map((o, idx) => (
              <option key={idx} value={o}>{o}</option>
            ))}
          </select>
        ))}

        <button type="submit">Registrar Asistencia</button>
      </form>
    </div>
  );
}
