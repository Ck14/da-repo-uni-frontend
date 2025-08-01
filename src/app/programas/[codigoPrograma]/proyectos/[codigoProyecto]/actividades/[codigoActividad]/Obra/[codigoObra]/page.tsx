"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { BanknotesIcon, ArrowDownTrayIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

interface Renglon {
    codigoRenglon: number;
    renglon: string;
    codigoPrograma: number;
    programa: string;
    codigoProyecto: number;
    codigoActividad: number;
    codigoObra: number;
    asignado: number;
    modificado: number;
    vigente: number;
    devengado: number;
    pagado: number;
    obra?: string;
}

function calcularPorcentajeEjecutado(p: { vigente: number; devengado: number }) {
    return (p.devengado / p.vigente) * 100;
}

export default function RenglonesPage() {
    const router = useRouter();
    const params = useParams();
    const codigoPrograma = params.codigoPrograma;
    const codigoProyecto = params.codigoProyecto;
    const codigoActividad = params.codigoActividad;
    const codigoObra = params.codigoObra;
    const [renglones, setRenglones] = useState<Renglon[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/query/renglones?codigoPrograma=${codigoPrograma}&codigoProyecto=${codigoProyecto}&codigoActividad=${codigoActividad}&codigoObra=${codigoObra}`)
            .then((res) => res.json())
            .then((data) => {
                setRenglones(data);
                setLoading(false);
            })
            .catch(() => {
                setError("No se pudieron cargar los renglones.");
                setLoading(false);
            });
    }, [codigoPrograma, codigoProyecto, codigoActividad, codigoObra]);

    const renglonesOrdenados = [...renglones].sort((a, b) => b.vigente - a.vigente);
    const renglonesFiltrados = renglonesOrdenados.filter((r) =>
        (r.renglon || "").toLowerCase().includes(busqueda.toLowerCase())
    );

    let nombreObra = renglones[0]?.obra;
    if (!nombreObra || nombreObra === 'NA') {
        nombreObra = 'OTRAS';
    }

    return (
        <>
            <header className="w-full max-w-2xl flex flex-col items-center gap-2 mb-8">
                <h2 className="relative text-4xl sm:text-3xl font-extrabold font-sans text-[var(--paper)] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] mb-2 tracking-tight">
                    OBRA: {nombreObra}
                    <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-[var(--paper)]"></span>
                </h2>
                <input
                    type="text"
                    placeholder="Buscar renglón..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-white text-[var(--primary)] mb-4 shadow"
                />
            </header>
            <main className="w-full max-w-4xl bg-[var(--secondary)] rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-6">
                {loading ? (
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
                    <div className="grid grid-cols-1 gap-6">
                        {renglonesFiltrados.length === 0 ? (
                            <div className="col-span-2 text-center text-[var(--secondary)]">No se encontraron renglones.</div>
                        ) : (
                            renglonesFiltrados.map((r) => (
                                <div
                                    key={r.codigoRenglon}
                                    className="flex flex-col gap-2 bg-[var(--paper)] rounded-lg p-6 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer border-2 border-transparent hover:border-[var(--highlight)]"
                                    role="button"
                                    tabIndex={0}
                                >
                                    {/* Encabezado */}
                                    <div className="flex flex-col items-start mb-2">
                                        <span className="font-bold text-xl text-[var(--primary)] leading-tight">{r.renglon}</span>
                                        <span className="text-xs text-[var(--secondary)]">Código: {r.codigoRenglon}</span>
                                    </div>
                                    {/* Montos */}
                                    <div className="flex flex-row justify-center items-end gap-8 mb-4">
                                        <div className="flex flex-col items-center">
                                            <BanknotesIcon className="inline-block w-5 h-5 text-[var(--accent)] mr-1 align-text-bottom" />
                                            <span className="text-xs text-[var(--secondary)]">Presupuesto vigente</span>
                                            <span className="text-2xl font-extrabold text-[var(--accent)]">Q{r.vigente.toLocaleString()}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <ArrowDownTrayIcon className="inline-block w-5 h-5 text-[var(--highlight)] mr-1 align-text-bottom" />
                                            <span className="text-xs text-[var(--secondary)]">Ejecutado</span>
                                            <span className="text-2xl font-extrabold text-[var(--highlight)]">Q{r.devengado.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    {/* Barra y porcentaje */}
                                    <div className="relative w-full flex flex-col items-center mt-2">
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                                            <span className="bg-white border border-[var(--highlight)] text-[var(--highlight)] font-bold px-3 py-1 rounded-full shadow text-sm">
                                                {calcularPorcentajeEjecutado(r).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-[var(--highlight)]/30 rounded-full h-3">
                                            <div
                                                className="bg-[var(--accent)] h-3 rounded-full transition-all"
                                                style={{ width: `${calcularPorcentajeEjecutado(r)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
            <button
                onClick={() => router.back()}
                className="fixed bottom-8 right-8 z-50 bg-[var(--accent)] text-white rounded-full shadow-2xl w-16 h-16 p-0 flex items-center justify-center text-2xl font-bold hover:bg-[var(--highlight)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--highlight)]/50 active:scale-95"
                aria-label="Volver atrás"
            >
                <ArrowLeftIcon className="w-8 h-8" />
            </button>
        </>
    );
} 