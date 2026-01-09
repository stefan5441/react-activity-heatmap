import { activities } from "./utils";
import { ActivityHeatmapMonth } from "../../src/ActivityHeatmapMonth";

export const ActivityHeatmap = () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = new Date().getFullYear();

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {months.map((m) => (
        <ActivityHeatmapMonth key={`${m}-${year}`} activities={activities} month={m} year={year} />
      ))}
    </div>
  );
};
