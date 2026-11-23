import type { ReactNode } from "react";
import Link from "next/link";
import { sair } from "../auth-actions";



export const dynamic = "force-dynamic";
export default function PainelLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex flex-col gap-4 bg-pink-600 p-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-2xl font-bold">
          Controle de Gastos
        </Link>
        <nav className="flex flex-wrap items-center gap-3 font-bold">
          <Link href="/categorias" className="rounded-xl bg-green-800 px-4 py-2 hover:bg-yellow-800">
            Categorias
          </Link>
          <Link href="/gastos" className="rounded-xl bg-green-800 px-4 py-2 hover:bg-yellow-800">
            Gastos
          </Link>
          <Link href="/orcamentos" className="rounded-xl bg-green-800 px-4 py-2 hover:bg-yellow-800">
            Orçamentos
          </Link>
          <form action={sair}>
            <button className="rounded-xl bg-red-700 px-4 py-2 hover:bg-red-900">Sair</button>
          </form>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}