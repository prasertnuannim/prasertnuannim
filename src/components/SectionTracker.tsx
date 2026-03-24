"use client";

import { useEffect } from "react";

export default function SectionTracker() {
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "works", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
