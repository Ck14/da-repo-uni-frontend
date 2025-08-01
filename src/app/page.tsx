"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BanknotesIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

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
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/query/estadisticas/top5-programas-menor-ejecucion`)
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

  const handleCardClick = (url: string) => {
    setNavigating(true);
    router.push(url);
  };

  return (
    <>
      <header className="w-full max-w-2xl flex flex-col items-center gap-2 mb-8">
        <h1 className="relative text-3xl sm:text-4xl font-extrabold font-sans text-[var(--paper)] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] mb-2 tracking-tight">
          Municipalidad de Chimaltenango

        </h1>
        <p className="text-2xl sm:text-2xl text-[var(--paper)] text-center font-semibold">Información Presupuestaria</p>
        <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-[var(--paper)]"></span>
        <p className="text-base sm:text-lg text-[var(--paper)] text-center font-normal mt-1">Top 5 de programas con mayor presupuesto vigente y menor porcentaje de ejecución</p>
      </header>
      <main className="w-full max-w-4xl bg-[var(--secondary)] rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-6">
        {loading || navigating ? (
          <div className="flex flex-col justify-center items-center min-h-[120px] gap-2">
            <svg className="animate-spin h-10 w-10 text-[var(--accent)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span className="text-[var(--paper)] text-base font-medium mt-2">Consultando datos...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <ol className="space-y-4">
            {programas
              .slice()
              .sort((a, b) => {
                return a.porcentajeEjecucion - b.porcentajeEjecucion;
              })
              .map((p, idx) => (
                <li
                  key={p.codigoPrograma}
                  className="flex flex-col gap-2 bg-[var(--paper)] rounded-lg p-6 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer border-2 border-transparent hover:border-[var(--highlight)]"
                  onClick={() => handleCardClick(`/programas/${p.codigoPrograma}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(`/programas/${p.codigoPrograma}`); }}
                >
                  {/* Encabezado */}
                  <div className="flex flex-col items-start mb-2">
                    <span className="font-bold text-xl text-[var(--primary)] leading-tight">{idx + 1}. {p.programa}</span>
                    <span className="text-xs text-[var(--secondary)]">Código: {p.codigoPrograma}</span>
                  </div>
                  {/* Montos */}
                  <div className="flex flex-row justify-center items-end gap-4 sm:gap-8 mb-4">
                    <div className="flex flex-col items-center">
                      <BanknotesIcon className="inline-block w-5 h-5 text-[var(--accent)] mr-1 align-text-bottom" />
                      <span className="text-xs text-[var(--secondary)]">Presupuesto vigente</span>
                      <span className="text-lg sm:text-2xl font-extrabold text-[var(--accent)] break-words">Q{p.vigente.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ArrowDownTrayIcon className="inline-block w-5 h-5 text-[var(--highlight)] mr-1 align-text-bottom" />
                      <span className="text-xs text-[var(--secondary)]">Ejecutado</span>
                      <span className="text-lg sm:text-2xl font-extrabold text-[var(--highlight)] break-words">Q{p.devengado.toLocaleString()}</span>
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
        {loading || navigating ? null : (
          <button
            className="mt-4 w-full sm:w-auto px-6 py-3 bg-[var(--accent)] hover:bg-[var(--highlight)] text-[var(--paper)] font-semibold rounded-lg shadow transition-colors text-lg cursor-pointer"
            onClick={() => router.push('/programas')}
          >
            ¡Vamos a investigar más!
          </button>
        )}
      </main>
      
      {/* Leyenda sobre fiscalización ciudadana */}
      <div className="w-full max-w-4xl mt-8 text-center">
        <div className="bg-[var(--paper)]/10 backdrop-blur-sm rounded-lg p-6 border border-[var(--paper)]/20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <svg className="w-6 h-6 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-bold text-[var(--paper)]">Fiscalización Ciudadana</h3>
          </div>
          <p className="text-[var(--paper)] text-lg leading-relaxed">
            "El pueblo debe mantener los ojos abiertos para fiscalizar el uso de los recursos públicos. 
            <br className="hidden sm:block" />
            La transparencia es el pilar de la democracia y la participación ciudadana es nuestro derecho y deber."
          </p>
        </div>
      </div>
    </>
  );
}
