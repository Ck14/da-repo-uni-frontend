"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

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
        fetch(`http://localhost:3100/query/renglones?codigoPrograma=${codigoPrograma}&codigoProyecto=${codigoProyecto}&codigoActividad=${codigoActividad}&codigoObra=${codigoObra}`)
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
                <h2 className="relative text-4xl sm:text-3xl font-extrabold font-sans text-[var(--highlight)] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] mb-2 tracking-tight">
                    OBRAS: {nombreObra}
                    <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-[var(--highlight)]"></span>
                </h2>
                <input
                    type="text"
                    placeholder="Buscar renglón..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-white text-[var(--primary)] mb-4 shadow"
                />
            </header>
            <main className="w-full max-w-2xl bg-[var(--secondary)] rounded-xl shadow-lg p-6 flex flex-col gap-6">
                {loading ? (
                    <div className="text-center text-[var(--secondary)]">Cargando renglones...</div>
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
                                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-[var(--paper)] rounded-lg p-4 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer border-2 border-transparent hover:border-[var(--highlight)]"
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="flex-1">
                                        <span className="font-semibold text-[var(--primary)] text-lg">{r.renglon}</span>
                                        <div className="text-sm text-[var(--secondary)] mt-1">Código: {r.codigoRenglon}</div>
                                        <div className="text-sm text-[var(--secondary)]">Presupuesto vigente: Q{r.vigente.toLocaleString()}</div>
                                        <div className="text-sm text-[var(--secondary)]">Ejecutado: Q{r.devengado.toLocaleString()} ({calcularPorcentajeEjecutado(r).toFixed(1)}%)</div>
                                    </div>
                                    <div className="mt-2 sm:mt-0 sm:ml-6 w-full sm:w-40">
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
                className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-[var(--highlight)] text-white rounded-full shadow-2xl px-7 py-4 text-xl font-bold hover:bg-[var(--accent)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--highlight)]/50 active:scale-95"
                style={{ minWidth: 56, minHeight: 56 }}
                aria-label="Volver atrás"
            >
                ⬅ Volver
            </button>
        </>
    );
} 