import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "O Desafio", href: "#problema" },
  { label: "Solução", href: "#features" },
  { label: "Filosofia", href: "#resultados" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Não renderiza nada na página de login
  if (location.pathname === "/login") return null;

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);

    if (el) {
      const offset = 80;
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 flex items-center ${
          scrolled
            ? "py-3 bg-[#080808cc] backdrop-blur-xl border-b border-white/5"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1280px] w-full mx-auto px-6 md:px-12 flex items-center justify-between relative">

          {/* Logo */}
          <a
            href="#sobre"
            onClick={(e) => scrollTo(e, "#sobre")}
            className="font-['Bebas_Neue'] text-[1.8rem] tracking-wider text-white no-underline hover:opacity-80 transition-opacity"
          >
            ASC<span className="text-[#ff301d]">E</span>NT
          </a>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.06] backdrop-blur-md">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => scrollTo(e, href)}
                  className="font-['Barlow'] text-[0.75rem] tracking-[0.15em] uppercase px-5 py-2 rounded-full transition-all duration-300 no-underline text-[#888] hover:text-white hover:bg-white/5"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-6">

            {/* BOTÃO ACESSAR → LOGIN */}
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block font-['Barlow'] text-[0.7rem] font-bold tracking-[0.2em] uppercase text-white border border-white/20 px-6 py-2.5 hover:border-[#ff301d] hover:bg-[#ff301d]/10 transition-all duration-300"
            >
              Acessar
            </button>

            {/* Mobile */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`w-6 h-[1px] bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`w-6 h-[1px] bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-[1px] bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[900] bg-[#0a0a0a] flex flex-col items-center justify-center gap-10 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => scrollTo(e, href)}
            className="font-['Bebas_Neue'] text-5xl text-white hover:text-[#ff301d] transition-colors"
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}