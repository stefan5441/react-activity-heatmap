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
import { ActivityHeatmap } from "react-activity-heatmap";

const activities = [
  { date: "2025-08-01", count: 5, level: 2 },
  { date: "2025-08-02", count: 2, level: 1 },
  { date: "2025-08-03", count: 8, level: 3 },
  // add more activity objects here
];

const startDate = new Date("2025-08-01");
const endDate = new Date("2025-08-31");

const App = () => {
  return (
    <div>
      <h1>My Activity Heatmap</h1>
      <ActivityHeatmap activities={activities} startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default App;
```

## Props

| Prop            | Type                                     | Required | Description                                                                                                                                                                                          |
| --------------- | ---------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activities      | `Array<HeatmapActivity>`                 | ✅       | Array of activity objects. `level` controls color intensity, and `count` is the number of activities displayed in the tooltip.                                                                       |
| startDate       | `Date`                                   | ❌       | The first date in the heatmap, if not specified it will take today's date - 365 days.                                                                                                                |
| endDate         | `Date`                                   | ❌       | The last date in the heatmap, if not specified it will take today's date.                                                                                                                            |
| cellColors      | `CellColors`                             | ❌       | Customization for the cell colors, level 0 is the no activities color and the others are for each level of activity. If not specified it will take the default green color like the one in the demo. |
| renderTooltip   | `(cell: HeatmapCell) => React.ReactNode` | ❌       | Custom function to render a tooltip for a given cell.                                                                                                                                                |
| className       | `string`                                 | ❌       | Optional CSS class for styling the heatmap container.                                                                                                                                                |
| style           | `React.CSSProperties`                    | ❌       | Inline styles for the heatmap container.                                                                                                                                                             |
| monthLabelStyle | `React.CSSProperties`                    | ❌       | Inline styles for the month labels displayed above the heatmap.                                                                                                                                      |
| tooltipStyle    | `React.CSSProperties`                    | ❌       | Inline styles for the tooltip element.                                                                                                                                                               |

## Types

```ts
export type HeatmapActivity = {
  date: string;
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

## Compatibility

This package supports the following React versions:

- **React**: `>=16.8.0 <20.0.0`
- **React DOM**: `>=16.8.0 <20.0.0`

Requires React 16.8 or later due to usage of hooks.

## License

This project is licensed under the **MIT License**.
