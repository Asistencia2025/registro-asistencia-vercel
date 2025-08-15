import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Traslado() {
  const [proyecto,setProyecto]=useState("");
  const [coordinador,setCoordinador]=useState("");
  const [sst,setSst]=useState("");
  const [operarios,setOperarios]=useState(["","","",""]);
  const [desde,setDesde]=useState("");
  const [hasta,setHasta]=useState("");
  const [mensaje,setMensaje]=useState("");

  const [listaCoordinadores,setListaCoordinadores]=useState<string[]>([]);
  const [listaSst,setListaSst]=useState<string[]>([]);
  const [listaOperadores,setListaOperadores]=useState<string[]>([]);

  useEffect(()=>{
    const fetchDatos=async()=>{
      const {data:coord}=await supabase.from("coordinadores").select("nombre");
      const {data:sst}=await supabase.from("sst").select("nombre");
      const {data:op}=await supabase.from("operadores").select("nombre");
      setListaCoordinadores(coord?.map(c=>c.nombre)||[]);
      setListaSst(sst?.map(s=>s.nombre)||[]);
      setListaOperadores(op?.map(o=>o.nombre)||[]);
    }; fetchDatos();
  },[]);

  const handleOperarioChange=(i:number,val:string)=>{
    const nuevos=[...operarios]; nuevos[i]=val; setOperarios(nuevos);
  };

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    const registro={proyecto,coordinador,sst,operarios,tipo:"Traslado",desde,hasta};
    const {error}=await supabase.from("registros_asistencia").insert([registro]);
    if(error) setMensaje("❌ "+error.message);
    else {
      setMensaje("✅ Traslado guardado");
      setProyecto(""); setCoordinador(""); setSst(""); setOperarios(["","","",""]);
      setDesde(""); setHasta("");
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:"30px"}}>
      <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"10px",width:"400px",background:"#0d6efd",padding:"20px",borderRadius:"12px",color:"#fff"}}>
        <h2>Registro Traslado</h2>
        {mensaje && <div>{mensaje}</div>}
        <input placeholder="Proyecto" value={proyecto} onChange={e=>setProyecto(e.target.value)} required/>
        <select value={coordinador} onChange={e=>setCoordinador(e.target.value)} required>
          <option value="">Seleccione Coordinador</option>
          {listaCoordinadores.map((c,i)=><option key={i} value={c}>{c}</option>)}
        </select>
        <select value={sst} onChange={e=>setSst(e.target.value)} required>
          <option value="">Seleccione SST</option>
          {listaSst.map((s,i)=><option key={i} value={s}>{s}</option>)}
        </select>
        <input placeholder="Desde" value={desde} onChange={e=>setDesde(e.target.value)} required/>
        <input placeholder="Hasta" value={hasta} onChange={e=>setHasta(e.target.value)} required/>
        {operarios.map((o,i)=>
          <select key={i} value={o} onChange={e=>handleOperarioChange(i,e.target.value)}>
            <option value="">Operario {i+1}</option>
            {listaOperadores.map((op,j)=><option key={j} value={op}>{op}</option>)}
          </select>
        )}
        <button type="submit" style={{padding:"10px",borderRadius:"6px",background:"#0d6efd",color:"#fff"}}>Registrar Traslado</button>
      </form>
    </div>
  );
}
