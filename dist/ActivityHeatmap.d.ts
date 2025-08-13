import React from "react";
import { CellColors, type HeatmapActivity, type HeatmapCell } from "./types";
type Props = {
    activities: Array<HeatmapActivity>;
    startDate?: Date;
    endDate?: Date;
    cellColors?: CellColors;
    renderTooltip?: (cell: HeatmapCell) => React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    monthLabelStyle?: React.CSSProperties;
    tooltipStyle?: React.CSSProperties;
};
export declare const ActivityHeatmap: React.FC<Props>;
export {};
