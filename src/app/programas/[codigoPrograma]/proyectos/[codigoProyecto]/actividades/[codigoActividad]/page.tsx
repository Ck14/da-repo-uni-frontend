"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Obra {
    codigoObra: number;
    Obra: string;
    codigoPrograma: number;
    programa: string;
    codigoProyecto: number;
    codigoActividad: number;
    asignado: number;
    modificado: number;
    vigente: number;
    devengado: number;
    pagado: number;
    actividad?: string;
}

function calcularPorcentajeEjecutado(p: { vigente: number; devengado: number }) {
    return (p.devengado / p.vigente) * 100;
}

export default function ObrasPage() {
    const router = useRouter();
    const params = useParams();
    const codigoPrograma = params.codigoPrograma;
    const codigoProyecto = params.codigoProyecto;
    const codigoActividad = params.codigoActividad;
    const [obras, setObras] = useState<Obra[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/query/obras?codigoPrograma=${codigoPrograma}&codigoProyecto=${codigoProyecto}&codigoActividad=${codigoActividad}`)
            .then((res) => res.json())
            .then((data) => {
                setObras(data);
                setLoading(false);
            })
            .catch(() => {
                setError("No se pudieron cargar las obras.");
                setLoading(false);
            });
    }, [codigoPrograma, codigoProyecto, codigoActividad]);

    const obrasOrdenadas = [...obras].sort((a, b) => b.vigente - a.vigente);
    const obrasFiltradas = obrasOrdenadas.filter((o) =>
        (o.Obra || "").toLowerCase().includes(busqueda.toLowerCase())
    );

    const nombreActividad = obras[0]?.actividad || "OTRAS";

    return (
        <>
            <header className="w-full max-w-2xl flex flex-col items-center gap-2 mb-8">
                <h2 className="relative text-4xl sm:text-3xl font-extrabold font-sans text-[var(--paper)] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] mb-2 tracking-tight">
                    ACTIVIDAD: {nombreActividad}
                    <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-[var(--paper)]"></span>
                </h2>
                <input
                    type="text"
                    placeholder="Buscar obra..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-white text-[var(--primary)] mb-4 shadow"
                />
            </header>
            <main className="w-full max-w-4xl bg-[var(--secondary)] rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-6">
                {loading ? (
                    <div className="text-center text-[var(--secondary)]">Cargando obras...</div>
                ) : error ? (
                    <div className="text-center text-red-600">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {obrasFiltradas.length === 0 ? (
                            <div className="col-span-2 text-center text-[var(--secondary)]">No se encontraron obras.</div>
                        ) : (
                            obrasFiltradas.map((o) => (
                                <div
                                    key={o.codigoObra}
                                    className="flex flex-col gap-2 bg-[var(--paper)] rounded-lg p-6 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer border-2 border-transparent hover:border-[var(--highlight)]"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => router.push(`/programas/${codigoPrograma}/proyectos/${codigoProyecto}/actividades/${codigoActividad}/Obra/${o.codigoObra}`)}
                                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/programas/${codigoPrograma}/proyectos/${codigoProyecto}/actividades/${codigoActividad}/Obra/${o.codigoObra}`); }}
                                >
                                    {/* Encabezado */}
                                    <div className="flex flex-col items-start mb-2">
                                        <span className="font-bold text-xl text-[var(--primary)] leading-tight">{o.Obra}</span>
                                        <span className="text-xs text-[var(--secondary)]">Código: {o.codigoObra}</span>
                                    </div>
                                    {/* Montos */}
                                    <div className="flex flex-row justify-center items-end gap-8 mb-4">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-[var(--secondary)]">Presupuesto vigente</span>
                                            <span className="text-2xl font-extrabold text-[var(--accent)]">Q{o.vigente.toLocaleString()}</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-[var(--secondary)]">Ejecutado</span>
                                            <span className="text-2xl font-extrabold text-[var(--highlight)]">Q{o.devengado.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    {/* Barra y porcentaje */}
                                    <div className="relative w-full flex flex-col items-center mt-2">
                                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                                            <span className="bg-white border border-[var(--highlight)] text-[var(--highlight)] font-bold px-3 py-1 rounded-full shadow text-sm">
                                                {calcularPorcentajeEjecutado(o).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-[var(--highlight)]/30 rounded-full h-3">
                                            <div
                                                className="bg-[var(--accent)] h-3 rounded-full transition-all"
                                                style={{ width: `${calcularPorcentajeEjecutado(o)}%` }}
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