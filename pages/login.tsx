import styles from '../styles/Login.module.css';

export default function Login() {
  return (
    <div className={styles['login-container']}>
      {/* Logo de Google */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="Google Logo"
        className={styles['login-logo']}
      />

      {/* Título */}
      <h1 className={styles['login-title']}>Inicia sesión</h1>
      <p className={styles['login-subtitle']}>Utiliza tu cuenta de Google</p>

      {/* Campo de correo */}
      <input
        type="email"
        placeholder="Correo electrónico"
        className={styles['login-input']}
      />

      {/* Campo de contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        className={styles['login-input']}
      />

      {/* Botón */}
      <button className={styles['login-button']}>Iniciar sesión</button>

      {/* Enlaces */}
      <a href="#" className={styles['login-link']}>¿Has olvidado tu contraseña?</a>
      <a href="#" className={styles['login-link']}>Crear cuenta</a>
    </div>
  );
}
