import { cn } from "@/lib/utils"

type PolicySectionProps = {
  title: string
  children: React.ReactNode
  className?: string
  titleClassName?: string
}

export default function PolicySection({
  title,
  children,
  className,
  titleClassName,
}: PolicySectionProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-secondary/60 p-6 md:p-8",
        className
      )}
    >
      <h2
        className={cn(
          "text-xl font-semibold text-primary md:text-2xl",
          titleClassName
        )}
      >
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-foreground">
        {children}
      </div>
    </section>
  )
}

