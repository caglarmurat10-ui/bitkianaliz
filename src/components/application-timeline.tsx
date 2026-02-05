
"use client";

import { useEffect, useState } from "react";
import { ApplicationRecord, getHistory } from "@/lib/history";
import { AGRI_ITEMS } from "@/data/agri-data";
import { Calendar, Droplet, Sprout, Clock, CheckCircle2 } from "lucide-react";

export function ApplicationTimeline() {
    const [history, setHistory] = useState<ApplicationRecord[]>([]);

    useEffect(() => {
        setHistory(getHistory());

        // Listen for storage changes in other tabs or updates
        const handleStorage = () => setHistory(getHistory());
        window.addEventListener("storage", handleStorage);
        // Custom event for local updates
        window.addEventListener("historyUpdated", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("historyUpdated", handleStorage);
        };
    }, []);

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (history.length === 0) {
        return (
            <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 text-center">
                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Henüz Bir Uygulama Yok</h3>
                <p className="text-slate-400 text-sm">Gübre veya ilaç uygulamalarınızı buradan takip edebilirsiniz.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-emerald-400" />
                <h3 className="text-white font-bold text-xl">Uygulama Geçmişi</h3>
            </div>

            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-slate-800">
                {history.slice(0, 5).map((record) => (
                    <div key={record.id} className="relative pl-10">
                        {/* Dot */}
                        <div className="absolute left-[11px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-slate-900"></div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors group">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-emerald-400 text-xs font-mono">{formatDate(record.date)}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${record.type === 'GÜBRE' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                    {record.type}
                                </span>
                            </div>
                            <h4 className="text-white font-bold mb-1 group-hover:text-emerald-300 transition-colors">{record.itemName}</h4>
                            {record.notes && <p className="text-slate-400 text-xs">{record.notes}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
