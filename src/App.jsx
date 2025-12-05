import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CriarChamado from "./pages/CriarChamado";
import ListaChamados from "./pages/ListaChamados";
import EditarChamado from "./pages/EditarChamado";
import { api } from "./api";

export default function App() {
  const [page, setPage] = useState("login");
  const [userEmail, setUserEmail] = useState(null);
  const [chamadoEdit, setChamadoEdit] = useState(null);

  // 🔥 Estado responsável por disparar recarregamento da lista
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userEmail");

    if (token && user) {
      setUserEmail(user);
      setPage("listar");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    setPage("login");
  }

  // 🔥 Função de excluir chamado – agora recarrega em tempo real
  async function handleExcluirChamado(chamado) {
    if (!window.confirm("Tem certeza que deseja excluir este chamado?")) {
      return;
    }

    try {
      const id = chamado.id || chamado._id || chamado.uuid;

      await api.delete(`/chamados/${id}`);

      alert("Chamado excluído com sucesso!");

      // 🔥 Dispara reload da lista EM TEMPO REAL
      setReloadList((prev) => !prev);

      // Garante que estamos na página de listagem
      setPage("listar");

    } catch (err) {
      console.error(err);
      alert("Erro ao excluir chamado.");
    }
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

        {page === "login" && (
          <Login
            onLogin={(email) => {
              setUserEmail(email);
              setPage("listar");
            }}
          />
        )}

        {page === "cadastro" && (
          <Cadastro onSuccess={() => setPage("login")} />
        )}

        {page === "listar" && (
          <ListaChamados
            reload={reloadList}      // 🔥 dispara recarregamento
            onEdit={(chamado) => {
              setChamadoEdit(chamado);
              setPage("editar");
            }}
            onDelete={(chamado) => handleExcluirChamado(chamado)}
          />
        )}

        {page === "criar" && (
          <CriarChamado onCreated={() => setPage("listar")} />
        )}

        {page === "editar" && (
          <EditarChamado
            chamado={chamadoEdit}
            onUpdated={() => {
              setPage("listar");
              setChamadoEdit(null);
              setReloadList((prev) => !prev); // Se editar, recarrega lista também
            }}
          />
        )}

      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} HelpDesk</span>
      </footer>
    </>
  );
}