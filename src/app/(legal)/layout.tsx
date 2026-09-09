import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 -z-10"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(35,54,111,.45) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
