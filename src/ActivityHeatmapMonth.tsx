import React from "react";

import styles from "./ActivityHeatmapMonth.module.css";
import { type HeatmapCell } from "./types";
import { Tooltip } from "./Tooltip";

type Props = {
  monthName: string;
  cells: HeatmapCell[];
  columnSizeInCells: number;
  levelColors: Record<number, string>;
  renderTooltip?: (cell: HeatmapCell) => React.ReactNode;
};

export const ActivityHeatmapMonth: React.FC<Props> = ({
  cells,
  monthName,
  columnSizeInCells,
  levelColors,
  renderTooltip,
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
          >
            <div className={`${styles.cell}`} style={{ backgroundColor: levelColors[cell.level] }} />
          </Tooltip>
        );
      })}
    </div>
    {columnSizeInCells >= 3 && <div className={styles.monthName}>{monthName.slice(0, 3)}</div>}
  </div>
);
