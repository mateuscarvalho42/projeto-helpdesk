import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CriarChamado from "./pages/CriarChamado";
import ListaChamados from "./pages/ListaChamados";

export default function App() {
  const [page, setPage] = useState("login");
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userEmail");
    if (token && user) {
      setUserEmail(user);
      setPage("listar"); // se já estiver logado, vai direto para lista
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setPage("login");
  }

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <div className="logo">HD</div>
          <div>
            <h1>HelpDesk</h1>
            <small>Painel</small>
          </div>
        </div>

        <div className="nav-actions">
          {!userEmail && <button onClick={() => setPage("login")}>Entrar</button>}
          {!userEmail && <button onClick={() => setPage("cadastro")}>Cadastrar</button>}
          {userEmail && <button onClick={() => setPage("listar")}>Chamados</button>}
          {userEmail && <button onClick={() => setPage("criar")}>Novo</button>}
          {userEmail && <button onClick={handleLogout} className="danger">Sair</button>}
        </div>
      </nav>

      <main className="main">
        {page === "login" && <Login onLogin={(email) => { setUserEmail(email); setPage("listar"); }} />}
        {page === "cadastro" && <Cadastro onSuccess={() => setPage("login")} />}
        {page === "listar" && <ListaChamados />}
        {page === "criar" && <CriarChamado onCreated={() => setPage("listar")} />}
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} HelpDesk</span>
      </footer>
    </>
  );
}
