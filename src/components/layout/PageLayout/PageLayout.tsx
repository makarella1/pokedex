import { clsx } from "clsx";
import { PropsWithChildren } from "react";

import styles from "./PageLayout.module.css";

interface PageLayoutProps extends PropsWithChildren {
  className?: string;
}

export const PageLayout = ({ children, className }: PageLayoutProps) => (
  <main className={clsx(styles.page, className)}>{children}</main>
);
