import React from "react";
import { themes, type HeatmapActivity, type HeatmapCell, type Theme } from "./types";
import { ActivityHeatmapMonth } from "./ActivityHeatmapMonth";
import { getHeatmapMonthCells, getMonthRanges } from "./utils";

import styles from "./ActivityHeatmap.module.css";

type Props = {
  activities: Array<HeatmapActivity>;
  startDate?: Date;
  endDate?: Date;
  theme?: Theme;
  renderTooltip?: (cell: HeatmapCell) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const ActivityHeatmap: React.FC<Props> = ({
  activities,
  startDate,
  endDate,
  theme = "green",
  renderTooltip,
  className,
  style,
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

  const levelColors = themes[theme];

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
              levelColors={levelColors}
              renderTooltip={renderTooltip}
            />
          );
        })}
      </div>
    </div>
  );
};
