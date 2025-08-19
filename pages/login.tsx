import styles from "../styles/Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Correo electrónico"
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className={styles.input}
      />
      <button className={styles.button}>Ingresar</button>
    </div>
  );
}
