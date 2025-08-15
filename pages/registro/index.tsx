export default function RegistroIndex() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Bienvenido al módulo de Registro</h1>
      <p>Seleccione una opción:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><a href="/registro/tipo">Tipo</a></li>
        <li><a href="/registro/entrada">Entrada</a></li>
        <li><a href="/registro/salida">Salida</a></li>
        <li><a href="/registro/traslado">Traslado</a></li>
      </ul>
    </div>
  );
}
