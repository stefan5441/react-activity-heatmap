import React from "react";

import { Tooltip } from "./Tooltip";
import { CellColors, HeatmapActivity, type HeatmapCell } from "./types";
import { defaultCellColors, formatDateDisplay, getColor, getHeatmapMonthCells } from "./utils";

import styles from "./ActivityHeatmapMonth.module.css";

type Props = {
  activities: Array<HeatmapActivity>;
  month: number;
  year: number;
  hideMonthName?: boolean;
  hideTooltip?: boolean;
  cellStyle?: React.CSSProperties;
  monthNameStyle?: React.CSSProperties;
  tooltipStyle?: React.CSSProperties;
  customTooltipContent?: React.ReactNode;
  customCellColors?: Partial<CellColors>;
  onCellClick?: (cell: HeatmapCell, event: React.MouseEvent<HTMLDivElement>) => void;
};

export const ActivityHeatmapMonth: React.FC<Props> = ({
  activities,
  year,
  month,
  hideMonthName = false,
  hideTooltip = false,
  cellStyle,
  monthNameStyle,
  tooltipStyle,
  customTooltipContent,
  customCellColors,
  onCellClick,
}) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const cells = getHeatmapMonthCells(activities, startDate, endDate);
  console.log({ cells });
  const columnSizeInCells = cells.length / 7;
  const monthName = startDate.toLocaleString("default", { month: "long" });

  const cellColors = { ...defaultCellColors, ...customCellColors };

  return (
    <div className={styles.container}>
      <div className={styles.grid} style={{ "--cols": columnSizeInCells } as React.CSSProperties}>
        {cells.map((cell, i) => {
          if (cell === "invisible") {
            return <div key={`invisible-${i}`} className={styles.cellInvisible} style={{ ...cellStyle }} />;
          }

          if (!hideTooltip) {
            return (
              <Tooltip
                key={`cell-${i}`}
                customStyle={tooltipStyle}
                content={
                  customTooltipContent ??
                  `${cell.count} ${cell.count === 1 ? "activity" : "activities"} on ${formatDateDisplay(cell.date)}`
                }
              >
                <div
                  className={styles.cell}
                  style={{ backgroundColor: getColor(cell.level, cellColors), ...cellStyle }}
                  onClick={(e) => onCellClick?.(cell, e)}
                />
              </Tooltip>
            );
          }

          return (
            <div
              key={`cell-${i}`}
              className={styles.cell}
              style={{ backgroundColor: getColor(cell.level, cellColors), ...cellStyle }}
              onClick={(e) => onCellClick?.(cell, e)}
            />
          );
        })}
      </div>
      {!hideMonthName && columnSizeInCells >= 3 && (
        <div className={styles.monthName} style={{ ...monthNameStyle }}>
          {monthName.slice(0, 3)}
        </div>
      )}
    </div>
  );
};
