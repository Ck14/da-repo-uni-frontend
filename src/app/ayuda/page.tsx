"use client";
import { useRouter } from "next/navigation";
import { InformationCircleIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, GlobeAltIcon } from "@heroicons/react/24/solid";

export default function AyudaPage() {
    const router = useRouter();
    return (
        <main className="w-full max-w-4xl mx-auto bg-[var(--secondary)] rounded-xl shadow-lg p-6 mt-8 mb-8 flex flex-col gap-8">
            <h1 className="text-4xl font-extrabold text-[var(--paper)] mb-8 text-center tracking-tight flex items-center justify-center gap-4">
                <span>🛈</span> Ayuda y Definiciones
            </h1>
            <div className="flex flex-col gap-6">
                <section className="bg-[var(--paper)] rounded-lg shadow p-8 flex flex-row gap-4 items-start">
                    <CurrencyDollarIcon className="w-10 h-10 text-[var(--accent)] flex-shrink-0" />
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">¿Qué es el Presupuesto Vigente?</h2>
                        <p className="text-[var(--primary)] font-medium">
                            Es el monto total de recursos asignados a un programa, proyecto, actividad u obra para el periodo actual, incluyendo modificaciones, ampliaciones o reducciones realizadas durante el año fiscal.
                        </p>
                    </div>
                </section>
                <section className="bg-[var(--paper)] rounded-lg shadow p-8 flex flex-row gap-4 items-start">
                    <ArrowTrendingUpIcon className="w-10 h-10 text-[var(--highlight)] flex-shrink-0" />
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">¿Qué es el Presupuesto Ejecutado?</h2>
                        <p className="text-[var(--primary)] font-medium">
                            Es la cantidad de dinero que efectivamente se ha utilizado o gastado de ese presupuesto vigente, es decir, lo que ya se ha devengado en pagos, compras o inversiones.
                        </p>
                    </div>
                </section>
                <section className="bg-[var(--paper)] rounded-lg shadow p-8 flex flex-row gap-4 items-start">
                    <InformationCircleIcon className="w-10 h-10 text-[var(--primary)] flex-shrink-0" />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">¿Qué significa el Porcentaje de Ejecución?</h2>
                        <p className="text-[var(--primary)] font-medium">
                            Es la relación entre el presupuesto ejecutado y el presupuesto vigente, expresada en porcentaje. Indica qué tanto del presupuesto disponible ya ha sido utilizado. Se calcula así:
                        </p>
                        <div className="bg-[var(--secondary)]/20 rounded p-4 my-2 text-[var(--primary)] font-bold text-center text-lg">
                            Porcentaje de Ejecución = (Ejecutado / Vigente) × 100
                        </div>
                        <div className="bg-[var(--accent-light)]/40 rounded p-4 my-2 text-[var(--primary)]">
                            <span className="font-semibold">Ejemplo:</span>
                            <div className="mt-2">
                                <span className="inline-block mr-2">Presupuesto vigente: <span className="font-bold">Q100,000</span></span><br />
                                <span className="inline-block mr-2">Ejecutado: <span className="font-bold">Q45,000</span></span><br />
                                <span className="inline-block">Porcentaje de Ejecución: <span className="font-bold">(45,000 / 100,000) × 100 = 45%</span></span>
                            </div>
                        </div>
                        <p className="text-[var(--primary)] font-medium">
                            Un porcentaje bajo puede indicar retrasos o baja ejecución, mientras que un porcentaje alto muestra mayor avance en la utilización de los recursos.
                        </p>
                    </div>
                </section>
                <section className="bg-[var(--paper)] rounded-lg shadow p-8 flex flex-row gap-4 items-start">
                    <GlobeAltIcon className="w-10 h-10 text-[var(--secondary)] flex-shrink-0" />
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">¿De dónde se obtienen los datos?</h2>
                        <p className="text-[var(--primary)] font-medium">
                            Los datos presentados en este sitio provienen de los sistemas oficiales de la Municipalidad de Chimaltenango y fuentes públicas de transparencia presupuestaria.
                            Puedes consultar y descargar la información oficial y actualizada en el portal nacional de datos abiertos:
                        </p>
                        <a
                            href="https://datos.minfin.gob.gt/group/presupuestos-municipales"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-[var(--accent)] underline font-semibold hover:text-[var(--highlight)]"
                        >
                            https://datos.minfin.gob.gt/group/presupuestos-municipales
                        </a>
                    </div>
                </section>
            </div>
            {/* Botón flotante de back */}
            <button
                onClick={() => router.back()}
                className="fixed bottom-8 right-8 z-50 bg-[var(--accent)] text-white rounded-full shadow-2xl w-16 h-16 p-0 flex items-center justify-center text-2xl font-bold hover:bg-[var(--highlight)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--highlight)]/50 active:scale-95"
                aria-label="Volver atrás"
            >
                ⬅
            </button>
        </main>
    );
} 