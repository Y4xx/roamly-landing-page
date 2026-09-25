"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe2 } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Flag } from "../Flag";

interface DestinationCardProps {
  id?: string;
  slug: string;
  name: string;
  flag: string | null;
  code: string;
}

export function DestinationCard({ id, slug, name, flag, code }: DestinationCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      id={id}
      href={`/esim-${slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-surface-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        {/* {flag ?? <Globe2 className="size-5 text-text-tertiary" />} */}
        {flag ? (
          <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-sunken text-xl">
            <Flag code={code} className="h-full w-full object-cover" />
          </span>
        ) : (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-xl">
            <Globe2 className="size-5 text-text-tertiary" />
          </span>
        )}
        <span className="flex flex-col">
          <span className="text-xs text-text-tertiary">eSIM</span>
          <span className="font-semibold text-text-primary">{name}</span>
        </span>
      </div>

      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-text-primary">
        <motion.span
          className="inline-flex"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ArrowRight className="size-4" />
        </motion.span>
      </span>
    </Link>
  );
}
