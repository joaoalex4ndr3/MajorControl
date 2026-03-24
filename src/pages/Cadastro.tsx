import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "@/components/FormInput";
import FormButton from "@/components/FormButton";
import { supabase } from "@/lib/supabase";

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confirmarSenhaError, setConfirmarSenhaError] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!nome.trim()) {
      setNomeError("Nome é obrigatório");
      isValid = false;
    } else if (nome.trim().length < 3) {
      setNomeError("Nome deve ter no mínimo 3 caracteres");
      isValid = false;
    } else {
      setNomeError("");
    }

    if (!email.trim()) {
      setEmailError("Email é obrigatório");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Digite um email válido");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!senha.trim()) {
      setSenhaError("Senha é obrigatória");
      isValid = false;
    } else if (senha.length < 6) {
      setSenhaError("A senha deve ter no mínimo 6 caracteres");
      isValid = false;
    } else {
      setSenhaError("");
    }

    if (!confirmarSenha.trim()) {
      setConfirmarSenhaError("Confirme sua senha");
      isValid = false;
    } else if (senha !== confirmarSenha) {
      setConfirmarSenhaError("As senhas não coincidem");
      isValid = false;
    } else {
      setConfirmarSenhaError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroGeral("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome,
          },
        },
      });

      if (error) {
        setErroGeral(error.message);
        return;
      }

      navigate("/");
    } catch {
      setErroGeral("Erro inesperado ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mb-6 w-full sm:mb-8">
        <img
          src="/MajorControl.png"
          alt="Major Control Logo"
          className="mx-auto h-28 w-auto object-contain sm:h-32 md:h-36 lg:h-40"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-border bg-background p-5 shadow-lg sm:max-w-md sm:p-6 md:max-w-lg md:p-8 -mt-8 sm:-mt-10"
      >
        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Criar Conta
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Preencha os dados para se cadastrar
          </p>
        </div>

        {erroGeral && (
          <p className="text-sm text-center text-red-500">{erroGeral}</p>
        )}

        <div>
          <FormInput
            id="nome"
            label="Nome"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              if (nomeError) setNomeError("");
            }}
          />
          {nomeError && <p className="mt-1 text-xs text-red-500">{nomeError}</p>}
        </div>

        <div>
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
          />
          {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
        </div>

        <div>
          <FormInput
            id="senha"
            label="Senha"
            type="password"
            placeholder="Crie uma senha (mínimo 6 caracteres)"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              if (senhaError) setSenhaError("");
            }}
          />
          {senhaError && <p className="mt-1 text-xs text-red-500">{senhaError}</p>}
        </div>

        <div>
          <FormInput
            id="confirmarSenha"
            label="Confirmar Senha"
            type="password"
            placeholder="Repita a senha"
            value={confirmarSenha}
            onChange={(e) => {
              setConfirmarSenha(e.target.value);
              if (confirmarSenhaError) setConfirmarSenhaError("");
            }}
          />
          {confirmarSenhaError && (
            <p className="mt-1 text-xs text-red-500">{confirmarSenhaError}</p>
          )}
        </div>

        <FormButton type="submit">
          {loading ? "Cadastrando..." : "Cadastrar"}
        </FormButton>

        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          Já tem conta?{" "}
          <Link
            to="/"
            className="font-medium text-foreground underline underline-offset-2 transition-opacity duration-150 hover:opacity-70"
          >
            Fazer login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Cadastro;