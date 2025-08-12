export type HeatmapActivity = {
    date: string;
    count: number;
    level: number;
};
export type HeatmapCell = HeatmapActivity | "invisible";
export type HeatmapMonth = {
    name: string;
    start: Date;
    end: Date;
};
export type Theme = "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
export declare const themes: Record<Theme, Record<number, string>>;
