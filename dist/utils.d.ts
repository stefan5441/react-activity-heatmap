import type { HeatmapActivity, HeatmapCell, HeatmapMonth } from "./types";
export declare function getMonthRanges(startDate: Date, endDate: Date): Array<HeatmapMonth>;
export declare function getHeatmapMonthCells(activities: Array<HeatmapActivity>, startDate: Date, endDate: Date): Array<HeatmapCell>;
