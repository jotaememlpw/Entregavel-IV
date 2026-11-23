import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Categoria } from "@/lib/tipos";
import { FormularioCategoria } from "./formulario";

export default async function CategoriasPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("categorias").select("*").order("nome");
  const categorias = (data ?? []) as Categoria[];

  return (
    <div className="mx-auto max-w-xl space-y-6 p-4 md:p-8">
      <section className="rounded-xl border-2 border-gray-400 p-4">
        <FormularioCategoria />
      </section>

      <ul className="space-y-2">
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <Link
              href={`/categorias/${categoria.id}`}
              className="block rounded-lg border-2 border-gray-400 p-3 font-bold hover:bg-cyan-900"
            >
              {categoria.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}