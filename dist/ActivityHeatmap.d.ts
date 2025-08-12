import React from "react";
import { type HeatmapActivity, type HeatmapCell, type Theme } from "./types";
type Props = {
    activities: Array<HeatmapActivity>;
    startDate?: Date;
    endDate?: Date;
    theme?: Theme;
    renderTooltip?: (cell: HeatmapCell) => React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};
export declare const ActivityHeatmap: React.FC<Props>;
export {};
