import React from "react";

import styles from "./PageLayout.module.css";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <main className={styles.page}>{children}</main>
);
