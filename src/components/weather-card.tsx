
import { WeatherData } from "@/lib/weather";
import { CloudSun, Wind, Droplets, AlertTriangle, CheckCircle2 } from "lucide-react";

interface WeatherCardProps {
    weather: WeatherData | null;
    loading: boolean;
    error?: string | null;
}

export function WeatherCard({ weather, loading, error }: WeatherCardProps) {
    if (loading) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-200 animate-pulse h-48 flex items-center justify-center">
                <span className="text-slate-400">Hava durumu yükleniyor...</span>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 text-slate-500">
                    <CloudSun className="w-8 h-8" />
                    <p>Hava durumu bilgisi alınamadı. {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h2 className="text-lg font-medium opacity-90">Anlık Hava Durumu</h2>
                    <p className="text-3xl font-bold mt-1 capitalize">{weather.description}</p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-4xl font-bold">{weather.temp}°C</span>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt="weather icon"
                        className="w-16 h-16 -my-2"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
                    <Wind className="w-5 h-5 text-blue-100" />
                    <div>
                        <p className="text-xs opacity-70">Rüzgar</p>
                        <p className="font-semibold">{weather.windSpeed} km/s</p>
                    </div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-blue-100" />
                    <div>
                        <p className="text-xs opacity-70">Nem</p>
                        <p className="font-semibold">%{weather.humidity}</p>
                    </div>
                </div>
            </div>

            <div className={`rounded-xl p-4 flex items-start gap-3 backdrop-blur-md relative z-10 transition-colors ${weather.isSuitableForSpraying ? "bg-green-500/30 border border-green-400/50" : "bg-red-500/30 border border-red-400/50"
                }`}>
                {weather.isSuitableForSpraying ? (
                    <CheckCircle2 className="w-6 h-6 text-green-200 shrink-0" />
                ) : (
                    <AlertTriangle className="w-6 h-6 text-red-200 shrink-0" />
                )}
                <div>
                    <h3 className="font-bold text-sm mb-1">
                        {weather.isSuitableForSpraying ? "İlaçlama Uygun" : "İlaçlama Riski"}
                    </h3>
                    <p className="text-xs opacity-90 leading-relaxed">
                        {weather.sprayingWarning}
                    </p>
                </div>
            </div>
        </div>
    );
}
