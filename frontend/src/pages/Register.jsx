import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await registerUser(form.username, form.password, form.email);
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data?.error || "Erro ao criar conta.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0a] font-['DM_Sans',sans-serif]">

      {/* Painel esquerdo */}
      <div className="hidden md:flex w-[42%] bg-[#111] flex-col justify-center px-14 relative overflow-hidden">

        <div className="absolute -top-16 -left-16 w-52 h-52 bg-[#e63946] rounded-full opacity-[0.06]" />
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#e63946] rounded-full opacity-[0.04]" />

        <h1 className="font-['Bebas_Neue',cursive] text-[56px] text-white tracking-[2px] leading-none">
          IRON<span className="text-[#e63946]">TRACK</span>
        </h1>

        <p className="text-[11px] text-[#555] tracking-[3px] uppercase mt-3">
          Train. Recover. Evolve.
        </p>

        <div className="w-10 bg-[#e63946] my-8" />

        <ul className="space-y-3">
          {[
            "Registre treinos e evoluções",
            "Monitore recuperação muscular",
            "Acompanhe metas e PRs",
            "Dashboard de performance",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-[13px] text-[#777]"
            >
              <span className="rounded-full bg-[#e63946]" />
              {item}
            </li>
          ))}
        </ul>

      </div>

      {/* Painel direito */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 py-10 bg-[#0d0d0d]">

        <div className="w-full max-w-md mx-auto">

          {/* Tabs */}
          <div className="flex border-b border-[#222] mb-8">
            <button
              onClick={() => navigate("/login")}
              className="text-[#555] text-[14px] font-medium px-5 pb-3 border-b-2 border-transparent -mb-px tracking-wide hover:text-[#888] transition"
            >
              Entrar
            </button>

            <button className="text-white text-[14px] font-medium px-5 pb-3 border-b-2 border-[#e63946] -mb-px tracking-wide">
              Criar conta
            </button>
          </div>

          <h2 className="font-['Bebas_Neue',cursive] text-[34px] text-white tracking-[1px] mb-1">
            Criar conta
          </h2>

          <p className="text-[13px] text-[#555] mb-8">
            Comece sua jornada hoje
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nome / Sobrenome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <div>
                <label className="block text-[11px] uppercase tracking-[2px] text-[#555] mb-2">
                  Nome
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="João"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#161616] border border-[#222] rounded-md px-4 py-3 text-[14px] text-white placeholder-[#444] outline-none focus:border-[#e63946]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[2px] text-[#555] mb-2">
                  Sobrenome
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Silva"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#161616] border border-[#222] rounded-md px-4 py-3 text-[14px] text-white placeholder-[#444] outline-none focus:border-[#e63946]"
                />
              </div>

            </div>

            {/* Username */}
            <div>
              <label className="block text-[11px] uppercase tracking-[2px] text-[#555] mb-2">
                Usuário
              </label>

              <input
                type="text"
                name="username"
                placeholder="joao_silva"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full bg-[#161616] border border-[#222] rounded-md px-4 py-3 text-[14px] text-white placeholder-[#444] outline-none focus:border-[#e63946]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] uppercase tracking-[2px] text-[#555] mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="joao@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-[#161616] border border-[#222] rounded-md px-4 py-3 text-[14px] text-white placeholder-[#444] outline-none focus:border-[#e63946]"
              />
            </div>

            {/* Senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <div>
                <label className="block text-[11px] uppercase tracking-[2px] text-[#555] mb-2">
                  Senha
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#161616] border border-[#222] rounded-md px-4 py-3 text-[14px] text-white placeholder-[#444] outline-none focus:border-[#e63946]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[2px] text-[#555] mb-2">
                  Confirmar
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#161616] border border-[#222] rounded-md px-4 py-3 text-[14px] text-white placeholder-[#444] outline-none focus:border-[#e63946]"
                />
              </div>

            </div>

            {error && (
              <p className="text-[13px] text-[#e63946]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e63946] hover:bg-[#c62b38] active:scale-[0.98] text-white text-[13px] font-medium tracking-[2px] uppercase rounded-md py-3 transition-all disabled:opacity-60"
            >
              {loading ? "Criando..." : "Criar conta"}
            </button>

          </form>

          <p className="text-[12px] text-[#444] mt-5 text-center md:text-left">
            Já tem conta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#e63946] cursor-pointer hover:underline"
            >
              Entrar
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}