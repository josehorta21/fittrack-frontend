import { useState } from 'react'
import axios from 'axios'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://fittrack-backend-uoxk.onrender.com/api/auth/login', { email, password })
      setToken(res.data.token)
      alert('Login successful!')
    } catch (err) {
      alert('Login failed!')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">FitTrack Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      {token && <p className="mt-4 text-green-600">Token: {token}</p>}
    </div>
  )
}

export default App
