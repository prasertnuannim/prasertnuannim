import type { ReactNode } from "react";

type SectionProps = Readonly<{
  id: string;
  children: ReactNode;
}>;

export default function Section({ id, children }: SectionProps) {
  return (
    <div
      id={id}
      className="min-h-screen scroll-mt-6 md:scroll-mt-8"
    >
      {children}
    </div>
  );
}
