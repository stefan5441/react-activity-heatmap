import React from "react";

import { Tooltip } from "./Tooltip";
import { CellColors, HeatmapActivity, type HeatmapCell } from "./types";
import { defaultCellColors, formatDateDisplay, getColor, getHeatmapMonthCells } from "./utils";

import styles from "./ActivityHeatmapMonth.module.css";

type Props = {
  activities: HeatmapActivity[];
  month: number;
  year: number;

  // display options
  hideMonthName?: boolean;
  hideTooltip?: boolean;

  // styling
  monthNameStyle?: React.CSSProperties;
  tooltipStyle?: React.CSSProperties;

  // customization
  customTooltipContent?: (cell: HeatmapCell) => React.ReactNode;
  customCellColors?: Partial<CellColors>;
  cellProps?: (cell: HeatmapCell) => React.HTMLAttributes<HTMLDivElement>;
  onCellClick?: (cell: HeatmapCell, event: React.MouseEvent<HTMLDivElement>) => void;

  // formatting
  monthNameFormat?: "short" | "long" | ((date: Date) => string);
  locale?: string;

  // accessibility
  ariaLabel?: string;
  cellAriaLabel?: (cell: HeatmapCell) => string;
};

export const ActivityHeatmapMonth: React.FC<Props> = ({
  activities,
  year,
  month,
  hideMonthName = false,
  hideTooltip = false,
  monthNameStyle,
  monthNameFormat = "short",
  tooltipStyle,
  customTooltipContent,
  customCellColors,
  cellProps,
  onCellClick,
  locale,
  ariaLabel,
  cellAriaLabel,
}) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const cells = getHeatmapMonthCells(activities, startDate, endDate);
  const columnSizeInCells = Math.ceil(cells.length / 7);
  const monthName =
    typeof monthNameFormat === "function"
      ? monthNameFormat(startDate)
      : startDate.toLocaleString(locale ?? "default", {
          month: monthNameFormat === "short" ? "short" : "long",
        });

  const cellColors = { ...defaultCellColors, ...customCellColors };

  return (
    <div
      className={styles.container}
      role="region"
      aria-label={ariaLabel ?? `Activity heatmap for ${monthName} ${year}`}
    >
      <div className={styles.grid} style={{ "--cols": columnSizeInCells } as React.CSSProperties}>
        {cells.map((cell, i) => {
          if (cell === "invisible") {
            return <div key={`invisible-${i}`} className={styles.cellInvisible} />;
          }

          const isClickable = Boolean(onCellClick || cellProps?.(cell)?.onClick);
          const cellNode = (
            <div
              key={`cell-${i}`}
              className={styles.cell}
              style={{ backgroundColor: getColor(cell.level, cellColors) }}
              aria-label={cellAriaLabel?.(cell) ?? `${cell.count} activities on ${formatDateDisplay(cell.date)}`}
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onClick={(e) => {
                cellProps?.(cell)?.onClick?.(e);
                onCellClick?.(cell, e);
              }}
              onKeyDown={(e) => {
                if (!isClickable) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onCellClick?.(cell, e as unknown as React.MouseEvent<HTMLDivElement>);
                }
              }}
              {...cellProps?.(cell)}
            />
          );

          if (!hideTooltip) {
            return (
              <Tooltip
                key={`cell-${i}`}
                customStyle={tooltipStyle}
                content={
                  customTooltipContent
                    ? customTooltipContent(cell)
                    : `${cell.count} ${cell.count === 1 ? "activity" : "activities"} on ${formatDateDisplay(cell.date)}`
                }
              >
                {cellNode}
              </Tooltip>
            );
          }

          return cellNode;
        })}
      </div>
      {!hideMonthName && columnSizeInCells >= 3 && (
        <div className={styles.monthName} style={{ ...monthNameStyle }}>
          {monthName}
        </div>
      )}
    </div>
  );
};
