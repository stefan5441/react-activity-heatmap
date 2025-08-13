import React from "react";
import { CellColors, type HeatmapCell } from "./types";
type Props = {
    monthName: string;
    cells: HeatmapCell[];
    columnSizeInCells: number;
    cellColors: CellColors;
    renderTooltip?: (cell: HeatmapCell) => React.ReactNode;
    monthLabelStyle?: React.CSSProperties;
    tooltipStyle?: React.CSSProperties;
};
export declare const ActivityHeatmapMonth: React.FC<Props>;
export {};
