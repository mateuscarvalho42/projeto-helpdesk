import React, { useState } from 'react'
import Login from './components/Login'
import Tickets from './components/Tickets'
import NewTicket from './components/NewTicket'
import axios from "axios"

export default function App() {
  const [token, setToken] = useState("")
  const [view, setView] = useState("")

//   function handleLogout() {
//     localStorage.removeItem('token')
//     setToken(null)
//     setView('login')
//   }
const conectarBack = async () => {
  try{
    console.log("valor de entrada", teste)
    const resultado = await axios.post("http://localhost:3000/auth/register", {login})
    SetAuthRegister(resultado.data.id);
    alert("LOGOU COM SUCESSO")
  }catch(error){
    alert("erro mano" + error)
  }
}


  return (
    <div className="app">
      <nav className="navbar">
        <h1>Helpdesk</h1>
        <div>
            <>
              <button onClick={() => setView('tickets')}>Chamados</button>
              <button onClick={() => setView('new')}>Novo Chamado</button>
              <button >Sair</button>
            </>
        
            <button onClick={conectarBack}>Entrar</button>
        </div>
      </nav>
    </div>
  )
}
