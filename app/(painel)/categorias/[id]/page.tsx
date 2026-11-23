import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Categoria } from "@/lib/tipos";
import { FormularioCategoria } from "../formulario";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditarCategoriaPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("categorias").select("*").eq("id", Number(id)).single();

  if (!data) notFound();

  return (
    <div className="flex justify-center p-4 md:p-8">
      <div className="w-full max-w-sm rounded-xl border-2 border-gray-400 p-4">
        <FormularioCategoria categoria={data as Categoria} />
      </div>
    </div>
  );
}