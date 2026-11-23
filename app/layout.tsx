import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Controle de Gastos",
  description: "Acompanhe seus gastos e orçamentos por categoria.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col">
        {children}
        <ToastContainer position="bottom-center" theme="dark" />
      </body>
    </html>
  );
}