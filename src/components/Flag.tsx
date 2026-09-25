import * as Flags from "country-flag-icons/react/3x2";
import { hasFlag } from "country-flag-icons";

export function Flag({ code, className }: { code: string; className?: string }) {
  if (!code) return null;
  const C = code.toUpperCase();
  if (!hasFlag(C)) return null;
  const FlagIcon = Flags[C as keyof typeof Flags];
  return (
    <FlagIcon
      title={C}
      preserveAspectRatio="xMidYMid slice"
      className={className ?? "h-full w-full"}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

// <Flag code="MA" />  <Flag code="MC" />  <Flag code="US" />