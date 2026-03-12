const FOOTER_LINKS = {
  Produto: [
    { label: "Como funciona", href: "#features" },
    { label: "Resultados", href: "#resultados" },
    { label: "Sobre", href: "#sobre" },
  ],
  Suporte: [
    { label: "FAQ", href: "#" },
    { label: "Contato", href: "#" },
    { label: "Política de Privacidade", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        /* ── FOOTER ── */
        .footer {
          background: var(--dark2);
          border-top: 1px solid var(--iron);
        }

        /* Top — grid principal */
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 64px;
          padding: 72px 48px 56px;
        }

        /* Coluna da marca */
        .footer-brand {}
        .footer-logo {
          font-family: var(--font-display);
          font-size: 2.2rem; letter-spacing: 0.06em;
          color: var(--white); text-decoration: none;
          display: inline-block; margin-bottom: 16px;
        }
        .footer-logo .logo-accent { color: var(--fire); }
        .footer-tagline {
          font-size: 0.88rem; line-height: 1.75;
          color: var(--ash); font-weight: 300;
          max-width: 300px; margin-bottom: 28px;
        }
        .footer-social {
          display: flex; gap: 12px;
        }
        .social-btn {
          width: 38px; height: 38px;
          border: 1px solid var(--iron);
          background: none;
          display: flex; align-items: center; justify-content: center;
          color: var(--ash);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          cursor: none;
          text-decoration: none;
        }
        .social-btn:hover {
          border-color: var(--fire);
          color: var(--fire);
          background: rgba(232,82,26,0.06);
        }

        /* Colunas de links */
        .footer-col-title {
          font-family: var(--font-condensed);
          font-size: 0.7rem; letter-spacing: 0.35em;
          text-transform: uppercase; color: var(--fire);
          margin-bottom: 20px;
        }
        .footer-col ul {
          list-style: none; display: flex; flex-direction: column; gap: 12px;
        }
        .footer-col ul li a {
          font-size: 0.88rem; color: var(--ash);
          text-decoration: none; cursor: none;
          transition: color 0.2s;
          display: inline-block;
        }
        .footer-col ul li a:hover { color: var(--white); }

        /* Divisor */
        .footer-divider {
          border: none; height: 1px;
          background: var(--iron);
          margin: 0 48px;
        }

        /* Bottom bar */
        .footer-bottom {
          padding: 20px 48px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
        }
        .footer-copy {
          font-family: var(--font-condensed);
          font-size: 0.7rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--steel);
        }
        .footer-badge {
          font-family: var(--font-condensed);
          font-size: 0.65rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--steel);
          display: flex; align-items: center; gap: 6px;
        }
        .footer-badge::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--fire);
          display: inline-block;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 40px; padding: 56px 24px 40px;
          }
          .footer-divider { margin: 0 24px; }
          .footer-bottom {
            flex-direction: column; text-align: center;
            padding: 20px 24px; gap: 8px;
          }
        }
      `}</style>

      <footer className="footer">
        {/* Topo */}
        <div className="footer-top">

          {/* Marca */}
          <div className="footer-brand">
            <a href="#inicio" className="footer-logo" onClick={(e) => { e.preventDefault(); scrollTo("#inicio"); }}>
              ASC<span className="logo-accent">E</span>NT
            </a>
            <p className="footer-tagline">
              Sistema operacional de performance física.
              Construa disciplina, registre evolução e ascenda ao seu potencial máximo.
            </p>
            <div className="footer-social">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a key={label} href={href} className="social-btn" aria-label={label} title={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div className="footer-col" key={title}>
              <div className="footer-col-title">{title}</div>
              <ul>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="footer-divider text" />

        {/* Rodapé inferior */}
        <div className="footer-bottom w-full py-8 border-t border-white/5 flex flex-col items-center justify-center">
          <span className="footer-copy font-['Barlow'] text-[0.7rem] tracking-[0.3em] uppercase text-[#555] hover:text-[#888] transition-colors">
            © {year} Ascent · Todos os direitos reservados
          </span>
        </div>
      </footer>
    </>
  );
}