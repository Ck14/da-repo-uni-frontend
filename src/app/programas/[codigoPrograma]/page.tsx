"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

interface Proyecto {
    codigoProyecto: number;
    proyecto: string;
    codigoPrograma: number;
    programa: string;
    asignado: number;
    modificado: number;
    vigente: number;
    devengado: number;
    pagado: number;
}

function calcularPorcentajeEjecutado(p: { vigente: number; devengado: number }) {
    return (p.devengado / p.vigente) * 100;
}

export default function ProyectosPage() {
    const router = useRouter();
    const params = useParams();
    const codigoPrograma = params.codigoPrograma;
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/query/proyectos?programa=${codigoPrograma}`)
            .then((res) => res.json())
            .then((data) => {
                setProyectos(data);
                setLoading(false);
            })
            .catch(() => {
                setError("No se pudieron cargar los proyectos.");
                setLoading(false);
            });
    }, [codigoPrograma]);

    const proyectosOrdenados = [...proyectos].sort((a, b) => b.vigente - a.vigente);
    const proyectosFiltrados = proyectosOrdenados.filter((p) =>
        p.proyecto.toLowerCase().includes(busqueda.toLowerCase())
    );

    const nombrePrograma = proyectos[0]?.programa || "";

    return (
        <>
            <header className="w-full max-w-2xl flex flex-col items-center gap-2 mb-8">
                <h2 className="relative text-4xl sm:text-3xl font-extrabold font-sans text-[var(--paper)] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] mb-2 tracking-tight">
                    PROGRAMA: {nombrePrograma}
                    <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-[var(--paper)]"></span>
                </h2>
                <input
                    type="text"
                    placeholder="Buscar proyecto..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-white text-[var(--primary)] mb-4 shadow"
                />
            </header>
            <main className="w-full max-w-4xl bg-[var(--secondary)] rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-6">
                {loading ? (
                    <div className="text-center text-[var(--secondary)]">Cargando proyectos...</div>
                ) : error ? (
                    <div className="text-center text-red-600">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {proyectosFiltrados.length === 0 ? (
                            <div className="col-span-2 text-center text-[var(--secondary)]">No se encontraron proyectos.</div>
                        ) : (
                            proyectosFiltrados.map((p) => (
                                <div
                                    key={p.codigoProyecto}
                                    className="flex flex-col gap-2 bg-[var(--paper)] rounded-lg p-6 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer border-2 border-transparent hover:border-[var(--highlight)]"
                                    onClick={() => router.push(`/programas/${codigoPrograma}/proyectos/${p.codigoProyecto}`)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/programas/${codigoPrograma}/proyectos/${p.codigoProyecto}`); }}
                                >
                                    {/* Encabezado */}
                                    <div className="flex flex-col items-start mb-2">
                                        <span className="font-bold text-xl text-[var(--primary)] leading-tight">{p.proyecto}</span>
                                        <span className="text-xs text-[var(--secondary)]">Código: {p.codigoProyecto}</span>
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
                                                {calcularPorcentajeEjecutado(p).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-[var(--highlight)]/30 rounded-full h-3">
                                            <div
                                                className="bg-[var(--accent)] h-3 rounded-full transition-all"
                                                style={{ width: `${calcularPorcentajeEjecutado(p)}%` }}
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
                ⬅
            </button>
        </>
    );
} 