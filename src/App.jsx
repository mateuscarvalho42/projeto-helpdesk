import React, { useState } from 'react'
import Login from './components/Login'
import Tickets from './components/Tickets'
import NewTicket from './components/NewTicket'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [view, setView] = useState('tickets')

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setView('login')
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1>Helpdesk</h1>
        <div>
          {token ? (
            <>
              <button onClick={() => setView('tickets')}>Chamados</button>
              <button onClick={() => setView('new')}>Novo Chamado</button>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <button onClick={() => setView('login')}>Entrar</button>
          )}
        </div>
      </nav>

      <main className="container">
        {!token && view === 'login' && (
          <Login onLogin={(t) => { localStorage.setItem('token', t); setToken(t); setView('tickets') }} />
        )}

        {token && view === 'tickets' && <Tickets />}

        {token && view === 'new' && <NewTicket onCreated={() => setView('tickets')} />}
      </main>

      <footer className="footer">
        <small>Front conectado ao back-end.</small>
      </footer>
    </div>
  )
}
