import React from "react";
import "./globals.css"; // Asegúrate que aquí esté tu CSS

export default function Login() {
  return (
    <div className="login-container">
      <h1>Ingreso autorizado</h1>
      <form>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          placeholder="Ingresa tu correo"
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          required
        />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}
