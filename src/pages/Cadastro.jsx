import { useState } from "react";
import { api } from "../api";

export default function Cadastro({ onSuccess }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [perfil, setPerfil] = useState("usuario");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCadastro(e) {
    e.preventDefault();
    setMsg(null);
    if (!nome || !email || !senha) {
      setMsg({ type: "err", text: "Nome, email e senha são obrigatórios." });
      return;
    }
    if (senha !== senha2) {
      setMsg({ type: "err", text: "Senhas não conferem." });
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register", { nome, email, senha, perfil });
      setMsg({ type: "ok", text: "Cadastro realizado com sucesso!" });
      setNome(""); setEmail(""); setSenha(""); setSenha2(""); setPerfil("usuario");
      onSuccess && setTimeout(() => onSuccess(), 900);
    } catch (err) {
      if (err?.response?.status === 409) setMsg({ type: "err", text: "E-mail já em uso." });
      else setMsg({ type: "err", text: "Erro ao cadastrar." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <h2>Criar conta</h2>

      <form onSubmit={handleCadastro}>
        <input type="text" placeholder="Nome completo" value={nome} onChange={(e)=>setNome(e.target.value)} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <div className="form-row">
          <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} />
          <input type="password" placeholder="Confirmar senha" value={senha2} onChange={(e)=>setSenha2(e.target.value)} />
        </div>

        <select value={perfil} onChange={(e)=>setPerfil(e.target.value)}>
          <option value="usuario">Usuário</option>
          <option value="admin">Administrador</option>
        </select>

        <div style={{display:"flex",gap:8}}>
          <button className="primary" type="submit" disabled={loading}>{loading ? "Criando..." : "Criar conta"}</button>
          <button type="button" className="ghost" onClick={() => { setNome(""); setEmail(""); setSenha(""); setSenha2(""); setPerfil("usuario"); }}>Limpar</button>
        </div>
      </form>

      {msg && <div className={`msg ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</div>}
    </div>
  );
}
