import React from "react";
import "./globals.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Ingreso autorizado</h2>
        <form>
          <input type="email" placeholder="Correo electrónico" required />
          <input type="password" placeholder="Contraseña" required />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}
