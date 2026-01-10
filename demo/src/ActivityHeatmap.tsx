import { activities } from "./utils";
import { ActivityHeatmapMonth } from "react-activity-heatmap";

export const ActivityHeatmap = () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = new Date().getFullYear();

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {months.map((m) => (
        <ActivityHeatmapMonth
          key={`${m}-${year}`}
          activities={activities}
          month={m}
          year={year}
          cellStyle={{ borderRadius: "0.2rem" }}
          monthNameStyle={{ fontWeight: "semibold" }}
          tooltipStyle={{ border: "1px solid #e0f2fe" }}
          customCellColors={{ level1: "#047857", level2: "#059669", level3: "#10b981", level4: "#34d399" }}
          monthNameFormat={"long"}
          onCellClick={(cell) => alert(`Clicked on cell with ${cell.count} activities.`)}
        />
      ))}
    </div>
  );
};
