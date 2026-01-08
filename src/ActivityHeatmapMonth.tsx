import React from "react";

import styles from "./ActivityHeatmapMonth.module.css";
import { CellColors, type HeatmapCell } from "./types";
import { Tooltip } from "./Tooltip";
import { getColor } from "./utils";

type Props = {
  monthName: string;
  cells: HeatmapCell[];
  columnSizeInCells: number;
  cellColors: CellColors;
  renderTooltip?: (cell: HeatmapCell) => React.ReactNode;
  monthLabelStyle?: React.CSSProperties;
  tooltipStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  onCellClick?: (cell: HeatmapCell, event: React.MouseEvent<HTMLDivElement>) => void;
};

export const ActivityHeatmapMonth: React.FC<Props> = ({
  cells,
  monthName,
  columnSizeInCells,
  cellColors,
  renderTooltip,
  monthLabelStyle,
  tooltipStyle,
  cellStyle,
  onCellClick,
}) => (
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
            style={{ ...tooltipStyle }}
          >
            <div
              className={styles.cell}
              style={{ backgroundColor: getColor(cell.level, cellColors), ...cellStyle }}
              onClick={(e) => onCellClick?.(cell, e)}
            />
          </Tooltip>
        );
      })}
    </div>
    {columnSizeInCells >= 3 && (
      <div className={styles.monthName} style={monthLabelStyle}>
        {monthName.slice(0, 3)}
      </div>
    )}
  </div>
);
