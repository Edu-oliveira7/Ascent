import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Componente para revelar elementos ao scroll
const Reveal = ({ children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Componente de partículas para efeito de iluminação
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#ff301d] rounded-full animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            opacity: 0.1 + Math.random() * 0.2
          }}
        />
      ))}
    </div>
  );
};

const MainLayout = () => (
  <>
    <Header />
    <main>
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-20 pt-20 overflow-hidden" id="sobre">
        <Particles />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(255,48,29,0.06)_0%,transparent_50%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_80%)] pointer-events-none" />
        <div className="relative z-20 mx-auto text-center animate-fadeIn w-full max-w-[900px]">
          <Reveal>
            <h1 className="font-['Bebas_Neue'] text-[clamp(3.5rem,8vw,6.5rem)] leading-[1.05] mb-6 tracking-wide text-white drop-shadow-xl">
              Rompa os seus limites com a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1a10] via-[#ff301d] to-[#8b1a10] bg-[length:200%_auto] animate-gradient-text inline-block pb-2">
                Ascent Evolution
              </span>
            </h1>
            <p className="text-[#a0a0a0] text-lg md:text-[1.15rem] leading-relaxed max-w-2xl mx-auto mb-10 font-light">
              Criamos um sistema para ajudar na sua jornada de disciplina.
              Um mapeamento completo da sua performance física com sugestões baseadas em
              <span className="text-white font-medium"> dados e evidências</span>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── O PROBLEMA ── */}
      <section id="problema" className="py-32 px-8 md:px-20 bg-[#0f0f0f] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <h2 className="font-['Bebas_Neue'] text-[clamp(3.5rem,6vw,5.5rem)] mb-6 leading-[1.05]">
              O Custo da <br />
              <span className="text-[#555]">Inconsistência</span>
            </h2>
            <p className="text-[#888] font-light text-[1.1rem] mb-10 leading-relaxed max-w-md">
              A maioria das pessoas falha não por falta de força, mas por falta de <span className="text-white font-medium">rastreabilidade</span>. O que não é medido, não pode ser superado.
            </p>
            <div className="space-y-5">
              {[
                { label: "Platôs de carga por falta de histórico", icon: "⊘" },
                { label: "Over-training por má gestão de fadiga", icon: "⊘" },
                { label: "Abandono por falta de percepção de progresso", icon: "⊘" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <span className="text-[#ff301d] text-lg font-bold">{item.icon}</span>
                  <span className="text-[#999] group-hover:text-white transition-colors font-['Barlow'] font-medium text-[0.95rem]">{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative p-10 bg-[#141414] border border-white/5 rounded-2xl border-l-4 border-l-[#ff301d] shadow-2xl">
              <p className="font-['Barlow'] text-2xl font-light italic leading-snug text-white/90">
                "O Ascent não é apenas um software. É o sistema operacional da sua melhor versão."
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-8 h-[2px] bg-[#ff301d]" />
                <span className="text-[0.75rem] tracking-[0.3em] uppercase text-[#ff301d] font-bold">Concept Vision</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── A PLATAFORMA ── */}
      <section id="features" className="py-32 px-8 md:px-20 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
        <div className="max-w-[1280px] mx-auto relative z-10">
          <Reveal>
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-xl">
                <span className="font-['Barlow'] text-[#ff301d] tracking-[0.2em] font-semibold uppercase text-sm">Módulos Funcionais</span>
                <h2 className="font-['Bebas_Neue'] text-[clamp(3.5rem,7vw,5.5rem)] mt-2 leading-none text-white">O Motor.</h2>
              </div>
              <div className="text-[#666] font-['Barlow'] text-[0.95rem] md:text-right leading-relaxed max-w-xs">
                Engenharia focada em resultado real e escalabilidade de performance.
              </div>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "Cargas Inteligentes", d: "Algoritmo que sugere progressões baseadas no seu volume histórico." },
              { t: "Biometria Integrada", d: "Sincronização de dados corporais para análise de composição." },
              { t: "Readiness Score", d: "Cálculo de prontidão baseado no sono e esforço acumulado." },
              { t: "Dashboard PRO", d: "Métricas detalhadas e escalabilidade para gestão de performance." }
            ].map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/5 rounded-xl p-8 hover:bg-[#161616] hover:border-white/10 transition-all group relative overflow-hidden">
                <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg group-hover:bg-[#ff301d]/10 flex items-center justify-center mb-6 transition-colors duration-300">
                  <span className="text-[#ff301d] font-bold">0{i + 1}</span>
                </div>
                <h3 className="font-['Barlow'] font-bold text-xl mb-3 text-white/90">{f.t}</h3>
                <p className="text-[#777] text-[0.95rem] font-light leading-relaxed group-hover:text-[#aaa] transition-colors">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PÚBLICO & FILOSOFIA ── */}
      <section id="resultados" className="relative py-40 px-8 md:px-20 bg-[#050505] overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="max-w-[1280px] mx-auto relative z-10 grid lg:grid-cols-2 gap-24 items-start">
          <Reveal>
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="font-['Bebas_Neue'] text-[clamp(3.5rem,7vw,6rem)] leading-[0.95] text-white">
                  Nascido Para <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1a10] via-[#ff301d] to-[#ff301d] bg-[length:200%_auto] animate-gradient-text">
                    Vencer a Inércia.
                  </span>
                </h2>
                <div className="h-1 w-20 bg-[#ff301d]" />
              </div>
              <div className="space-y-8">
                <p className="text-[#a0a0a0] text-lg md:text-[1.25rem] leading-relaxed max-w-md font-light italic border-l border-white/10 pl-6">
                  "A estagnação é o inimigo silencioso do progresso. O Ascent foi forjado para quem não aceita o 'bom o suficiente' e busca o controle absoluto sobre cada variável."
                </p>
                <div className="space-y-4">
                  <h4 className="text-white font-['Barlow'] font-bold uppercase text-xs tracking-[0.3em]">Filosofia Ascent</h4>
                  <p className="text-[#666] text-[1rem] leading-relaxed max-w-md">
                    Acreditamos que o corpo humano é a máquina mais complexa do mundo. Para otimizá-la, você precisa de mais do que motivação — você precisa de dados claros e evidências sólidas.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="space-y-16 lg:mt-6">
            <Reveal delay={200}>
              <div className="space-y-4 group">
                <h3 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide group-hover:text-[#ff301d] transition-colors">
                  Domínio da <span className="text-[#ff301d]">Variabilidade</span>
                </h3>
                <p className="text-[#888] font-light text-lg leading-relaxed border-b border-white/5 pb-8 group-hover:text-[#aaa] transition-colors">
                  Entenda como o sono, o estresse e a nutrição impactam sua carga de trabalho. O Ascent correlaciona suas métricas de vida com seu rendimento para evitar o overtraining.
                </p>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="space-y-4 group">
                <h3 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide group-hover:text-[#ff301d] transition-colors">
                  Progressão <span className="text-[#ff301d]">Matemática</span>
                </h3>
                <p className="text-[#888] font-light text-lg leading-relaxed border-b border-white/5 pb-8 group-hover:text-[#aaa] transition-colors">
                  Elimine o "achismo". Utilizamos modelos de volume total e intensidade relativa para garantir que cada série executada aproxime você do seu potencial máximo.
                </p>
              </div>
            </Reveal>
            <Reveal delay={600}>
              <div className="space-y-4 group">
                <h3 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide group-hover:text-[#ff301d] transition-colors">
                  Legado de <span className="text-[#ff301d]">Performance</span>
                </h3>
                <p className="text-[#888] font-light text-lg leading-relaxed group-hover:text-[#aaa] transition-colors">
                  Sua jornada merece ser documentada com rigor. Construa um histórico vitalício de força, transformando suor em uma base de dados valiosa para sua saúde.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 text-center px-8 relative overflow-hidden bg-[#0a0a0a] border-t border-white/5">
        <div className="absolute inset-0 font-['Bebas_Neue'] text-[25vw] flex items-center justify-center whitespace-nowrap select-none pointer-events-none text-white/[0.015]">
          LIMITLESS
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(255,48,29,0.05)_0%,transparent_60%)] animate-pulse-slow pointer-events-none" />
        <Reveal>
          <h2 className="font-['Bebas_Neue'] text-[clamp(4rem,9vw,6.5rem)] leading-none mb-10 text-white">
            Ascenda <span className="text-[#ff301d]">Agora.</span>
          </h2>
        </Reveal>
      </section>
    </main>
    <Footer />
  </>
);

export default function App() {
  return (
    <Router>
      <div className="bg-[#0a0a0a] text-[#f5f5f0] font-['Barlow'] selection:bg-[#ff301d] selection:text-white min-h-screen overflow-x-hidden">
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}