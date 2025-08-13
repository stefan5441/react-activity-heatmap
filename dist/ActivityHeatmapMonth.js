import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ActivityHeatmapMonth.module.css";
import { Tooltip } from "./Tooltip";
import { getColor } from "./utils";
export var ActivityHeatmapMonth = function (_a) {
    var cells = _a.cells, monthName = _a.monthName, columnSizeInCells = _a.columnSizeInCells, cellColors = _a.cellColors, renderTooltip = _a.renderTooltip, monthLabelStyle = _a.monthLabelStyle, tooltipStyle = _a.tooltipStyle;
    return (_jsxs("div", { className: styles.container, children: [_jsx("div", { className: styles.grid, style: { "--cols": columnSizeInCells }, children: cells.map(function (cell, i) {
                    if (cell === "invisible") {
                        return _jsx("div", { className: styles.cellInvisible }, i);
                    }
                    return (_jsxs(Tooltip, { content: renderTooltip
                            ? renderTooltip(cell)
                            : "".concat(cell.count, " ").concat(cell.count === 1 ? "activity" : "activities", " on ").concat(cell.date), children: [_jsx("div", { className: styles.cell, style: { backgroundColor: getColor(cell.level, cellColors) } }), " "] }, i));
                }) }), columnSizeInCells >= 3 && (_jsx("div", { className: styles.monthName, style: monthLabelStyle, children: monthName.slice(0, 3) }))] }));
};
