import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { contactDetails } from "../data/siteContent";

function WhatsAppFloat() {
  const { t } = useTranslation();

  return (
    <a
      href={`https://wa.me/${contactDetails.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-2xl"
    >
      <MessageCircle className="h-4 w-4" />
      {t("cta.whatsapp")}
    </a>
  );
}

export default WhatsAppFloat;
