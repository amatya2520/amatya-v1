import Layout from "@/components/layout/Layout"
import { cn } from "@/lib/utils"

type PolicyPageProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export default function PolicyPage({
  title,
  subtitle,
  children,
  className,
}: PolicyPageProps) {
  return (
    <Layout>
      <section className={cn("container max-w-4xl py-16", className)}>
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-primary md:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </header>

        <div className="mt-10">
          {children}
        </div>
      </section>
    </Layout>
  )
}

