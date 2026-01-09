import type { CellColors, HeatmapActivity, HeatmapCell, HeatmapMonth } from "./types";

export const getHeatmapMonthCells = (
  activities: Array<HeatmapActivity>,
  startDate: Date,
  endDate: Date
): Array<HeatmapCell> => {
  if (startDate.getFullYear() !== endDate.getFullYear() || startDate.getMonth() !== endDate.getMonth()) {
    throw new Error("startDate and endDate must be in the same month");
  }

  if (startDate > endDate) {
    throw new Error("startDate must be before endDate");
  }

  const result: Array<HeatmapCell> = [];

  const activityMap: Record<string, HeatmapActivity> = {};
  activities.forEach((a) => {
    const normalizedDate = new Date(a.date);
    normalizedDate.setHours(0, 0, 0, 0);
    activityMap[normalizedDate.toISOString()] = a;
  });

  const addInvisibleCells = (count: number) => {
    for (let i = 0; i < count; i++) {
      result.push("invisible");
    }
  };

  const current = new Date(startDate);
  addInvisibleCells(current.getDay());

  while (current <= endDate) {
    const keyDate = new Date(current);
    keyDate.setHours(0, 0, 0, 0);
    const key = keyDate.toISOString();

    if (key in activityMap) {
      result.push({
        ...activityMap[key],
        date: new Date(current),
      });
    } else {
      result.push({
        date: new Date(current),
        count: 0,
        level: 0,
      });
    }

    current.setDate(current.getDate() + 1);
  }

  if (current.getDay() !== 0) {
    addInvisibleCells(7 - current.getDay());
  }

  return result;
};

export const formatDateDisplay = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getColor = (level: number, cellColors: CellColors) => {
  switch (level) {
    case 0:
      return cellColors.level0;
    case 1:
      return cellColors.level1;
    case 2:
      return cellColors.level2;
    case 3:
      return cellColors.level3;
    case 4:
      return cellColors.level4;
    default:
      return "transparent";
  }
};

export const defaultCellColors: CellColors = {
  level0: "#3f3f46",
  level1: "#14532d",
  level2: "#15803d",
  level3: "#22c55e",
  level4: "#86efac",
};
