// pages/Home.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import TabelaEstoque from "@/components/TabelaEstoque";
import { supabase } from "@/lib/supabase";

<<<<<<< HEAD
const Home = () => {
  const navigate = useNavigate();
  const [showAccountCard, setShowAccountCard] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
=======
const mockUser = {
  email: "usuario@exemplo.com",
  senha: "123456",
};


const Home = () => {
  const [showAccountCard, setShowAccountCard ] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
>>>>>>> 4acd4359b8eef03c2eb5d02acf432be3642d8dc6

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erro ao buscar usuário:", error);
        setUserEmail("Erro ao carregar");
      } else if (user?.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail("Usuário não encontrado");
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleForgotPassword = async () => {
    if (!userEmail || userEmail === "Erro ao carregar") return;
    const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      alert("Erro ao enviar e-mail de redefinição: " + error.message);
    } else {
      alert("E-mail de redefinição de senha enviado! Verifique sua caixa de entrada.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="page-enter flex min-h-screen flex-col">
      <Header onVerConta={() => setShowAccountCard(true)} />

      <main className="flex flex-1 flex-col px-4 py-4">
        <TabelaEstoque />
      </main>

      {showAccountCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAccountCard(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Minha conta</h2>
              <button
                onClick={() => setShowAccountCard(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500">Email</label>
                <p className="mt-1 rounded bg-gray-50 p-2 text-sm font-mono">
                  {loading ? "Carregando..." : userEmail}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500">Senha</label>
                <div className="mt-1 flex items-center justify-between rounded bg-gray-50 p-2">
                  <span className="text-sm font-mono">••••••••</span>
                  <button
                    onClick={handleForgotPassword}
                    className="text-sm font-medium text-black transition-colors hover:text-gray-600 focus:outline-none"
                  >
                    Alterar
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Clique em "Alterar" para redefinir sua senha via e‑mail.
                </p>
              </div>
            </div>

            {/* Ambos os botões brancos com borda preta e hover preto */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setShowAccountCard(false)}
                className="w-full rounded-md border border-black bg-white py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                Fechar
              </button>
              <button
                onClick={handleLogout}
                className="w-full rounded-md border border-black bg-white py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                Sair da conta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;