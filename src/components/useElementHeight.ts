// hooks/useElementHeight.ts
import { useEffect, useRef, useState } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };

    update(); // initial
    const observer = new ResizeObserver(update);
    if (ref.current) observer.observe(ref.current);
    const timer = setTimeout(update, 300); // fallback for animation delay
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, height };
}
