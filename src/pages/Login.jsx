import { useState } from "react";
import { api } from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setMsg(null);
    if (!email || !senha) {
      setMsg({ type: "err", text: "Preencha e-mail e senha." });
      return;
    }

    setLoading(true);
    try {
      const resp = await api.post("/auth/login", { email, senha });
      // expectativa: backend retorna { token, usuario? } - vamos salvar o token e email se vier
      const token = resp.data?.token || resp.data?.accessToken || null;
      const usuario = resp.data?.usuario || resp.data?.user || null;
      if (token) {
        localStorage.setItem("token", token);
        if (usuario?.email) {
          localStorage.setItem("userEmail", usuario.email);
          onLogin && onLogin(usuario.email);
        } else {
          localStorage.setItem("userEmail", email);
          onLogin && onLogin(email);
        }
        setMsg({ type: "ok", text: "Login realizado." });
      } else {
        // se backend retornar apenas mensagem ou similar
        setMsg({ type: "ok", text: "Resposta recebida (verifique formato do backend)." });
      }
    } catch (err) {
      const code = err?.response?.status;
      if (code === 401 || code === 400) setMsg({ type: "err", text: "Credenciais inválidas." });
      else setMsg({ type: "err", text: "Erro ao conectar com o servidor." });
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="container" style={{ maxWidth: 420 }}>
    <h2>Entrar na conta</h2>

    <form onSubmit={handleLogin} className="form-login">
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button
        className="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>

    {msg && (
      <div className={`msg ${msg.type === "ok" ? "ok" : "err"}`}>
        {msg.text}
      </div>
    )}
  </div>
);
}