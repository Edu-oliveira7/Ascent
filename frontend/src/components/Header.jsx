import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "O Desafio", href: "#problema" },
  { label: "Solução", href: "#como-funciona" },
  { label: "Filosofia", href: "#resultados" },
];
const HIDDEN_HEADER_ROUTES = ["/login", "/register"];
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

  const auth = useContext(AuthContext);

  if (HIDDEN_HEADER_ROUTES.includes(location.pathname)) return null;

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
              {auth && auth.token ? (
                [
                  { label: 'Dashboard', to: '/dashboard' },
                  { label: 'Workouts', to: '/workouts' },
                  { label: 'Evolução', to: '/evolution' },
                  { label: 'Histórico', to: '/history' },
                  { label: 'Meus Treinos', to: '/meus-treinos' },
                ].map(({ label, to }) => (
                  <button
                    key={to}
                    onClick={() => navigate(to)}
                    className="font-['Barlow'] text-[0.75rem] tracking-[0.15em] uppercase px-5 py-2 rounded-full transition-all duration-300 no-underline text-[#888] hover:text-white hover:bg-white/5"
                  >
                    {label}
                  </button>
                ))
              ) : (
                NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    className="font-['Barlow'] text-[0.75rem] tracking-[0.15em] uppercase px-5 py-2 rounded-full transition-all duration-300 no-underline text-[#888] hover:text-white hover:bg-white/5"
                  >
                    {label}
                  </a>
                ))
              )}
            </div>
          </nav>

          <div className="flex items-center gap-6">

            {/* Auth actions */}
            {auth && auth.token ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="text-sm text-white/80">{auth.user?.username || 'Usuário'}</div>
                <button onClick={() => { auth.logout(); navigate('/login'); }} className="font-['Barlow'] text-[0.7rem] font-bold tracking-[0.2em] uppercase text-white border border-white/20 px-4 py-2 hover:border-[#ff301d] hover:bg-[#ff301d]/10 transition-all duration-300">Sair</button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block font-['Barlow'] text-[0.7rem] font-bold tracking-[0.2em] uppercase text-white border border-white/20 px-6 py-2.5 hover:border-[#ff301d] hover:bg-[#ff301d]/10 transition-all duration-300"
              >
                Acessar
              </button>
            )}

            {/* Mobile */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label="Abrir menu"
            >
              <span className={`w-6 h-[1px] bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`w-6 h-[1px] bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-[1px] bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[850] bg-black/40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Compact Panel */}
      <div
        className={`fixed top-0 right-0 z-[900] h-full max-w-[85vw] w-full sm:max-w-[26rem] bg-[#070707ee] backdrop-blur-sm border-l border-white/5 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="text-white font-semibold">Menu</div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white/60 hover:text-white"
            aria-label="Fechar menu"
          >
            Fechar
          </button>
        </div>

        <div className="p-4 space-y-3">
          {auth && auth.token ? (
            [
              { label: 'Dashboard', to: '/dashboard' },
              { label: 'Workouts', to: '/workouts' },
              { label: 'Evolução', to: '/evolution' },
              { label: 'Histórico', to: '/history' },
              { label: 'Meus Treinos', to: '/meus-treinos' },
            ].map(({ label, to }) => (
              <button
                key={to}
                onClick={() => {
                  setMenuOpen(false);
                  navigate(to);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/5 transition-colors"
              >
                {label}
              </button>
            ))
          ) : (
            NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  setMenuOpen(false);
                  scrollTo(e, href);
                }}
                className="block px-3 py-2 rounded-md text-white/90 hover:bg-white/5"
              >
                {label}
              </a>
            ))
          )}

          {!auth?.token && (
            <button onClick={() => { setMenuOpen(false); navigate('/login'); }} className="w-full mt-4 bg-[#ff301d] text-white px-3 py-2 rounded-md">Acessar</button>
          )}

          {auth?.token && (
            <div className="mt-4 border-t border-white/5 pt-3">
              <div className="text-sm text-white/80 mb-2">{auth.user?.username || 'Usuário'}</div>
              <button onClick={() => { auth.logout(); setMenuOpen(false); navigate('/login'); }} className="w-full text-left px-3 py-2 rounded-md text-white/90 hover:bg-white/5">Sair</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}