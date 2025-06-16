export const getStyles = (locale: string) => ({
  baseText: `mt-4 text-base sm:text-lg max-w-2xl text-white ${locale === "th" ? "font-thai" : "font-eng"}`,
});

export const sectionHight = "min-h-screen";
