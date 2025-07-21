"use client";

import Image from "next/image";
import { useState } from "react";

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
  // Ordenar por mayor presupuesto y menor ejecución
  const top5 = [...programas]
    .sort((a, b) => {
      if (b.presupuesto !== a.presupuesto) {
        return b.presupuesto - a.presupuesto;
      }
      return calcularPorcentajeEjecutado(a) - calcularPorcentajeEjecutado(b);
    })
    .slice(0, 5);

  const [showSelector, setShowSelector] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--primary)] flex flex-col items-center justify-center p-4 sm:p-8">
      <header className="w-full max-w-2xl flex flex-col items-center gap-2 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--highlight)] text-center drop-shadow">Estadísticas de Gastos Municipales</h1>
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
          className="mt-4 w-full sm:w-auto px-6 py-3 bg-[var(--accent)] hover:bg-[var(--highlight)] text-[var(--paper)] font-semibold rounded-lg shadow transition-colors text-lg"
          onClick={() => setShowSelector(true)}
        >
          Elegir programa
        </button>
        {showSelector && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[var(--paper)] rounded-xl p-8 shadow-xl w-full max-w-md flex flex-col gap-4">
              <h2 className="text-xl font-bold mb-2 text-[var(--primary)]">Selecciona un programa</h2>
              <ul className="space-y-2">
                {programas.map((p) => (
                  <li key={p.id}>
                    <button
                      className="w-full text-left px-4 py-2 rounded hover:bg-[var(--highlight)]/20 transition-colors font-medium text-[var(--primary)]"
                      // TODO: Navegar a la página del programa
                      onClick={() => alert(`Ir a programa: ${p.nombre}`)}
                    >
                      {p.nombre}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 px-4 py-2 bg-[var(--highlight)] text-[var(--primary)] rounded hover:bg-[var(--accent)] hover:text-[var(--paper)] transition-colors"
                onClick={() => setShowSelector(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="mt-10 text-center text-[var(--paper)] text-sm opacity-80">
        Municipalidad Demo &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
