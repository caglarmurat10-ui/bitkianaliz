
export interface AgriculturalItem {
    id: string;
    name: string;
    category: "GÜBRE" | "İLAÇ" | "DİĞER";
    description: string;
    activeIngredient?: string; // İlaçlar için
    content?: string; // Gübreler için (NPK vb.)
    dosage?: string; // Uygulama dozu
}

export type CompatibilityStatus = "UYGUN" | "RİSKLİ" | "YASAK";

export interface CompatibilityRule {
    item1: string; // ID veya Kategori
    item2: string; // ID veya Kategori
    status: CompatibilityStatus;
    note: string;
}

export const AGRI_ITEMS: AgriculturalItem[] = [
    // Gübreler
    { id: "g1", name: "Üre (%46 N)", category: "GÜBRE", description: "Yüksek azot içeren granül gübre.", content: "46-0-0", dosage: "20-25 kg/dekar (Taban)" },
    { id: "g2", name: "DAP (18-46-0)", category: "GÜBRE", description: "Taban gübresi olarak kullanılır.", content: "18-46-0", dosage: "15-20 kg/dekar" },
    { id: "g3", name: "Amonyum Sülfat", category: "GÜBRE", description: "Şeker gübresi olarak bilinir.", content: "21-0-0 + 24S", dosage: "20-30 kg/dekar" },
    { id: "g4", name: "Kalsiyum Nitrat", category: "GÜBRE", description: "Suda eriyen kalsiyum kaynağı.", content: "15.5-0-0 + 19Ca", dosage: "100L suya 500gr (Yaprak)" },
    { id: "g5", name: "Potasyum Sülfat", category: "GÜBRE", description: "Klor içermeyen potasyum kaynağı.", content: "0-0-50 + 18S", dosage: "100L suya 300-400gr (Yaprak)" },
    { id: "g6", name: "MKP (Monopotasyum Fosfat)", category: "GÜBRE", description: "Suda tamamen eriyen fosfor ve potasyum.", content: "0-52-34", dosage: "100L suya 250-300gr" },

    // İlaçlar (Etken Maddeler)
    { id: "i1", name: "Bakır Sülfat (Göztaşı)", category: "İLAÇ", description: "Mantar hastalıklarına karşı kullanılır.", activeIngredient: "Bakır", dosage: "100L suya 1-1.5kg (%1'lik Bordo Bulamacı)" },
    { id: "i2", name: "Kükürt (Toz/Sıvı)", category: "İLAÇ", description: "Külleme ve akar mücadelesinde.", activeIngredient: "Kükürt", dosage: "100L suya 400ml (Sıvı) / 3kg/dekar (Toz)" },
    { id: "i3", name: "Abamectin", category: "İLAÇ", description: "Kırmızı örümcek ilacı.", activeIngredient: "Abamectin", dosage: "100L suya 25-30ml" },
    { id: "i4", name: "Imidacloprid", category: "İLAÇ", description: "Sistemik etkili böcek ilacı.", activeIngredient: "Imidacloprid", dosage: "100L suya 15-20ml" },
    { id: "i5", name: "Kalsiyum Polisülfat (Gülleci Bulamacı)", category: "İLAÇ", description: "Kış mücadelesinde kullanılır.", activeIngredient: "Kalsiyum Polisülfat", dosage: "100L suya 1.5L (Kış dönemi)" },
];

export const COMPATIBILITY_RULES: CompatibilityRule[] = [
    { item1: "g4", item2: "g5", status: "YASAK", note: "Kalsiyum Nitrat ile Sülfatlı gübreler karışırsa alçı taşı (Jips) oluşur ve çökme yapar." },
    { item1: "g4", item2: "g2", status: "RİSKLİ", note: "Kalsiyum ile Fosfor yüksek pH'da çökme yapabilir." },
    { item1: "i1", item2: "i4", status: "RİSKLİ", note: "Bakırlı ilaçlar çoğu organik insektisit ile karıştırılmamalıdır, hidroliz olabilir." },
    { item1: "i5", item2: "i1", status: "YASAK", note: "Kalsiyum Polisülfat ile Bakırlı ilaçlar asla karıştırılmaz. Fitotoksite yapar." },
    { item1: "i2", item2: "yaglar", status: "RİSKLİ", note: "Kükürt ile Yazlık Yağlar arasında en az 3 hafta süre olmalıdır." },
];

export function checkCompatibility(id1: string, id2: string): { status: CompatibilityStatus; note: string } {
    // Direkt kural kontrolü
    const rule = COMPATIBILITY_RULES.find(
        (r) => (r.item1 === id1 && r.item2 === id2) || (r.item1 === id2 && r.item2 === id1)
    );

    if (rule) return { status: rule.status, note: rule.note };

    // Kategori bazlı varsayılan kurallar (Örnek)
    const item1 = AGRI_ITEMS.find(i => i.id === id1);
    const item2 = AGRI_ITEMS.find(i => i.id === id2);

    if (item1?.category === "GÜBRE" && item2?.category === "İLAÇ") {
        return { status: "RİSKLİ", note: "Gübre ve ilaç karışımlarında mutlaka kavanoz testi yapınız." };
    }

    return { status: "UYGUN", note: "Bilinen bir uyumsuzluk yok. Yine de ön karışım testi önerilir." };
}
