import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Tickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  async function load() {
    setLoading(true)
    setErro(null)
    try {
      // Ajuste para o endpoint real: ex /chamados ou /tickets
      const res = await api.get('/tickets')
      setTickets(res.data || [])
    } catch (err) {
      console.error(err)
      setErro(err.response?.data?.mensagem || err.message || 'Erro ao listar chamados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="card">
      <h2>Chamados</h2>
      {loading && <p>Carregando...</p>}
      {erro && <div className="error">{erro}</div>}
      {!loading && tickets.length === 0 && <p>Nenhum chamado encontrado.</p>}
      <ul className="ticket-list">
        {tickets.map(t => (
          <li key={t.id ?? t._id}>
            <strong>{t.titulo || t.title}</strong>
            <div className="meta">{t.prioridade || t.priority} • {t.categoria || t.category}</div>
            <p>{t.descricao || t.description}</p>
          </li>
        ))}
      </ul>
      <button onClick={load}>Atualizar</button>
    </div>
  )
}
