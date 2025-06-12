type SectionProps = Readonly<{
  id: string
  title: string
  children: React.ReactNode
}>

export default function Section({
  id,
  title,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen scroll-mt-16 px-4 py-4 border-b border-gray-200"
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  )
}
