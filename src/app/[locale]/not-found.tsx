import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary">{t("title")}</h1>
        <p className="mt-2 text-text-secondary">{t("body")}</p>
        <Button asChild className="mt-4">
          <Link href="/">{t("cta")}</Link>
        </Button>
      </div>
    </div>
  );
}
