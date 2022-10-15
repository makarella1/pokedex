import React from "react";

export const useInView = (options?: IntersectionObserverInit) => {
  const [isInView, setInView] = React.useState(false);

  const setRef = React.useCallback((node: Element | null) => {
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(node);
  }, []);

  return { isInView, ref: setRef };
};
