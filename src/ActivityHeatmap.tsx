import React from "react";
import { CellColors, type HeatmapActivity, type HeatmapCell } from "./types";
import { ActivityHeatmapMonth } from "./ActivityHeatmapMonth";
import { getHeatmapMonthCells, getMonthRanges } from "./utils";

import styles from "./ActivityHeatmap.module.css";

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
  cellStyle?: React.CSSProperties;
};

export const ActivityHeatmap: React.FC<Props> = ({
  activities,
  startDate,
  endDate,
  cellColors = { level0: "#3f3f46", level1: "#14532d", level2: "#15803d", level3: "#22c55e", level4: "#86efac" },
  renderTooltip,
  className,
  style,
  monthLabelStyle,
  tooltipStyle,
  cellStyle,
}) => {
  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(defaultStartDate.getDate() - 365);

  const effectiveStartDate = startDate ?? defaultStartDate;
  const effectiveEndDate = endDate ?? today;

  const monthRanges = getMonthRanges(effectiveStartDate, effectiveEndDate);

  const columnSizesInCells = monthRanges.map((month) => {
    const heatmapMonthCells = getHeatmapMonthCells(activities, month.start, month.end);
    return Math.ceil(heatmapMonthCells.length / 7);
  });
  const gridTemplateColumns = columnSizesInCells.map((count) => `${count}fr`).join(" ");

  return (
    <div className={`${styles.scrollContainer} ${className ?? ""}`} style={style}>
      <div className={styles.months} style={{ gridTemplateColumns }}>
        {monthRanges.map((month, i) => {
          const heatmapMonthCells = getHeatmapMonthCells(activities, month.start, month.end);
          const columnSizeInCells = columnSizesInCells[i];

          return (
            <ActivityHeatmapMonth
              monthName={month.name}
              cells={heatmapMonthCells}
              columnSizeInCells={columnSizeInCells}
              key={month.name + month.start.toISOString()}
              cellColors={cellColors}
              renderTooltip={renderTooltip}
              monthLabelStyle={monthLabelStyle}
              tooltipStyle={tooltipStyle}
              cellStyle={cellStyle}
            />
          );
        })}
      </div>
    </div>
  );
};
