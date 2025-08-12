import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ActivityHeatmapMonth.module.css";
import { Tooltip } from "./Tooltip";
export var ActivityHeatmapMonth = function (_a) {
    var cells = _a.cells, monthName = _a.monthName, columnSizeInCells = _a.columnSizeInCells, levelColors = _a.levelColors, renderTooltip = _a.renderTooltip;
    return (_jsxs("div", { className: styles.container, children: [_jsx("div", { className: styles.grid, style: { "--cols": columnSizeInCells }, children: cells.map(function (cell, i) {
                    if (cell === "invisible") {
                        return _jsx("div", { className: styles.cellInvisible }, i);
                    }
                    return (_jsx(Tooltip, { content: renderTooltip
                            ? renderTooltip(cell)
                            : "".concat(cell.count, " ").concat(cell.count === 1 ? "activity" : "activities", " on ").concat(cell.date), children: _jsx("div", { className: "".concat(styles.cell), style: { backgroundColor: levelColors[cell.level] } }) }, i));
                }) }), columnSizeInCells >= 3 && _jsx("div", { className: styles.monthName, children: monthName.slice(0, 3) })] }));
};
