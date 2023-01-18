import { Header } from "../../components/Header";
import { SummaryTable } from "../../components/SummaryTable";

import styles from "./styles.module.css";

export function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        {/* <SummaryTable /> */}
      </div>
    </div>
  );
}
