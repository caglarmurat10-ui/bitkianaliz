
"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    onImageSelected: (base64: string) => void;
    isLoading: boolean;
}

export function ImageUpload({ onImageSelected, isLoading }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        processFile(file);
    };

    const processFile = (file?: File) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Lütfen bir resim dosyası yükleyin.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setPreview(result);
            onImageSelected(result);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        processFile(file);
    };

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group hover:border-green-500 hover:bg-green-50/50",
                    preview ? "border-green-500 bg-green-50/30" : "border-slate-300 bg-slate-50"
                )}
            >
                <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isLoading}
                />

                {isLoading ? (
                    <div className="flex flex-col items-center gap-2 py-8">
                        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
                        <p className="text-sm font-medium text-slate-600">Bitki Analiz Ediliyor...</p>
                    </div>
                ) : preview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm">
                        <Image
                            src={preview}
                            alt="Uploaded plant"
                            fill
                            className="object-cover"
                        />
                        <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full text-slate-700 shadow-sm backdrop-blur-sm transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 py-8 text-slate-500 group-hover:text-green-600 transition-colors">
                        <div className="p-4 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300">
                            <Upload className="w-8 h-8" />
                        </div>
                        <p className="font-semibold text-lg">Resim Yükle veya Çek</p>
                        <p className="text-sm text-center max-w-[200px] opacity-80">
                            Bitki fotoğrafını buraya sürükleyin veya tıklayarak seçin
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
