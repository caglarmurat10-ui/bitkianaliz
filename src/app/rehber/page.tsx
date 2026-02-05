
"use client";

import { useState } from "react";
import { AGRI_ITEMS } from "@/data/agri-data";
import { Search, Info, Sprout, Bug, ChevronLeft, Droplet, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GuidePage() {
    const [search, setSearch] = useState("");

    const filteredItems = AGRI_ITEMS.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
            <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
                <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-slate-700 transition-colors">
                            <ChevronLeft className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="font-bold text-lg text-white">Ana Sayfa</span>
                    </Link>

                    <div className="relative w-full max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Veritabanında ara (Gübre, İlaç, Etken Madde)..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-slate-800 transition-all text-white placeholder:text-slate-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400">
                                <Info className="w-8 h-8" />
                            </div>
                            Zirai Bilgi Bankası
                        </h1>
                        <p className="text-slate-400 ml-1">Toplam {filteredItems.length} kayıt listeleniyor.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                        <div key={item.id} className="bg-slate-900 rounded-3xl p-6 border border-white/5 hover:border-emerald-500/30 hover:bg-slate-800/80 transition-all group shadow-xl">
                            <div className="flex items-start justify-between mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${item.category === 'GÜBRE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                    {item.category}
                                </span>
                                {item.category === 'İLAÇ' ? <Bug className="w-6 h-6 text-slate-500 group-hover:text-amber-400 transition-colors" /> : <Sprout className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 transition-colors" />}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{item.name}</h3>
                            <p className="text-slate-400/90 text-sm mb-6 leading-relaxed h-12 line-clamp-2">{item.description}</p>

                            <div className="space-y-3 pt-4 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                                        {item.category === 'GÜBRE' ? 'İçerik (NPK)' : 'Etken Madde'}
                                    </p>
                                    <p className="text-sm font-bold text-white font-mono bg-white/5 px-2 py-1 rounded-lg">
                                        {item.category === 'GÜBRE' ? item.content : item.activeIngredient}
                                    </p>
                                </div>

                                {item.dosage && (
                                    <div className="bg-blue-900/20 rounded-xl p-3 flex items-start gap-3 mt-3">
                                        <Droplet className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-blue-300 font-bold mb-0.5">ÖNERİLEN DOZAJ</p>
                                            <p className="text-sm text-blue-100">{item.dosage}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredItems.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-10 h-10 text-slate-600" />
                            </div>
                            <p className="text-2xl font-bold text-slate-300">Sonuç bulunamadı.</p>
                            <p className="text-slate-500 mt-2">Lütfen farklı bir kelime ile arama yapmayı deneyin.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
