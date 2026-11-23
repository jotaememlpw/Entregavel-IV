"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Resultado } from "@/lib/tipos";

function validarNome(nome: string): string | null {
  if (nome.trim().length < 2) return "O nome precisa ter pelo menos 2 caracteres.";
  if (nome.trim().length > 40) return "O nome só pode ter até 40 caracteres.";
  return null;
}

function atualizarTelas() {
  revalidatePath("/categorias");
  revalidatePath("/gastos");
  revalidatePath("/orcamentos");
}

export async function criarCategoria(nome: string): Promise<Resultado> {
  const erro = validarNome(nome);
  if (erro) return { sucesso: false, mensagem: erro };

  const supabase = await createClient();
  const { error } = await supabase.from("categorias").insert({ nome: nome.trim() });
  if (error) return { sucesso: false, mensagem: error.message };

  atualizarTelas();
  return { sucesso: true, mensagem: "Categoria criada com sucesso!" };
}

export async function editarCategoria(id: number, nome: string): Promise<Resultado> {
  const erro = validarNome(nome);
  if (erro) return { sucesso: false, mensagem: erro };

  const supabase = await createClient();
  const { error } = await supabase.from("categorias").update({ nome: nome.trim() }).eq("id", id);
  if (error) return { sucesso: false, mensagem: error.message };

  atualizarTelas();
  return { sucesso: true, mensagem: "Categoria atualizada com sucesso!" };
}

export async function deletarCategoria(id: number): Promise<Resultado> {
  const supabase = await createClient();
  const { error } = await supabase.from("categorias").delete().eq("id", id);
  if (error) return { sucesso: false, mensagem: error.message };

  atualizarTelas();
  return { sucesso: true, mensagem: "Categoria deletada com sucesso!" };
}