import React, { useState } from 'react'
import api from '../api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, senha })
      const token = res.data.token || res.data.accessToken || res.data.jwt
      if (!token) throw new Error('Token não retornado (ajuste o frontend ao formato do backend).')
      onLogin(token)
    } catch (err) {
      console.error(err)
      setErro(err.response?.data?.mensagem || err.message || 'Erro ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Entrar</h2>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Senha
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      </label>
      {erro && <div className="error">{erro}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
      <p className="hint">Se o endpoint de login for diferente (ex: /login), altere a chamada em <code>api.post('/auth/login')</code>.</p>
    </form>
  )
}