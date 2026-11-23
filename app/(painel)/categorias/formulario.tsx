"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { criarCategoria, editarCategoria, deletarCategoria } from "./actions";
import type { Categoria } from "@/lib/tipos";

type Props = {
  categoria?: Categoria;
};

export function FormularioCategoria({ categoria }: Props) {
  const router = useRouter();
  const [nome, setNome] = useState(categoria?.nome ?? "");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const resultado = categoria
      ? await editarCategoria(categoria.id, nome)
      : await criarCategoria(nome);

    if (resultado.sucesso) {
      toast.success(resultado.mensagem);
      if (categoria) {
        router.push("/categorias");
      } else {
        setNome("");
        router.refresh();
      }
    } else {
      toast.error(resultado.mensagem);
    }
  }

  async function onDeletar() {
    if (!categoria) return;
    const resultado = await deletarCategoria(categoria.id);
    if (resultado.sucesso) {
      toast.success(resultado.mensagem);
      router.push("/categorias");
    } else {
      toast.error(resultado.mensagem);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <h2 className="text-center text-xl font-bold">
        {categoria ? "Editar categoria" : "Nova categoria"}
      </h2>
      <input
        className="rounded-lg border-2 border-gray-400 p-2"
        placeholder="Nome da categoria"
        required
        value={nome}
        onChange={(event) => setNome(event.target.value)}
      />
      <button type="submit" className="rounded-lg border-2 border-gray-400 p-2 hover:bg-cyan-900">
        {categoria ? "Salvar" : "Adicionar"}
      </button>
      {categoria && (
        <button
          type="button"
          onClick={onDeletar}
          className="rounded-lg border-2 border-gray-400 bg-red-700 p-2 hover:bg-red-900"
        >
          Deletar
        </button>
      )}
    </form>
  );
}