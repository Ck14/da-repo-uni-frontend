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
        <div className="min-h-screen bg-[var(--paper)] flex flex-col items-center p-4 sm:p-8">
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-[var(--primary)] text-center mb-2">Programas</h2>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {programasFiltrados.length === 0 ? (
                            <div className="col-span-2 text-center text-[var(--secondary)]">No se encontraron programas.</div>
                        ) : (
                            programasFiltrados.map((p) => (
                                <button
                                    key={p.codigoPrograma}
                                    className="bg-[var(--secondary)] hover:bg-[var(--highlight)]/30 transition-colors rounded-xl p-6 flex flex-col items-start shadow-lg border-2 border-transparent hover:border-[var(--highlight)] text-left cursor-pointer"
                                    onClick={() => router.push(`/programas/${p.codigoPrograma}`)}
                                >
                                    <span className="text-lg font-bold text-[var(--primary)] mb-1">{p.programa}</span>
                                    <span className="text-sm text-[var(--paper)]">Código: {p.codigoPrograma}</span>
                                    <span className="text-xs mt-2 text-[var(--paper)]">Presupuesto vigente: Q{p.vigente.toLocaleString()}</span>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 