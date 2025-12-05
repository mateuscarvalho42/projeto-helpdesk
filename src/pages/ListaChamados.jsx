import { useEffect, useState } from "react";
import { api } from "../api";

export default function ListaChamados({ onEdit, onDelete, reload }) {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  async function carregar() {
    setLoading(true);
    setErr(null);

    try {
      const perfil = localStorage.getItem("perfil");
      let resp;

      if (perfil === "tecnico") {
        resp = await api.get("/chamados");
      } else {
        resp = await api.get("/chamados/all");
      }

      setChamados(resp.data || []);
    } catch (error) {
      setErr("Erro ao carregar chamados.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  useEffect(() => {
    carregar();
  }, [reload]);

  return (
    <div className="container">
      <h2>Chamados</h2>

      {loading && <p style={{ color: "var(--muted)" }}>Carregando...</p>}
      {err && <div className="msg err">{err}</div>}

      {!loading && chamados.length === 0 && (
        <p
          className="msg"
          style={{ background: "transparent", color: "var(--muted)" }}
        >
          Nenhum chamado encontrado.
        </p>
      )}

      <ul className="chamados">
        {chamados.map((c) => (
          <li key={c.id || c.uuid || Math.random()} className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>{c.titulo || c.title}</h3>
              <span className="tag">Prioridade: {c.prioridade}</span>
            </div>

            <p>{c.descricao || c.description}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <small style={{ color: "var(--muted)" }}>{c.categoria || ""}</small>
              <small style={{ color: "var(--muted)" }}>
                {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
              </small>
            </div>

            <div
              style={{
                marginTop: "16px",
                width: "100%",
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                className="ghost"
                style={{ width: "100%" }}
                onClick={() => onEdit(c)}
              >
                Editar
              </button>

              <button
                className="danger"
                style={{
                  width: "100%",
                  borderRadius: "50px",
                  fontWeight: "600",
                  background: "#e63946",
                  color: "white",
                  border: "none"
                }}
                onClick={() => onDelete(c)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}