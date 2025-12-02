import { useState } from "react";
import { api } from "../api";

export default function CriarChamado({ onCreated }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("média");
  const [categoria, setCategoria] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    if (!titulo || !descricao || !prioridade || !categoria) {
      setMsg({ type: "err", text: "Preencha todos os campos." });
      return;
    }

    setLoading(true);
    try {
      await api.post("/chamados", { titulo, descricao, prioridade, categoria });
      setMsg({ type: "ok", text: "Chamado criado com sucesso." });
      setTitulo(""); setDescricao(""); setCategoria(""); setPrioridade("média");
      onCreated && setTimeout(() => onCreated(), 700);
    } catch (err) {
      setMsg({ type: "err", text: "Erro ao criar chamado." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2>Novo chamado</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={titulo} onChange={(e)=>setTitulo(e.target.value)} />
        <textarea placeholder="Descrição" value={descricao} onChange={(e)=>setDescricao(e.target.value)} />
        <div className="form-row">
          <select value={prioridade} onChange={(e)=>setPrioridade(e.target.value)}>
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
          <input type="text" placeholder="Categoria" value={categoria} onChange={(e)=>setCategoria(e.target.value)} />
        </div>

        <div style={{display:"flex",gap:8}}>
          <button className="primary" type="submit" disabled={loading}>{loading ? "Criando..." : "Criar"}</button>
          <button type="button" className="ghost" onClick={() => { setTitulo(""); setDescricao(""); setPrioridade("média"); setCategoria(""); }}>Limpar</button>
        </div>
      </form>

      {msg && <div className={`msg ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</div>}
    </div>
  );
}
