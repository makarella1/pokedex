import { ProgressBar } from "react-loader-spinner";

import styles from "./Loader.module.css";

export const Loader = () => (
  <div className={styles.loaderContainer}>
    <ProgressBar
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      borderColor=""
      barColor="#000"
    />
  </div>
);
