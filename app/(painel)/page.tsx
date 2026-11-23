import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-8">
      <Link href="/categorias" className="rounded-xl border-2 border-gray-400 p-6 hover:bg-cyan-900">
        <h2 className="text-xl font-bold">Categorias</h2>
        <p className="text-gray-400">Organize seus gastos por tipo.</p>
      </Link>
      <Link href="/gastos" className="rounded-xl border-2 border-gray-400 p-6 hover:bg-cyan-900">
        <h2 className="text-xl font-bold">Gastos</h2>
        <p className="text-gray-400">Registre o que você gastou.</p>
      </Link>
      <Link href="/orcamentos" className="rounded-xl border-2 border-gray-400 p-6 hover:bg-cyan-900">
        <h2 className="text-xl font-bold">Orçamentos</h2>
        <p className="text-gray-400">Defina limites mensais.</p>
      </Link>
    </div>
  );
}