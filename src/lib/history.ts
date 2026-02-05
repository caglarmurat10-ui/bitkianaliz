
export interface ApplicationRecord {
    id: string;
    itemId: string;
    itemName: string;
    type: "GÜBRE" | "İLAÇ" | "DİĞER";
    date: string; // ISO String
    notes?: string;
}

const STORAGE_KEY = "agri_app_history";

export const getHistory = (): ApplicationRecord[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addRecord = (record: Omit<ApplicationRecord, "id" | "date">) => {
    const history = getHistory();
    const newRecord: ApplicationRecord = {
        ...record,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newRecord, ...history]));
    return newRecord;
};

export const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const checkRotation = (itemName: string): ApplicationRecord | undefined => {
    const history = getHistory();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 15);

    return history.find(r =>
        r.itemName === itemName &&
        new Date(r.date) > twoWeeksAgo
    );
};
