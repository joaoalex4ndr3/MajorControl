// components/Header.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface HeaderProps {
  onVerConta?: () => void;
}

const Header = ({ onVerConta }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para controlar visibilidade do header
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Define a direção do scroll
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Rolar para baixo (esconder)
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Rolar para cima (mostrar)
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Classe base para os botões com animações refinadas (estilo claro)
  const buttonBaseClass = `
    relative overflow-hidden
    rounded-md border border-foreground/30
    px-3 py-1.5 text-xs font-medium
    text-foreground
    transition-all duration-300 ease-out
    hover:border-foreground hover:shadow-md
    focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background
    active:scale-95
    sm:px-4 sm:py-2 sm:text-sm
    before:absolute before:inset-0 before:z-0
    before:bg-foreground/10 before:scale-x-0 before:origin-left
    before:transition-transform before:duration-300 before:ease-out
    hover:before:scale-x-100
  `.trim().replace(/\s+/g, ' ');

  return (
    <header
      className={`
        sticky top-0 z-50 w-full h-14 sm:h-16 bg-background/95 backdrop-blur-sm border-b border-foreground/10 shadow-sm
        transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="relative flex items-center justify-between h-full px-6 sm:px-8 lg:px-12">
        {/* LOGO (esquerda) - versão preta */}
        <div className="flex justify-start h-full">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center h-full transition-transform hover:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background rounded-md"
            aria-label="Ir para a página inicial"
          >
            <img
              src="/pngPreta.png"
              alt="Major Control"
              className="h-full max-h-10 sm:max-h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </button>
        </div>

        {/* TÍTULO (centralizado absoluto) */}
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold tracking-tight text-foreground/90 whitespace-nowrap sm:text-base md:text-lg lg:text-xl">
          Controle de Estoque
        </h1>

        {/* AÇÕES (direita) - apenas botão "Ver Conta" */}
        <div className="flex justify-end gap-2 sm:gap-3">
          <button onClick={() => onVerConta?.()} className={buttonBaseClass}>
            <span className="relative z-10">Ver Conta</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;