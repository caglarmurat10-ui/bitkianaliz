
export interface WeatherData {
    temp: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    isSuitableForSpraying: boolean;
    sprayingWarning: string;
}

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

// ... types existing ...

export async function getWeatherData(lat: number, lon: number): Promise<{ data?: WeatherData; error?: string }> {
    if (!API_KEY) {
        console.warn("Weather API Key missing");
        return { error: "API Anahtarı (NEXT_PUBLIC_WEATHER_API_KEY) sunucuda bulunamadı." };
    }

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=tr&appid=${API_KEY}`
        );

        if (!res.ok) {
            if (res.status === 401) return { error: "API Anahtarı geçersiz veya henüz aktif değil. (Lütfen 1-2 saat bekleyin)" };
            if (res.status === 404) return { error: "Konum verisi bulunamadı." };
            return { error: `Hava durumu servisi hatası: ${res.status}` };
        }

        const data = await res.json();

        // ... logic existing ...
        const windSpeed = data.wind.speed * 3.6; // Convert m/s to km/h
        const temp = data.main.temp;
        const humidity = data.main.humidity;

        // İlaçlama kontrol mantığı
        let isSuitable = true;
        let warning = "İlaçlama ve gübreleme için koşullar uygun.";

        if (temp < 2) {
            isSuitable = false;
            warning = "⚠️ ZİRAİ DON RİSKİ! Sıcaklık çok düşük. Sulama yapın.";
        } else if (windSpeed > 60) {
            isSuitable = false;
            warning = "🌪️ FIRTINA UYARISI! Açık alan çalışmalarını durdurun.";
        } else if (windSpeed > 10) {
            isSuitable = false;
            warning = "Rüzgar hızı çok yüksek (>10 km/s). İlaçlama yapılması önerilmez.";
        } else if (temp > 30) {
            isSuitable = false;
            warning = "Sıcaklık çok yüksek. Buharlaşma riski var.";
        } else if (data.weather[0].main === "Rain" || data.weather[0].main === "Thunderstorm") {
            isSuitable = false;
            warning = "Yağışlı hava. İlaçlama etkisiz olabilir.";
        }

        return {
            data: {
                temp: Math.round(temp),
                humidity,
                windSpeed: Math.round(windSpeed),
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                isSuitableForSpraying: isSuitable,
                sprayingWarning: warning,
            }
        };
    } catch (error: any) {
        console.error("Weather Service Error:", error);
        return { error: `Sunucu hatası: ${error.message}` };
    }
}
