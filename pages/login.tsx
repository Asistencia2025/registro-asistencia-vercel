import { useState } from "react";
import styles from "../styles/Login.module.css"; // Importar el CSS module

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Correo:", email, "Contraseña:", password);
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginBox} onSubmit={handleSubmit}>
        <h2 className={styles.loginTitle}>Ingreso autorizado</h2>

        <label className={styles.loginLabel}>Correo electrónico</label>
        <input
          type="email"
          className={styles.loginInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.loginLabel}>Contraseña</label>
        <input
          type="password"
          className={styles.loginInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles.loginButton}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
