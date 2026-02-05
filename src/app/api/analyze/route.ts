
import { NextRequest, NextResponse } from "next/server";
import { analyzePlantImage } from "@/lib/ai";

export async function POST(req: NextRequest) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "Resim gerekli" }, { status: 400 });
        }

        const result = await analyzePlantImage(image);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || "Analiz işlemi başarısız oldu." },
            { status: 500 }
        );
    }
}
