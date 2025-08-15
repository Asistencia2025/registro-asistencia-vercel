import React, { useState } from "react";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Correo:", email, "Contraseña:", password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img
          src="/google-logo.png"
          alt="Logo"
          className={styles.logo}
        />
        <h2>Inicia sesión</h2>
        <p>Utiliza tu cuenta</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}
