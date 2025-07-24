import { useState } from 'react'

export default function Login() {
  const [nombre, setNombre] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!nombre.trim()) return alert('Por favor ingrese su nombre')

    // Guardar en localStorage
    localStorage.setItem('usuario', JSON.stringify({ nombre }))

    // Redirigir al formulario
    window.location.href = '/registro'
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f1f5f9'
    }}>
      <form onSubmit={handleLogin} style={{
        background: 'white',
        padding: 30,
        borderRadius: 12,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2>Ingreso Coordinador</h2>
        <input
          type="text"
          placeholder="Nombre del Coordinador"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: '100%', padding: 10, margin: '15px 0' }}
          required
        />
        <button style={{
          backgroundColor: '#22c55e',
          color: 'white',
          padding: 10,
          border: 'none',
          borderRadius: 6,
          width: '100%'
        }}>
          Ingresar
        </button>
      </form>
    </div>
  )
}
