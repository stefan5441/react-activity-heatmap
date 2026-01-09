import { FaCode, FaNpm } from "react-icons/fa";
import { ActivityHeatmap } from "./ActivityHeatmap";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <h1>React Activity Heatmap Demo</h1>

      <ActivityHeatmap />

      <p>Install using npm install react-activity-heatmap and enjoy. ❤️</p>

      <div className={styles.footer}>
        <a
          href="https://github.com/stefan5441/react-activity-heatmap"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCode size={20} /> github
        </a>

        <a
          href="https://www.npmjs.com/package/react-activity-heatmap"
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaNpm size={20} /> npm
        </a>
      </div>
    </div>
  );
}

export default App;
