import React from "react";
import { Tooltip } from "./Tooltip";
import { getColor, getHeatmapMonthCells } from "./utils";
import { CellColors, HeatmapActivity, type HeatmapCell } from "./types";

import styles from "./ActivityHeatmapMonth.module.css";

const defaultCellColors: CellColors = {
  level0: "#3f3f46",
  level1: "#14532d",
  level2: "#15803d",
  level3: "#22c55e",
  level4: "#86efac",
};

type Props = {
  activities: Array<HeatmapActivity>;
  month: number;
  year: number;
  showMonthName?: boolean;
  customCellColors?: Partial<CellColors>;
  renderTooltip?: (cell: HeatmapCell) => React.ReactNode;
  onCellClick?: (cell: HeatmapCell, event: React.MouseEvent<HTMLDivElement>) => void;
};

export const ActivityHeatmapMonth: React.FC<Props> = ({
  activities,
  year,
  month,
  showMonthName = false,
  customCellColors,
  renderTooltip,
  onCellClick,
}) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  console.log(startDate, endDate);

  const cells = getHeatmapMonthCells(activities, startDate, endDate);
  const columnSizeInCells = cells.length / 7;
  const monthName = startDate.toLocaleString("default", { month: "long" });

  const cellColors = { ...defaultCellColors, ...customCellColors };

  return (
    <div className={styles.container}>
      <div className={styles.grid} style={{ "--cols": columnSizeInCells } as React.CSSProperties}>
        {cells.map((cell, i) => {
          if (cell === "invisible") {
            return <div key={i} className={styles.cellInvisible} />;
          }
          return (
            <Tooltip
              key={i}
              content={
                renderTooltip
                  ? renderTooltip(cell)
                  : `${cell.count} ${cell.count === 1 ? "activity" : "activities"} on ${cell.date}`
              }
            >
              <div
                className={styles.cell}
                style={{ backgroundColor: getColor(cell.level, cellColors) }}
                onClick={(e) => onCellClick?.(cell, e)}
              />
            </Tooltip>
          );
        })}
      </div>
      {showMonthName && columnSizeInCells >= 3 && <div className={styles.monthName}>{monthName.slice(0, 3)}</div>}
    </div>
  );
};
