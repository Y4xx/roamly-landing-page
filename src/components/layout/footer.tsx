"use client";

import { useTranslations } from "next-intl";

import { Logo } from "@/components/logo";
import { Link } from "@/i18n/navigation";
import { footerNav } from "@/data/nav";
import { site } from "@/data/site";

const columns = [
  { titleKey: "roamly", links: footerNav.roamly },
  { titleKey: "help", links: footerNav.help },
  { titleKey: "legal", links: footerNav.legal },
  { titleKey: "partners", links: footerNav.partners },
] as const;

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-[1460px] px-4 py-14 sm:px-6 lg:px-0.5">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo variant="white" />
            <p className="mt-4 max-w-xs text-sm text-gray-400">{t("footer.tagline")}</p>
          </div>

          {columns.map((col) => (
            <div key={col.titleKey}>
              <h3 className="text-sm font-semibold text-white">
                {t(`footer.columnTitles.${col.titleKey}`)}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {t(`links.${link.id}`)}
                    </Link>
                  </li>
                ))}
                {col.titleKey === "legal" && (
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        window.dispatchEvent(new CustomEvent("roamly:open-cookie-settings"))
                      }
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {t("footer.cookieSettings")}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-xs leading-relaxed text-gray-500">
          <p>
            {t("footer.bottomLine", {
              entity: site.legalEntity,
              registration: site.legalRegistration,
              address: site.legalAddress,
              year: site.launchYear,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
