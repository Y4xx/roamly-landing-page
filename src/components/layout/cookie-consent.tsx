"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "roamly-cookie-consent";

interface Consent {
  essential: true;
  analytics: boolean;
}

function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage unavailable — consent still applies for this page view
  }
}

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [showBanner, setShowBanner] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);

  React.useEffect(() => {
    const existing = readConsent();
    if (existing) {
      setAnalytics(existing.analytics);
    } else {
      setShowBanner(true);
    }

    function handleOpenSettings() {
      setAnalytics(readConsent()?.analytics ?? false);
      setShowSettings(true);
    }

    window.addEventListener("roamly:open-cookie-settings", handleOpenSettings);
    return () =>
      window.removeEventListener("roamly:open-cookie-settings", handleOpenSettings);
  }, []);

  function acceptAll() {
    writeConsent({ essential: true, analytics: true });
    setAnalytics(true);
    setShowBanner(false);
  }

  function rejectNonEssential() {
    writeConsent({ essential: true, analytics: false });
    setAnalytics(false);
    setShowBanner(false);
  }

  function saveSettings() {
    writeConsent({ essential: true, analytics });
    setShowSettings(false);
    setShowBanner(false);
  }

  return (
    <>
      {showBanner && (
        <div
          role="dialog"
          aria-label={t("dialog.title")}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-surface-card p-4 shadow-lg sm:p-6"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text-secondary">
              {t("banner.text")}{" "}
              <Link href="/cookie-policy" className="text-text-link hover:underline">
                {t("banner.policyLink")}
              </Link>
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                {t("banner.customize")}
              </Button>
              <Button variant="ghost" size="sm" onClick={rejectNonEssential}>
                {t("banner.reject")}
              </Button>
              <Button variant="cta" size="sm" onClick={acceptAll}>
                {t("banner.acceptAll")}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("dialog.title")}</DialogTitle>
            <DialogDescription>{t("dialog.description")}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-start gap-3">
              <Checkbox checked disabled id="essential-cookies" />
              <div>
                <label htmlFor="essential-cookies" className="text-sm font-medium">
                  {t("dialog.essentialLabel")}
                </label>
                <p className="text-sm text-text-secondary">{t("dialog.essentialBody")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="analytics-cookies"
                checked={analytics}
                onCheckedChange={(checked) => setAnalytics(checked === true)}
              />
              <div>
                <label htmlFor="analytics-cookies" className="text-sm font-medium">
                  {t("dialog.analyticsLabel")}
                </label>
                <p className="text-sm text-text-secondary">{t("dialog.analyticsBody")}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="cta" onClick={saveSettings}>
              {t("dialog.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
