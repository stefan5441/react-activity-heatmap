var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export function getMonthRanges(startDate, endDate) {
    if (startDate > endDate) {
        throw new Error("startDate must be before endDate");
    }
    var result = [];
    var current = new Date(startDate);
    while (current <= endDate) {
        var year = current.getFullYear();
        var month = current.getMonth();
        var monthName = current.toLocaleString("default", { month: "long" });
        var rangeStart = result.length === 0 ? new Date(startDate) : new Date(year, month, 1);
        var isLastMonth = year === endDate.getFullYear() && month === endDate.getMonth();
        var rangeEnd = isLastMonth ? new Date(endDate) : new Date(year, month + 1, 0);
        result.push({
            name: monthName,
            start: rangeStart,
            end: rangeEnd,
        });
        current.setFullYear(year, month + 1, 1);
    }
    return result;
}
export function getHeatmapMonthCells(activities, startDate, endDate) {
    if (startDate.getFullYear() !== endDate.getFullYear() || startDate.getMonth() !== endDate.getMonth()) {
        throw new Error("startDate and endDate must be in the same month");
    }
    if (startDate > endDate) {
        throw new Error("startDate must be before endDate");
    }
    var result = [];
    var activityMap = {};
    activities.forEach(function (a) { return (activityMap[a.date] = a); });
    function addInvisibleCells(count) {
        for (var i = 0; i < count; i++) {
            result.push("invisible");
        }
    }
    function formatKey(date) {
        var yyyy = date.getFullYear();
        var mm = String(date.getMonth() + 1).padStart(2, "0");
        var dd = String(date.getDate()).padStart(2, "0");
        return "".concat(yyyy, "-").concat(mm, "-").concat(dd);
    }
    function formatDisplay(date) {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
    var current = new Date(startDate);
    addInvisibleCells(current.getDay());
    while (current <= endDate) {
        var key = formatKey(current);
        var displayDate = formatDisplay(current);
        if (key in activityMap) {
            result.push(__assign(__assign({}, activityMap[key]), { date: displayDate }));
        }
        else {
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
export var getColor = function (level, cellColors) {
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
