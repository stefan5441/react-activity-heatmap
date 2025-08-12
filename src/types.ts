export type HeatmapActivity = {
  date: string;
  count: number;
  level: number;
};

export type HeatmapCell = HeatmapActivity | "invisible";

export type HeatmapMonth = {
  name: string;
  start: Date;
  end: Date;
};

export type Theme =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

export const themes: Record<Theme, Record<number, string>> = {
  red: {
    0: "#3f3f46",
    1: "#991b1b",
    2: "#b91c1c",
    3: "#ef4444",
    4: "#fecaca",
  },
  orange: {
    0: "#3f3f46",
    1: "#c2410c",
    2: "#ea580c",
    3: "#f97316",
    4: "#fed7aa",
  },
  amber: {
    0: "#3f3f46",
    1: "#92400e",
    2: "#b45309",
    3: "#f59e0b",
    4: "#fde68a",
  },
  yellow: {
    0: "#3f3f46",
    1: "#a16207",
    2: "#ca8a04",
    3: "#eab308",
    4: "#fef08a",
  },
  lime: {
    0: "#3f3f46",
    1: "#365314",
    2: "#4d7c0f",
    3: "#84cc16",
    4: "#d9f99d",
  },
  green: {
    0: "#3f3f46",
    1: "#14532d",
    2: "#15803d",
    3: "#22c55e",
    4: "#86efac",
  },
  emerald: {
    0: "#3f3f46",
    1: "#065f46",
    2: "#047857",
    3: "#10b981",
    4: "#6ee7b7",
  },
  teal: {
    0: "#3f3f46",
    1: "#134e4a",
    2: "#0f766e",
    3: "#14b8a6",
    4: "#5eead4",
  },
  cyan: {
    0: "#3f3f46",
    1: "#164e63",
    2: "#0e7490",
    3: "#06b6d4",
    4: "#67e8f9",
  },
  sky: {
    0: "#3f3f46",
    1: "#0c4a6e",
    2: "#0369a1",
    3: "#0ea5e9",
    4: "#7dd3fc",
  },
  blue: {
    0: "#3f3f46",
    1: "#1e40af",
    2: "#2563eb",
    3: "#3b82f6",
    4: "#93c5fd",
  },
  indigo: {
    0: "#3f3f46",
    1: "#312e81",
    2: "#4338ca",
    3: "#6366f1",
    4: "#a5b4fc",
  },
  violet: {
    0: "#3f3f46",
    1: "#4c1d95",
    2: "#6d28d9",
    3: "#8b5cf6",
    4: "#c4b5fd",
  },
  purple: {
    0: "#3f3f46",
    1: "#581c87",
    2: "#7e22ce",
    3: "#a855f7",
    4: "#d8b4fe",
  },
  fuchsia: {
    0: "#3f3f46",
    1: "#831843",
    2: "#c026d3",
    3: "#d946ef",
    4: "#f9a8d4",
  },
  pink: {
    0: "#3f3f46",
    1: "#9d174d",
    2: "#db2777",
    3: "#ec4899",
    4: "#fbcfe8",
  },
  rose: {
    0: "#3f3f46",
    1: "#881337",
    2: "#be123c",
    3: "#f43f5e",
    4: "#fecdd3",
  },
};
