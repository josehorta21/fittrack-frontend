import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://fittrack-backend-uoxk.onrender.com/api/auth/login', {
        email,
        password,
      })
      localStorage.setItem('token', res.data.token)
      setMessage(`Welcome, ${res.data.user.name}!`)
    } catch (err) {
      setMessage('Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">FitTrack Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-sm">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      <p className="mt-2 text-sm">Don't have an account? <Link className="text-blue-600 underline" to="/register">Register here</Link></p>
    </div>
  )
}

export default App
