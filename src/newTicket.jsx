import React, { useState } from 'react'
import api from '../api'

export default function NewTicket({ onCreated }) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState('')
  const [prioridade, setPrioridade] = useState('Média')
  const [erro, setErro] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      // Ajuste endpoint se necessário (ex: '/chamados')
      const payload = { titulo, descricao, categoria, prioridade }
      await api.post('/tickets', payload)
      setTitulo(''); setDescricao(''); setCategoria(''); setPrioridade('Média')
      if (onCreated) onCreated()
    } catch (err) {
      console.error(err)
      setErro(err.response?.data?.mensagem || err.message || 'Erro ao criar chamado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Novo Chamado</h2>
      <label>
        Título
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </label>
      <label>
        Descrição
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      </label>
      <label>
        Categoria
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      </label>
      <label>
        Prioridade
        <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>
      </label>
      {erro && <div className="error">{erro}</div>}
      <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Criar Chamado'}</button>
    </form>
  )
}