import { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { AuthContext } from "../context/AuthContext"; 

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const data = await loginUser(username, password);
      
      const userData = { username: username }; 
      login(data.access, userData); 
      
      localStorage.setItem("refresh", data.refresh);
      
      navigate("/dashboard");
    } catch (err) {
      setError("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] font-['DM_Sans',sans-serif]">
      {/* Painel esquerdo */}
      <div className="hidden md:flex w-[42%] bg-[#111] flex-col justify-center px-14 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-52 h-52 bg-[#ff301d] rounded-full opacity-[0.06]" />
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#ff301d] rounded-full opacity-[0.04]" />

        <h1 className="font-['Bebas_Neue',cursive] text-[56px] text-white tracking-[2px] leading-none">
          ASCENT<span className="text-[#ff301d]">EVOLUTION</span>
        </h1>
        <p className="text-[11px] text-[#555] tracking-[3px] uppercase mt-3">
          Train. Recover. Evolve.
        </p>

        <div className="w-10 h-[2px] bg-[#ff301d] my-8" />

        <ul className="space-y-3">
          {[
            "Registre treinos e evoluções",
            "Monitore recuperação muscular",
            "Acompanhe metas e PRs",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-[13px] text-[#777]">
              <span className="w-[6px] h-[6px] rounded-full bg-[#ff301d] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Painel direito */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-14 bg-[#0d0d0d]">
        {/* Tabs */}
        <div className="flex border-b border-[#222] mb-8">
          <button className="text-white text-[14px] font-medium px-5 pb-3 border-b-2 border-[#ff301d] -mb-px tracking-wide">
            Entrar
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-[#555] text-[14px] font-medium px-5 pb-3 border-b-2 border-transparent -mb-px tracking-wide hover:text-[#888] transition-colors"
          >
            Criar conta
          </button>
        </div>

        <h2 className="font-['Bebas_Neue',cursive] text-[34px] text-white tracking-[1px] mb-1">
          Bem-vindo de volta
        </h2>
        <p className="text-[13px] text-[#555] mb-8">Acesse sua conta para continuar</p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
          <div>
            <label className="block text-[11px] uppercase tracking-[2px] text-[#555] mb-2">
              Usuário
            </label>
            <input
              type="text"
              placeholder="seu_usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-[#161616] border border-[#222] rounded-md px-4 py-3 text-[14px] text-white placeholder-[#444] outline-none focus:border-[#ff301d] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[2px] text-[#555] mb-2">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#161616] border border-[#222] rounded-md px-4 py-3 text-[14px] text-white placeholder-[#444] outline-none focus:border-[#ff301d] transition-colors"
            />
          </div>

          {error && <p className="text-[13px] text-[#ff301d]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff301d] hover:bg-[#d4281a] active:scale-[0.98] text-white text-[13px] font-medium tracking-[2px] uppercase rounded-md py-3 transition-all mt-2 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-[12px] text-[#444] mt-5">
          Não tem conta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#ff301d] cursor-pointer hover:underline"
          >
            Crie uma agora
          </span>
        </p>
      </div>
    </div>
  );
}