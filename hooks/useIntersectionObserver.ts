
import React from 'react';

/**
 * A custom React hook that tracks the intersection of a DOM element with the viewport.
 * @param elementRef - A React ref object pointing to the element to observe.
 * @param options - Configuration for the IntersectionObserver.
 * @param {number} [options.threshold=0.1] - The percentage of the target's visibility needed to trigger the callback.
 * @param {boolean} [options.triggerOnce=true] - If true, the observer will unobserve the target after it becomes visible.
 * @returns {boolean} - True if the element is intersecting, false otherwise.
 */
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options: { threshold?: number; triggerOnce?: boolean } = {}
): boolean => {
  const { threshold = 0.1, triggerOnce = true } = options;
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else {
          if (!triggerOnce) {
            setIntersecting(false);
          }
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, triggerOnce]);

  return isIntersecting;
};
