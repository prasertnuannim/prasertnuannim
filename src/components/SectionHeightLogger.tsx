// components/SectionHeightLogger.tsx
'use client';

import { useRef } from 'react';

type Props = {
  id: string;
  children: React.ReactNode;
};

export default function SectionHeightLogger({ id, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} id={id}>
      {children}
    </section>
  );
}
