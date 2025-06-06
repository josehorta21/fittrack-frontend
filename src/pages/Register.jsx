import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://fittrack-backend-uoxk.onrender.com/api/auth/register', {
        name, email, password
      })
      setMessage('Registration successful! Redirecting...')
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      setMessage('Registration failed. Try a different email.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Register to FitTrack</h1>
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-sm">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded"
          value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      <p className="mt-2 text-sm">Already have an account? <Link className="text-blue-600 underline" to="/">Login</Link></p>
    </div>
  )
}

export default Register
