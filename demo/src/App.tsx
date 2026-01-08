import { ActivityHeatmap } from "../../src/ActivityHeatmap";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <ActivityHeatmap activities={[]} />
    </div>
  );
}

export default App;
