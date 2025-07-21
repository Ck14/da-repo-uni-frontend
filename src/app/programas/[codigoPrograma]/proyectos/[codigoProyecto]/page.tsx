"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Actividad {
    codigoActividad: number;
    actividad: string;
    codigoPrograma: number;
    programa: string;
    codigoProyecto: number;
    proyecto: string;
    asignado: number;
    modificado: number;
    vigente: number;
    devengado: number;
    pagado: number;
}

function calcularPorcentajeEjecutado(p: { vigente: number; devengado: number }) {
    return (p.devengado / p.vigente) * 100;
}

export default function ActividadesPage() {
    const router = useRouter();
    const params = useParams();
    const codigoPrograma = params.codigoPrograma;
    const codigoProyecto = params.codigoProyecto;
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3100/query/actividades?codigoPrograma=${codigoPrograma}&codigoProyecto=${codigoProyecto}`)
            .then((res) => res.json())
            .then((data) => {
                setActividades(data);
                setLoading(false);
            })
            .catch(() => {
                setError("No se pudieron cargar las actividades.");
                setLoading(false);
            });
    }, [codigoPrograma, codigoProyecto]);

    const actividadesOrdenadas = [...actividades].sort((a, b) => b.vigente - a.vigente);
    const actividadesFiltradas = actividadesOrdenadas.filter((a) =>
        a.actividad.toLowerCase().includes(busqueda.toLowerCase())
    );

    const nombreProyecto = actividades[0]?.proyecto || "";

    return (
        <>
            <header className="w-full max-w-2xl flex flex-col items-center gap-2 mb-8">
                <h2 className="relative text-4xl sm:text-3xl font-extrabold font-sans text-[var(--highlight)] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] mb-2 tracking-tight">
                    PROYECTO: {nombreProyecto}
                    <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-[var(--highlight)]"></span>
                </h2>
                <input
                    type="text"
                    placeholder="Buscar actividad..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-white text-[var(--primary)] mb-4 shadow"
                />
            </header>
            <main className="w-full max-w-2xl bg-[var(--secondary)] rounded-xl shadow-lg p-6 flex flex-col gap-6">
                {loading ? (
                    <div className="text-center text-[var(--secondary)]">Cargando actividades...</div>
                ) : error ? (
                    <div className="text-center text-red-600">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {actividadesFiltradas.length === 0 ? (
                            <div className="col-span-2 text-center text-[var(--secondary)]">No se encontraron actividades.</div>
                        ) : (
                            actividadesFiltradas.map((a) => (
                                <div
                                    key={a.codigoActividad}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-[var(--paper)] rounded-lg p-4 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer border-2 border-transparent hover:border-[var(--highlight)]"
                                    onClick={() => router.push(`/programas/${codigoPrograma}/proyectos/${codigoProyecto}/actividades/${a.codigoActividad}`)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') router.push(`/programas/${codigoPrograma}/proyectos/${codigoProyecto}/actividades/${a.codigoActividad}`); }}
                                >
                                    <div className="flex-1">
                                        <span className="font-semibold text-[var(--primary)] text-lg">{a.actividad}</span>
                                        <div className="text-sm text-[var(--secondary)] mt-1">Código: {a.codigoActividad}</div>
                                        <div className="text-sm text-[var(--secondary)]">Presupuesto vigente: Q{a.vigente.toLocaleString()}</div>
                                        <div className="text-sm text-[var(--secondary)]">Ejecutado: Q{a.devengado.toLocaleString()} ({calcularPorcentajeEjecutado(a).toFixed(1)}%)</div>
                                    </div>
                                    <div className="mt-2 sm:mt-0 sm:ml-6 w-full sm:w-40">
                                        <div className="w-full bg-[var(--highlight)]/30 rounded-full h-3">
                                            <div
                                                className="bg-[var(--accent)] h-3 rounded-full transition-all"
                                                style={{ width: `${calcularPorcentajeEjecutado(a)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </>
    );
} 