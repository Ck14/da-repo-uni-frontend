"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  type Programa = {
    codigoPrograma: number;
    programa: string;
    vigente: number;
    devengado: number;
    porcentajeEjecucion: number;
  };
  const [programas, setProgramas] = useState<Programa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3100/query/estadisticas/top5-programas-menor-ejecucion")
      .then((res) => res.json())
      .then((data) => {
        setProgramas(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los programas.");
        setLoading(false);
      });
  }, []);

  function calcularPorcentajeEjecucion(p: Programa) {
    return p.porcentajeEjecucion;
  }

  return (
    <>
      <header className="w-full max-w-2xl flex flex-col items-center gap-2 mb-8">
        <h1 className="relative text-4xl sm:text-5xl font-extrabold font-sans text-[var(--highlight)] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] mb-2 tracking-tight">
          Estadísticas de Gastos Municipales
          <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-[var(--highlight)]"></span>
        </h1>
        <p className="text-lg text-[var(--paper)] text-center">Top 5 programas con mayor presupuesto vigente y menor porcentaje de ejecución</p>
      </header>
      <main className="w-full max-w-4xl bg-[var(--secondary)] rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-6">
        {loading ? (
          <div className="text-center text-[var(--secondary)]">Cargando programas...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <ol className="space-y-4">
            {programas
              .slice()
              .sort((a, b) => {
                if (b.vigente !== a.vigente) {
                  return b.vigente - a.vigente;
                }
                return a.devengado - b.devengado;
              })
              .map((p, idx) => (
                <li
                  key={p.codigoPrograma}
                  className="flex flex-col gap-2 bg-[var(--paper)] rounded-lg p-6 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer border-2 border-transparent hover:border-[var(--highlight)]"
                  onClick={() => router.push(`/programas/${p.codigoPrograma}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/programas/${p.codigoPrograma}`); }}
                >
                  {/* Encabezado */}
                  <div className="flex flex-col items-start mb-2">
                    <span className="font-bold text-xl text-[var(--primary)] leading-tight">{idx + 1}. {p.programa}</span>
                    <span className="text-xs text-[var(--secondary)]">Código: {p.codigoPrograma}</span>
                  </div>
                  {/* Montos */}
                  <div className="flex flex-row justify-center items-end gap-8 mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-[var(--secondary)]">Presupuesto vigente</span>
                      <span className="text-2xl font-extrabold text-[var(--accent)]">Q{p.vigente.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-[var(--secondary)]">Ejecutado</span>
                      <span className="text-2xl font-extrabold text-[var(--highlight)]">Q{p.devengado.toLocaleString()}</span>
                    </div>
                  </div>
                  {/* Barra y porcentaje */}
                  <div className="relative w-full flex flex-col items-center mt-2">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-white border border-[var(--highlight)] text-[var(--highlight)] font-bold px-3 py-1 rounded-full shadow text-sm">
                        {calcularPorcentajeEjecucion(p).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--highlight)]/30 rounded-full h-3">
                      <div
                        className="bg-[var(--accent)] h-3 rounded-full transition-all"
                        style={{ width: `${calcularPorcentajeEjecucion(p)}%` }}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        )}
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
