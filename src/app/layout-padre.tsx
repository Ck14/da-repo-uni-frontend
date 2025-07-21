"use client";

import React from "react";

export default function LayoutPadre({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-[url('/fondo1.jpg')] bg-repeat bg-center bg-[length:480px_360px] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--accent-light)]/80 pointer-events-none z-0" aria-hidden="true"></div>
            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-full max-w-2xl bg-[var(--paper)] rounded-xl shadow-lg p-6 flex flex-col gap-6">
                    {children}
                </div>
            </div>
        </div>
    );
} 