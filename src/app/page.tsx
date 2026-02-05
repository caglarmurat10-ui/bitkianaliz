
"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "@/components/image-upload";
import { AnalysisResultCard } from "@/components/analysis-result";
import { WeatherCard } from "@/components/weather-card";
import { AnalysisResult } from "@/lib/ai";
import { WeatherData } from "@/lib/weather";
import { getWeatherAction } from "@/app/actions";
import { CompatibilityChecker } from "@/components/compatibility-checker";
import { ApplicationTimeline } from "@/components/application-timeline";
import { Sprout, BookOpen, Activity, Leaf, Bug, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const result = await getWeatherAction(position.coords.latitude, position.coords.longitude);
            if (result.data) {
              setWeather(result.data);
            } else {
              setWeatherError(result.error || "Hava durumu alınamadı.");
            }
          } catch (error) {
            console.error(error); // Keep error logging mostly for dev, user sees generic error
            setWeatherError("Hava durumu servisine erişilemedi.");
          } finally {
            setWeatherLoading(false);
          }
        },
        (error) => {
          console.error(error);
          setWeatherError("Konum izni gerekli.");
          setWeatherLoading(false);
        }
      );
    } else {
      setWeatherError("Konum desteklenmiyor.");
      setWeatherLoading(false);
    }
  }, []);

  const handleImageSelected = async (base64Image: string) => {
    setIsLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analiz başarısız");
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Bitki analizi sırasında bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-2xl shadow-lg shadow-emerald-500/20">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Akıllı Tarım Asistanı</h1>
              <p className="text-slate-400 font-medium text-sm">Profesyonel Teşhis & Yönetim Sistemi</p>
            </div>
          </div>

          <Link href="/rehber" className="group flex items-center gap-3 px-6 py-3 bg-slate-900/50 hover:bg-slate-800/80 border border-white/10 rounded-xl transition-all hover:scale-105 active:scale-95">
            <BookOpen className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
            <span className="font-semibold text-white">Rehber & Veritabanı</span>
          </Link>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN (Sidebar-like on desktop) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6 flex flex-col h-full">
            <WeatherCard weather={weather} loading={weatherLoading} error={weatherError} />

            <div className="flex-1 space-y-6">
              <ApplicationTimeline />

              {/* Quick Stats or Tips Area */}
              <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-white/5 hidden xl:block">
                <h4 className="text-white font-bold flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Sistem Durumu
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">API Bağlantısı</span>
                    <span className="text-emerald-400 font-mono">AKTİF</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Konum Servisi</span>
                    <span className={weather ? "text-emerald-400 font-mono" : "text-amber-500 font-mono"}>{weather ? "AÇIK" : "KAPALI"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Veritabanı</span>
                    <span className="text-slate-200 font-mono">v1.2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Main Content) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">

            {/* Analysis Section */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Yapay Zeka Analizi</h2>
                <p className="text-slate-400 max-w-lg mx-auto">
                  Bitkinizin fotoğrafını yükleyin; hastalık, zararlı ve besin eksikliklerini anında tespit edelim.
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <ImageUpload onImageSelected={handleImageSelected} isLoading={isLoading} />
              </div>

              {analysis ? (
                <div className="mt-8">
                  <AnalysisResultCard result={analysis} />
                </div>
              ) : !isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: Leaf, title: "Hastalık Tespiti", color: "text-emerald-400" },
                    { icon: Bug, title: "Zararlı Analizi", color: "text-amber-400" },
                    { icon: Zap, title: "Gübre Önerisi", color: "text-blue-400" },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-800/50 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/5 hover:bg-slate-800 transition-colors cursor-default group">
                      <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                      <span className="font-semibold text-slate-300 text-sm">{item.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <CompatibilityChecker />

              {/* Placeholder for future tools or stats */}
              <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 flex flex-col justify-center items-center text-center">
                <div className="bg-white/10 p-4 rounded-full mb-4">
                  <Activity className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Akıllı Asistan</h3>
                <p className="text-indigo-200/70 text-sm mb-6">
                  Sürekli öğrenen yapay zeka modelimiz sizin kullanım alışkanlıklarınıza göre özelleştirilmiş öneriler sunmaya hazırlanıyor.
                </p>
                <button className="px-6 py-2 rounded-full border border-white/10 text-white/50 text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors">
                  Çok Yakında
                </button>
              </div>
            </div>

          </div>
        </div>

        <footer className="mt-16 text-center text-slate-600 text-xs py-8 border-t border-white/5">
          <p>© 2026 Akıllı Tarım Asistanı | Yapay Zeka Destekli Hassas Tanım v2.0</p>
        </footer>
      </div>
    </main>
  );
}
