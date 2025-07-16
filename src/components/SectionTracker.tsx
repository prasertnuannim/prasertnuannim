"use client";

import { useEffect } from "react";

export default function SectionTracker() {
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.5,
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
