import React from "react";

export const useInView = (options?: IntersectionObserverInit) => {
  const [observer, setObserver] = React.useState<IntersectionObserver | null>(
    null
  );
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<any>();

  const callback = React.useCallback(
    (entries: IntersectionObserverEntry[]) =>
      setIsInView(entries[0].isIntersecting),
    [isInView]
  );

  React.useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(callback, options);
      setObserver(observer);
      observer.observe(ref.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  return { ref, isInView };
};
