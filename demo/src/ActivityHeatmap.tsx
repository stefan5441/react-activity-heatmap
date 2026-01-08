import { activities } from "./utils";
import { ActivityHeatmapMonth } from "../../src/ActivityHeatmapMonth";

import styles from "./ActivityHeatmap.module.css";

export const ActivityHeatmap = () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = 2026;

  return (
    <div className={styles.activityHeatmapContainer}>
      {months.map((m) => (
        <ActivityHeatmapMonth activities={activities} month={m} year={year} showMonthName />
      ))}
    </div>
  );
};
