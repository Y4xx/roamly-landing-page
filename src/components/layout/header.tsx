"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { mainNav } from "@/data/nav";

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-page/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Roamly home">
          <Logo height={26} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-coral-600"
            >
              {t(`links.${item.id}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <Button variant="coral-outline" asChild>
            <Link href="/#plans">{t("nav.getEsim")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LocaleSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>
                  <Logo height={22} />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {mainNav.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <Link
                      href={item.href}
                      className="rounded-md px-2 py-3 text-base font-medium text-text-primary hover:bg-surface-sunken"
                    >
                      {t(`links.${item.id}`)}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <SheetClose asChild>
                  <Button variant="coral-outline" className="w-full" asChild>
                    <Link href="/#plans">{t("nav.getEsim")}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
