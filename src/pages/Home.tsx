// pages/Home.tsx
import { useState, useRef } from "react";
import Header from "@/components/Header";

const mockUser = {
  email: "usuario@exemplo.com",
  senha: "123456",
};

const Home = () => {
  const [showAccountCard, setShowAccountCard] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-enter flex min-h-screen flex-col">
      <Header onVerConta={() => setShowAccountCard(true)} />

      <main className="flex flex-1 items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          Sistema pronto para expansão.
        </p>
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

            <div className="mb-6 flex flex-col items-center">
              <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                {foto ? (
                  <img src={foto} alt="Perfil" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-black">
                    {/* Ícone de câmera em preto e branco (SVG) */}
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="6" width="20" height="14" rx="2" />
                      <circle cx="12" cy="13" r="4" />
                      <line x1="18" y1="8" x2="18.01" y2="8" />
                    </svg>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFotoChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
              >
                Adicionar foto
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500">Email</label>
                <p className="mt-1 rounded bg-gray-50 p-2 text-sm font-mono">{mockUser.email}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500">Senha</label>
                <p className="mt-1 rounded bg-gray-50 p-2 text-sm font-mono">{mockUser.senha}</p>
              </div>
            </div>

            <button
              onClick={() => setShowAccountCard(false)}
              className="mt-6 w-full rounded-md bg-black py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black hover:border-black border border-transparent"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;