import { MapPin, Phone, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { contactDetails } from "../data/siteContent";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-green-900/10 bg-[#fffdf4]">
      <div className="page-wrap grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-semibold">{t("brand")}</p>
          <p className="max-w-md text-sm text-slate-600">
            Farmer-friendly solar guidance with fast support, practical sizing, and lead handling that is ready to scale.
          </p>
        </div>
        <div className="space-y-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Contact</p>
          <a href={`tel:${contactDetails.phone}`} className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {contactDetails.phone}
          </a>
          <a href={`mailto:${contactDetails.email}`} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            {contactDetails.email}
          </a>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {contactDetails.address}
          </p>
        </div>
        <div className="space-y-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Quick Links</p>
          <Link to="/solutions">Farmer Solutions</Link>
          <Link to="/estimator">Pricing Estimator</Link>
          <Link to="/contact">Lead Form</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
