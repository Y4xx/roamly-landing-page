import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-primary" />
        <p className="mt-2 text-text-secondary">{t("loading")}</p>
      </div>
    </div>
  );
}
