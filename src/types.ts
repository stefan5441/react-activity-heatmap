export type HeatmapActivity = {
  date: Date;
  count: number;
  level: number;
};

export type HeatmapCell = HeatmapActivity | "invisible";

export type HeatmapMonth = {
  name: string;
  start: Date;
  end: Date;
};

export type CellColors = {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
};
