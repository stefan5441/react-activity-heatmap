import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./Tooltip.module.css";

type Props = {
  content: React.ReactNode;
  children: React.ReactNode;
  customStyle?: React.CSSProperties;
};

export const Tooltip: React.FC<Props> = ({ content, children, customStyle }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const show = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const tooltip =
    visible && coords
      ? createPortal(
          <div
            style={{
              top: coords.top - 40,
              left: coords.left,
              ...customStyle,
            }}
            className={styles.tooltip}
          >
            {content}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div ref={ref} className={styles.wrapper} onMouseEnter={show} onMouseLeave={hide}>
        {children}
      </div>
      {tooltip}
    </>
  );
};
