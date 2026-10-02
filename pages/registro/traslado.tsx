/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, FormEvent } from "react";
import supabase from "../../lib/supabaseClient";

export default function RegistroTraslado() {
  const [coordinadores, setCoordinadores] = useState<any[]>([]);
  const [ssts, setSsts] = useState<any[]>([]);
  const [operarios, setOperarios] = useState<any[]>([]);

  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [coordinador, setCoordinador] = useState("");
  const [sst, setSst] = useState("");

  const [operario1, setOperario1] = useState("");
  const [operario2, setOperario2] = useState("");
  const [operario3, setOperario3] = useState("");
  const [operario4, setOperario4] = useState("");
  const [operario5, setOperario5] = useState("");
  const [operario6, setOperario6] = useState("");

  const [observacion, setObservacion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false);

  // =========================
  // CARGAR DATOS DE SUPABASE
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: coordData, error: coordError } =
          await supabase.from("coordinadores").select("*");

        const { data: sstData, error: sstError } =
          await supabase.from("ssts").select("*");

        const { data: opData, error: opError } =
          await supabase.from("operarios").select("*");

        if (coordError) {
          console.error("Error coordinadores:", coordError.message);
        }

        if (sstError) {
          console.error("Error SST:", sstError.message);
        }

        if (opError) {
          console.error("Error operarios:", opError.message);
        }

        if (coordData) {
          setCoordinadores(coordData);
        }

        if (sstData) {
          setSsts(sstData);
        }

        if (opData) {
          setOperarios(opData);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  // =========================
  // OBTENER UBICACIÓN
  // =========================
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          setUbicacion(
            `https://www.google.com/maps?q=${latitude},${longitude}`
          );
        },
        (err) => {
          console.error("Error al obtener ubicación:", err);
          setUbicacion("No disponible");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  // =========================
  // REGISTRAR TRASLADO
  // =========================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setMensajeExito("");
    setCargando(true);

    try {
      // IMPORTANTE:
      // El select devuelve STRING y Supabase tiene id NUMÉRICO.
      // Por eso usamos String() en ambos lados.

      const coordinadorSeleccionado = coordinadores.find(
        (c) => String(c.id) === String(coordinador)
      );

      const sstSeleccionado = ssts.find(
        (s) => String(s.id) === String(sst)
      );

      if (!coordinadorSeleccionado) {
        alert("Debes seleccionar un coordinador");
        setCargando(false);
        return;
      }

      if (!sstSeleccionado) {
        alert("Debes seleccionar un SST");
        setCargando(false);
        return;
      }

      if (!operario1) {
        alert("Debes seleccionar al menos un operario");
        setCargando(false);
        return;
      }

      // Obtener los nombres
      const coordinadorNombre = coordinadorSeleccionado.nombre;
      const sstNombre = sstSeleccionado.nombre;

      // =========================
      // DATOS A GUARDAR
      // =========================
      const datosTraslado = {
        proyecto_desde: desde,
        proyecto_hasta: hasta,

        coordinador: coordinadorNombre,
        sst: sstNombre,

        operario1: operario1 || null,
        operario2: operario2 || null,
        operario3: operario3 || null,
        operario4: operario4 || null,
        operario5: operario5 || null,
        operario6: operario6 || null,

        observacion: observacion || null,

        ubicacion: ubicacion || null,

        // Fecha y hora actual
        fecha_hora: new Date().toISOString(),
      };

      console.log("Datos que se enviarán:", datosTraslado);

      // =========================
      // INSERTAR EN SUPABASE
      // =========================
      const { error } = await supabase
        .from("traslados")
        .insert([datosTraslado]);

      if (error) {
        console.error("Error Supabase:", error);

        alert(
          "Error al registrar traslado:\n\n" +
            error.message
        );

        setCargando(false);
        return;
      }

      // =========================
      // LIMPIAR FORMULARIO
      // =========================
      setDesde("");
      setHasta("");
      setCoordinador("");
      setSst("");

      setOperario1("");
      setOperario2("");
      setOperario3("");
      setOperario4("");
      setOperario5("");
      setOperario6("");

      setObservacion("");

      setMensajeExito(
        "¡Traslado registrado correctamente! Muchas gracias."
      );
    } catch (error: any) {
      console.error("Error inesperado:", error);

      alert(
        "Ocurrió un error al registrar el traslado: " +
          (error?.message || "Error desconocido")
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      style={{
        background: "#1b4332",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Registro de Traslado
        </h2>

        {/* DESDE */}
        <input
          type="text"
          placeholder="Desde"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
          required
        />

        {/* HASTA */}
        <input
          type="text"
          placeholder="Hasta"
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
          required
        />

        {/* COORDINADOR */}
        <select
          value={coordinador}
          onChange={(e) => setCoordinador(e.target.value)}
          required
        >
          <option value="">Coordinador</option>

          {coordinadores.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.nombre}
            </option>
          ))}
        </select>

        {/* SST */}
        <select
          value={sst}
          onChange={(e) => setSst(e.target.value)}
          required
        >
          <option value="">SST</option>

          {ssts.map((s) => (
            <option key={s.id} value={String(s.id)}>
              {s.nombre}
            </option>
          ))}
        </select>

        {/* OPERARIOS */}
        {[
          {
            label: "Operario 1",
            value: operario1,
            set: setOperario1,
            required: true,
          },
          {
            label: "Operario 2",
            value: operario2,
            set: setOperario2,
          },
          {
            label: "Operario 3",
            value: operario3,
            set: setOperario3,
          },
          {
            label: "Operario 4",
            value: operario4,
            set: setOperario4,
          },
          {
            label: "Operario 5",
            value: operario5,
            set: setOperario5,
          },
          {
            label: "Operario 6",
            value: operario6,
            set: setOperario6,
          },
        ].map((op, idx) => (
          <select
            key={idx}
            value={op.value}
            onChange={(e) => op.set(e.target.value)}
            required={op.required}
          >
            <option value="">
              {op.label}
            </option>

            {operarios.map((o) => (
              <option
                key={o.id}
                value={o.nombre}
              >
                {o.nombre}
              </option>
            ))}
          </select>
        ))}

        {/* OBSERVACIONES */}
        <textarea
          placeholder="Observaciones"
          value={observacion}
          onChange={(e) => setObservacion(e.target.value)}
          style={{
            resize: "none",
            minHeight: "60px",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* BOTÓN */}
        <button
          type="submit"
          disabled={cargando}
          style={{
            padding: "10px",
            borderRadius: "6px",
            background: "#2d6a4f",
            color: "#fff",
            border: "none",
            cursor: cargando ? "not-allowed" : "pointer",
            fontWeight: "bold",
            opacity: cargando ? 0.7 : 1,
          }}
        >
          {cargando
            ? "Registrando..."
            : "Registrar Traslado"}
        </button>

        {/* MENSAJE */}
        {mensajeExito && (
          <p
            style={{
              color: "#2d6a4f",
              textAlign: "center",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            {mensajeExito}
          </p>
        )}
      </form>
    </div>
  );
}
