import type { AppEntry } from "@/lib/apps";

export function SoonBadge({ theme }: { theme: AppEntry["theme"] }) {
  return (
    <span data-testid="soon-badge" style={{ background: theme.accent, color: theme.accentText }} className="rounded-full px-2.5 py-0.5 text-xs font-bold">
      Yakında geliyor
    </span>
  );
}
