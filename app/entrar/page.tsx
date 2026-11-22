"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { entrar, cadastrar } from "../auth-actions";

export default function EntrarPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function onEntrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const resultado = await entrar(email, senha);

    if (resultado.sucesso) {
      router.push("/");
      router.refresh();
    } else {
      setMensagem(resultado.mensagem);
    }
  }

  async function onCadastrar() {
    const resultado = await cadastrar(email, senha);
    setMensagem(resultado.mensagem);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={onEntrar}
        className="flex w-full max-w-sm flex-col gap-4 rounded-xl border-2 border-gray-400 p-6"
      >
        <h1 className="text-center text-xl font-bold">Entrar</h1>
        <input
          className="rounded-lg border-2 border-gray-400 p-2"
          type="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="rounded-lg border-2 border-gray-400 p-2"
          type="password"
          placeholder="Senha"
          required
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
        <button type="submit" className="rounded-lg border-2 border-gray-400 p-2 hover:bg-cyan-900">
          Entrar
        </button>
        <button
          type="button"
          onClick={onCadastrar}
          className="rounded-lg border-2 border-gray-400 p-2 hover:bg-cyan-900"
        >
          Criar conta
        </button>
        {mensagem && <p className="text-center text-sm">{mensagem}</p>}
      </form>
    </div>
  );
}