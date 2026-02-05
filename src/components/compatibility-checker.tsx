
"use client";

import { useState } from "react";
import { AGRI_ITEMS, checkCompatibility, CompatibilityStatus } from "@/data/agri-data";
import { FlaskConical, AlertTriangle, CheckCircle2, XCircle, ArrowRightLeft } from "lucide-react";

export function CompatibilityChecker() {
    const [selected1, setSelected1] = useState<string>("");
    const [selected2, setSelected2] = useState<string>("");
    const [result, setResult] = useState<{ status: CompatibilityStatus; note: string } | null>(null);

    const handleCheck = () => {
        if (!selected1 || !selected2) return;
        const res = checkCompatibility(selected1, selected2);
        setResult(res);
    };

    const getStatusColor = (status: CompatibilityStatus) => {
        switch (status) {
            case "UYGUN": return "bg-green-100 text-green-700 border-green-200";
            case "RİSKLİ": return "bg-amber-100 text-amber-700 border-amber-200";
            case "YASAK": return "bg-red-100 text-red-700 border-red-200";
        }
    };

    const getStatusIcon = (status: CompatibilityStatus) => {
        switch (status) {
            case "UYGUN": return <CheckCircle2 className="w-6 h-6" />;
            case "RİSKLİ": return <AlertTriangle className="w-6 h-6" />;
            case "YASAK": return <XCircle className="w-6 h-6" />;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center gap-3">
                    <FlaskConical className="w-8 h-8 opacity-90" />
                    <div>
                        <h2 className="text-xl font-bold">Karışabilirlik Testi</h2>
                        <p className="text-blue-100 text-sm">Gübre ve ilaçların uyumluluğunu kontrol edin.</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-1">1. Ürün</label>
                        <select
                            className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selected1}
                            onChange={(e) => { setSelected1(e.target.value); setResult(null); }}
                        >
                            <option value="">Seçiniz...</option>
                            {AGRI_ITEMS.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="hidden md:flex items-center justify-center pt-6 text-slate-400">
                        <ArrowRightLeft className="w-6 h-6" />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-1">2. Ürün</label>
                        <select
                            className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selected2}
                            onChange={(e) => { setSelected2(e.target.value); setResult(null); }}
                        >
                            <option value="">Seçiniz...</option>
                            {AGRI_ITEMS.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleCheck}
                    disabled={!selected1 || !selected2 || selected1 === selected2}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-md active:scale-95"
                >
                    KONTROL ET
                </button>

                {result && (
                    <div className={`p-4 rounded-xl border-2 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 ${getStatusColor(result.status)}`}>
                        <div className="mt-1">{getStatusIcon(result.status)}</div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">{result.status}</h3>
                            <p className="text-sm opacity-90">{result.note}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
