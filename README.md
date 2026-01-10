# React Activity Heatmap

A simple and customizable leetcode-style activity heatmap component for React ([Demo](https://react-activity-heatmap-demo.netlify.app/))

![](https://raw.githubusercontent.com/stefan5441/react-heatmap-demo/main/public/demo.png)

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install react-activity-heatmap --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add react-activity-heatmap
```

This package provides a simple and reusable React component to visualize activity data over time in a calendar-style heatmap. It allows you to display daily activity intensity using colored squares, similar to Leetcode’s contribution graph. You can easily customize the start and end dates, color scales, and activity data, making it suitable for dashboards, habit trackers, or any app that needs a compact overview of activity trends.

```js
import React from "react";
import { ActivityHeatmapMonth } from "react-activity-heatmap";

const activities = [
  { date: new Date("2026-08-10"), count: 5, level: 2 },
  { date: new Date("2026-08-11"), count: 2, level: 1 },
  { date: new Date("2026-08-22"), count: 8, level: 3 },
  // add more activity objects here
];

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
```

## Props

| Prop                 | Type                                                                           | Required | Description                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| activities           | `HeatmapActivity[]`                                                            | ✅       | Array of activity objects used to render the heatmap cells.                                                        |
| month                | `number`                                                                       | ✅       | Month to display (1–12).                                                                                           |
| year                 | `number`                                                                       | ✅       | Year to display for the given month.                                                                               |
| hideMonthName        | `boolean`                                                                      | ❌       | Hides the month name header when set to true.                                                                      |
| hideTooltip          | `boolean`                                                                      | ❌       | Disables the tooltip entirely when set to true.                                                                    |
| cellStyle            | `React.CSSProperties`                                                          | ❌       | Inline styles applied to each heatmap cell.                                                                        |
| monthNameStyle       | `React.CSSProperties`                                                          | ❌       | Inline styles applied to the month name label.                                                                     |
| tooltipStyle         | `React.CSSProperties`                                                          | ❌       | Inline styles applied to the tooltip container.                                                                    |
| customTooltipContent | `(activity: HeatmapActivity) => React.ReactNode`                               | ❌       | Custom renderer for tooltip content based on the activity data.                                                    |
| customCellColors     | `Partial<CellColors>`                                                          | ❌       | Overrides default cell colors. Level 0 represents no activity; higher levels map to increasing activity intensity. |
| onCellClick          | `(activity: HeatmapActivity, event: React.MouseEvent<HTMLDivElement>) => void` | ❌       | Callback fired when a heatmap cell is clicked.                                                                     |
| monthNameFormat      | `"short" / "long" / ((date: Date) => string)`                                  | ❌       | Controls how the month name is formatted. Can be a preset or a custom formatter.                                   |
| locale               | `string`                                                                       | ❌       | Locale used for month name formatting (for example: en-US, de-DE).                                                 |
| ariaLabel            | `string`                                                                       | ❌       | Accessible label for the heatmap container.                                                                        |
| cellAriaLabel        | `(activity: HeatmapActivity) => string`                                        | ❌       | Generates an accessible label for individual heatmap cells.                                                        |

## Types

```ts
export type HeatmapActivity = {
  date: Date;
  count: number;
  level: number;
};

export type HeatmapCell = HeatmapActivity | "invisible";

export type CellColors = {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
};
```

## Contributing

This package is open source, contributions are welcome. You can find the project at https://github.com/stefan5441/react-activity-heatmap.

## Compatibility

This package supports the following React versions:

- **React**: `>=16.8.0 <20.0.0`
- **React DOM**: `>=16.8.0 <20.0.0`

Requires React 16.8 or later due to usage of hooks.

## License

This project is licensed under the **MIT License**.
