import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="mx-auto max-w-[948px] px-4 py-16 sm:px-6 sm:py-24 lg:px-0.5">
      <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h1>
      {subtitle && <p className="mt-4 text-lg text-text-secondary">{subtitle}</p>}
      <div className="prose-roamly mt-10 space-y-6 text-text-secondary [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-text-primary [&_a]:text-text-link [&_a]:hover:underline [&_strong]:text-text-primary">
        {children}
      </div>
    </div>
  );
}
