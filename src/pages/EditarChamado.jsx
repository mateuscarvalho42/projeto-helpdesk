import { useState } from "react";
import { api } from "../api";

export default function EditarChamado({ chamado, onUpdated }) {
  if (!chamado) {
    return (
      <div className="container">
        <h2>Editar Chamado</h2>
        <p className="msg" style={{ background: "transparent", color: "var(--muted)" }}>
          Nenhum chamado selecionado.
        </p>
      </div>
    );
  }

  // garante ID independente do nome vindo do backend
  const id = chamado.id || chamado._id || chamado.uuid;

  const [titulo, setTitulo] = useState(chamado.titulo);
  const [descricao, setDescricao] = useState(chamado.descricao);
  const [categoria, setCategoria] = useState(chamado.categoria);
  const [prioridade, setPrioridade] = useState(chamado.prioridade);

  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      await api.put(`/chamados/${id}`, {
        titulo,
        descricao,
        categoria,
        prioridade,
      });

      setMsg("Chamado atualizado com sucesso!");

      // volta pra lista no App.jsx
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error(err);
      setMsg("Erro ao atualizar chamado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2>Editar Chamado</h2>

      {msg && (
        <div className={msg.includes("Erro") ? "msg err" : "msg ok"}>
          {msg}
        </div>
      )}

      <form className="form-login" onSubmit={handleSave}>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
        />

        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
        />

        <input
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Categoria"
        />

        <select
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>

        <button className="primary" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}