
import { AnalysisResult } from "@/lib/ai";
import { CheckCircle2, AlertTriangle, Sprout, FlaskConical } from "lucide-react";

interface AnalysisResultCardProps {
    result: AnalysisResult;
}

export function AnalysisResultCard({ result }: AnalysisResultCardProps) {
    const isHealthy = result.diagnosis.toLowerCase().includes("sağlıklı");

    return (
        <div className="w-full max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

                {/* Header Section */}
                <div className={`p-6 ${isHealthy ? "bg-green-50" : "bg-red-50"}`}>
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">{result.plantName}</h2>
                            <div className="flex items-center gap-2">
                                {isHealthy ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                ) : (
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                )}
                                <span className={`font-semibold ${isHealthy ? "text-green-700" : "text-red-700"}`}>
                                    {result.diagnosis}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                            %{result.confidence} Güven
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-6">

                    {/* Tedavi Yöntemleri */}
                    {!isHealthy && (
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-amber-700">
                                <FlaskConical className="w-5 h-5" />
                                <h3 className="font-semibold text-lg">Önerilen Tedavi & İlaçlar</h3>
                            </div>
                            <ul className="space-y-2">
                                {result.treatment.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-lg text-slate-700">
                                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Gübreleme Önerileri */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-green-700">
                            <Sprout className="w-5 h-5" />
                            <h3 className="font-semibold text-lg">Gübreleme Programı</h3>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {result.fertilizer.map((item, index) => (
                                <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-100 text-green-800 text-sm font-medium">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
