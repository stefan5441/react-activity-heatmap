import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Tooltip.module.css";
export var Tooltip = function (_a) {
    var content = _a.content, children = _a.children;
    var _b = useState(false), visible = _b[0], setVisible = _b[1];
    var _c = useState(null), coords = _c[0], setCoords = _c[1];
    var ref = useRef(null);
    var show = function () {
        if (ref.current) {
            var rect = ref.current.getBoundingClientRect();
            setCoords({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX + rect.width / 2,
            });
        }
        setVisible(true);
    };
    var hide = function () {
        setVisible(false);
    };
    var tooltip = visible && coords
        ? createPortal(_jsx("div", { style: {
                top: coords.top - 40,
                left: coords.left,
            }, className: styles.tooltip, children: content }), document.body)
        : null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: ref, className: styles.wrapper, onMouseEnter: show, onMouseLeave: hide, children: children }), tooltip] }));
};
