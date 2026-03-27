export const getStyles = (locale: string) => ({
  baseText: `mt-4 text-lg sm:text-xl text-white ${locale === "th" ? "font-thai" : "font-eng"}`,
});

export const sectionHight = "min-h-[100svh]";
