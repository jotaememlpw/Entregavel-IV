/** Aqui vai ser implementado as funções de entrar, cadastrar e sair */
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Resultado } from "@/lib/tipos";

export async function entrar(email: string, senha: string): Promise<Resultado> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

  if (error) {
    return { sucesso: false, mensagem: "E-mail ou senha inválidos." };
  }
  return { sucesso: true, mensagem: "Login realizado!" };
}

export async function cadastrar(email: string, senha: string): Promise<Resultado> {
  if (senha.length < 6) {
    return { sucesso: false, mensagem: "A senha precisa ter pelo menos 6 caracteres." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password: senha });

  if (error) {
    return { sucesso: false, mensagem: error.message };
  }
  return { sucesso: true, mensagem: "Conta criada! Agora clique em Entrar." };
}

export async function sair() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/entrar");
}