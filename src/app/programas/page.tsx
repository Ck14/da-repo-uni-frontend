"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Programa {
    codigoPrograma: number;
    programa: string;
    asignado: number;
    modificado: number;
    vigente: number;
    devengado: number;
    pagado: number;
}

export default function ProgramasPage() {
    const [programas, setProgramas] = useState<Programa[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:3100/query/programas")
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

    const programasFiltrados = programas.filter((p) =>
        p.programa.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-[url('/fondo1.jpg')] bg-repeat bg-center bg-[length:480px_360px] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--accent-light)]/80 pointer-events-none z-0" aria-hidden="true"></div>
            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-full max-w-2xl bg-[var(--secondary)] rounded-xl shadow-lg p-6 flex flex-col gap-6">
                    <h2 className="text-4xl sm:text-5xl font-extrabold font-sans text-[var(--highlight)] text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] mb-2 tracking-tight">
                        Programas
                        <span className="block mx-auto mt-2 w-24 h-1 rounded-full bg-[var(--highlight)]"></span>
                    </h2>
                    <input
                        type="text"
                        placeholder="Buscar programa..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-white text-[var(--primary)] mb-4 shadow"
                    />
                    {loading ? (
                        <div className="text-center text-[var(--secondary)]">Cargando programas...</div>
                    ) : error ? (
                        <div className="text-center text-red-600">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {programasFiltrados.length === 0 ? (
                                <div className="col-span-2 text-center text-[var(--secondary)]">No se encontraron programas.</div>
                            ) : (
                                programasFiltrados.map((p) => (
                                    <button
                                        key={p.codigoPrograma}
                                        className="bg-[var(--paper)] hover:bg-[var(--highlight)]/30 transition-colors rounded-xl p-6 flex flex-col items-start shadow-lg border-2 border-transparent hover:border-[var(--highlight)] text-left cursor-pointer"
                                        onClick={() => router.push(`/programas/${p.codigoPrograma}`)}
                                    >
                                        <span className="text-lg font-bold text-[var(--primary)] mb-1">{p.programa}</span>
                                        <span className="text-sm text-[var(--secondary)]">Código: {p.codigoPrograma}</span>
                                        <span className="text-xs mt-2 text-[var(--secondary)]">Presupuesto vigente: Q{p.vigente.toLocaleString()}</span>
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 