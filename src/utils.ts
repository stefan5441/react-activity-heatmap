import type { CellColors, HeatmapActivity, HeatmapCell, HeatmapMonth } from "./types";

export function getMonthRanges(startDate: Date, endDate: Date): Array<HeatmapMonth> {
  if (startDate > endDate) {
    throw new Error("startDate must be before endDate");
  }

  const result: Array<HeatmapMonth> = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const year = current.getFullYear();
    const month = current.getMonth();
    const monthName = current.toLocaleString("default", { month: "long" });

    const rangeStart = result.length === 0 ? new Date(startDate) : new Date(year, month, 1);

    const isLastMonth = year === endDate.getFullYear() && month === endDate.getMonth();
    const rangeEnd = isLastMonth ? new Date(endDate) : new Date(year, month + 1, 0);

    result.push({
      name: monthName,
      start: rangeStart,
      end: rangeEnd,
    });

    current.setFullYear(year, month + 1, 1);
  }

  return result;
}

export function getHeatmapMonthCells(
  activities: Array<HeatmapActivity>,
  startDate: Date,
  endDate: Date
): Array<HeatmapCell> {
  if (startDate.getFullYear() !== endDate.getFullYear() || startDate.getMonth() !== endDate.getMonth()) {
    throw new Error("startDate and endDate must be in the same month");
  }

  if (startDate > endDate) {
    throw new Error("startDate must be before endDate");
  }

  const result: Array<HeatmapCell> = [];

  const activityMap: Record<string, HeatmapActivity> = {};
  activities.forEach((a) => (activityMap[a.date] = a));

  function addInvisibleCells(count: number) {
    for (let i = 0; i < count; i++) {
      result.push("invisible");
    }
  }

  function formatKey(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function formatDisplay(date: Date): string {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const current = new Date(startDate);
  addInvisibleCells(current.getDay());

  while (current <= endDate) {
    const key = formatKey(current);
    const displayDate = formatDisplay(current);

    if (key in activityMap) {
      result.push({
        ...activityMap[key],
        date: displayDate,
      });
    } else {
      result.push({
        date: displayDate,
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
}

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
