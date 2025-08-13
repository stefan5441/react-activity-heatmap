import { jsx as _jsx } from "react/jsx-runtime";
import { ActivityHeatmapMonth } from "./ActivityHeatmapMonth";
import { getHeatmapMonthCells, getMonthRanges } from "./utils";
import styles from "./ActivityHeatmap.module.css";
export var ActivityHeatmap = function (_a) {
    var activities = _a.activities, startDate = _a.startDate, endDate = _a.endDate, _b = _a.cellColors, cellColors = _b === void 0 ? { level0: "#3f3f46", level1: "#14532d", level2: "#15803d", level3: "#22c55e", level4: "#86efac" } : _b, renderTooltip = _a.renderTooltip, className = _a.className, style = _a.style, monthLabelStyle = _a.monthLabelStyle, tooltipStyle = _a.tooltipStyle;
    var today = new Date();
    var defaultStartDate = new Date(today);
    defaultStartDate.setDate(defaultStartDate.getDate() - 365);
    var effectiveStartDate = startDate !== null && startDate !== void 0 ? startDate : defaultStartDate;
    var effectiveEndDate = endDate !== null && endDate !== void 0 ? endDate : today;
    var monthRanges = getMonthRanges(effectiveStartDate, effectiveEndDate);
    var columnSizesInCells = monthRanges.map(function (month) {
        var heatmapMonthCells = getHeatmapMonthCells(activities, month.start, month.end);
        return Math.ceil(heatmapMonthCells.length / 7);
    });
    var gridTemplateColumns = columnSizesInCells.map(function (count) { return "".concat(count, "fr"); }).join(" ");
    return (_jsx("div", { className: "".concat(styles.scrollContainer, " ").concat(className !== null && className !== void 0 ? className : ""), style: style, children: _jsx("div", { className: styles.months, style: { gridTemplateColumns: gridTemplateColumns }, children: monthRanges.map(function (month, i) {
                var heatmapMonthCells = getHeatmapMonthCells(activities, month.start, month.end);
                var columnSizeInCells = columnSizesInCells[i];
                return (_jsx(ActivityHeatmapMonth, { monthName: month.name, cells: heatmapMonthCells, columnSizeInCells: columnSizeInCells, cellColors: cellColors, renderTooltip: renderTooltip, monthLabelStyle: monthLabelStyle, tooltipStyle: tooltipStyle }, month.name + month.start.toISOString()));
            }) }) }));
};
