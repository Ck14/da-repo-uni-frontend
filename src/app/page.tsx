"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Datos simulados de ejemplo
const programas = [
  {
    id: 1,
    nombre: "Salud Pública",
    presupuesto: 1200000,
    ejecutado: 400000,
  },
  {
    id: 2,
    nombre: "Educación Básica",
    presupuesto: 950000,
    ejecutado: 300000,
  },
  {
    id: 3,
    nombre: "Infraestructura Vial",
    presupuesto: 2000000,
    ejecutado: 900000,
  },
  {
    id: 4,
    nombre: "Desarrollo Social",
    presupuesto: 800000,
    ejecutado: 200000,
  },
  {
    id: 5,
    nombre: "Seguridad Ciudadana",
    presupuesto: 1100000,
    ejecutado: 350000,
  },
  {
    id: 6,
    nombre: "Cultura y Deporte",
    presupuesto: 600000,
    ejecutado: 250000,
  },
];

function calcularPorcentajeEjecutado(p: { presupuesto: number; ejecutado: number }) {
  return (p.ejecutado / p.presupuesto) * 100;
}

export default function Home() {
  const router = useRouter();
  // Ordenar por mayor presupuesto y menor ejecución
  const top5 = [...programas]
    .sort((a, b) => {
      if (b.presupuesto !== a.presupuesto) {
        return b.presupuesto - a.presupuesto;
      }
      return calcularPorcentajeEjecutado(a) - calcularPorcentajeEjecutado(b);
    })
    .slice(0, 5);

  return (
    <>
      <header className="w-full max-w-2xl flex flex-col items-center gap-2 mb-8">
        <h1 className="relative text-4xl sm:text-5xl font-extrabold font-sans text-[var(--highlight)] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] mb-2 tracking-tight">
          Estadísticas de Gastos Municipales
          <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-[var(--highlight)]"></span>
        </h1>
        <p className="text-lg text-[var(--paper)] text-center">Top 5 programas con mayor presupuesto vigente y menor porcentaje de ejecución</p>
      </header>
      <main className="w-full max-w-2xl bg-[var(--secondary)] rounded-xl shadow-lg p-6 flex flex-col gap-6">
        <ol className="space-y-4">
          {top5.map((p, idx) => (
            <li key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-[var(--paper)] rounded-lg p-4 shadow-sm hover:scale-[1.01] transition-transform">
              <div className="flex-1">
                <span className="font-semibold text-[var(--primary)] text-lg">{idx + 1}. {p.nombre}</span>
                <div className="text-sm text-[var(--secondary)] mt-1">Presupuesto: Q{p.presupuesto.toLocaleString()}</div>
                <div className="text-sm text-[var(--secondary)]">Ejecutado: Q{p.ejecutado.toLocaleString()} ({calcularPorcentajeEjecutado(p).toFixed(1)}%)</div>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-6 w-full sm:w-40">
                <div className="w-full bg-[var(--highlight)]/30 rounded-full h-3">
                  <div
                    className="bg-[var(--accent)] h-3 rounded-full transition-all"
                    style={{ width: `${calcularPorcentajeEjecutado(p)}%` }}
                  ></div>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <button
          className="mt-4 w-full sm:w-auto px-6 py-3 bg-[var(--accent)] hover:bg-[var(--highlight)] text-[var(--paper)] font-semibold rounded-lg shadow transition-colors text-lg cursor-pointer"
          onClick={() => router.push('/programas')}
        >
          ¡Vamos a investigar más!
        </button>
      </main>
    </>
  );
}
