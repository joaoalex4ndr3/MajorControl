// components/Header.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";



interface HeaderProps {
  onVerConta?: () => void; // opcional, para funcionar em outras páginas sem erro
}


const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);



const Header = ({ onVerConta }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate("/");
}

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* ESQUERDA */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-foreground transition-opacity duration-150 hover:opacity-70 active:scale-[0.97]"
          aria-label="Ir para a página inicial"
        >
          <HomeIcon />
          <span className="hidden text-sm font-medium sm:inline">Início</span>
        </button>

        {/* CENTRO */}
        <h1 className="text-sm font-semibold tracking-tight sm:text-base">
          Controle de Estoque
        </h1>

        {/* DIREITA */}
        <div className="flex items-center gap-2">
          {location.pathname !== "/login" && (
            <button
              onClick={handleLogout}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:bg-muted active:scale-[0.97] sm:text-sm"
            >
              Sair da conta
            </button>
          )}

          <button
            onClick={() => onVerConta?.()} // chama a função se existir
            className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:bg-muted active:scale-[0.97] sm:text-sm"
          >
            Ver Conta
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;