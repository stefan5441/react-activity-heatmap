import React from "react";
import { type HeatmapCell } from "./types";
type Props = {
    monthName: string;
    cells: HeatmapCell[];
    columnSizeInCells: number;
    levelColors: Record<number, string>;
    renderTooltip?: (cell: HeatmapCell) => React.ReactNode;
};
export declare const ActivityHeatmapMonth: React.FC<Props>;
export {};
