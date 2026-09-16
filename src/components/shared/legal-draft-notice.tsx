import { useTranslations } from "next-intl";

export function LegalDraftNotice() {
  const t = useTranslations("legalDraft");

  return (
    <div className="not-prose rounded-lg bg-warning-subtle p-4 text-sm text-amber-600">
      <strong className="text-text-primary">{t("label")}</strong> {t("body")}
    </div>
  );
}
