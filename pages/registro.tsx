import React, { useState, FormEvent } from "react";
import "@/styles/globals.css"; // ajuste la ruta si es necesario

const Registro = () => {
  const [proyecto, setProyecto] = useState("");
  const [coordinador, setCoordinador] = useState("");
  const [sst, setSst] = useState("");
  const [operarios, setOperarios] = useState<string[]>(["", "", "", "", "", ""]);
  const [tipoRegistro, setTipoRegistro] = useState("Entrada");

  const handleOperarioChange = (index: number, value: string) => {
    const nuevosOperarios = [...operarios];
    nuevosOperarios[index] = value;
    setOperarios(nuevosOperarios);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registro = {
      proyecto,
      coordinador,
      sst,
      operarios,
      tipoRegistro,
      fecha: new Date().toISOString(),
    };
    console.log("Registro enviado:", registro);
    // Aquí iría la lógica para guardar en Supabase
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Registro de Asistencia</h2>

        <input
          type="text"
          placeholder="Nombre del Proyecto"
          value={proyecto}
          onChange={(e) => setProyecto(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nombre del Coordinador"
          value={coordinador}
          onChange={(e) => setCoordinador(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nombre del SST"
          value={sst}
          onChange={(e) => setSst(e.target.value)}
        />

        <select
          value={tipoRegistro}
          onChange={(e) => setTipoRegistro(e.target.value)}
        >
          <option value="Entrada">Entrada</option>
          <option value="Salida">Salida</option>
        </select>

        {operarios.map((operario, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Operario ${index + 1}`}
            value={operario}
            onChange={(e) => handleOperarioChange(index, e.target.value)}
          />
        ))}

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;
