import { ArrowRight, BadgeCheck, Phone, Sun, Tractor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { serviceHighlights, stats } from "../data/siteContent";

function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <section className="section-band">
        <div className="page-wrap grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <span className="chip">{t("home.eyebrow")}</span>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t("home.title")}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">{t("home.body")}</p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+919876543210" className="action-primary">
                <Phone className="h-4 w-4" />
                {t("cta.call")}
              </a>
              <Link to="/estimator" className="action-secondary">
                {t("cta.quote")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="panel p-4">
                  <p className="text-2xl font-bold text-green-800">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-strong overflow-hidden p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-300 p-5">
                <Sun className="mb-4 h-8 w-8 text-amber-700" />
                <p className="text-lg font-semibold text-slate-900">Daytime power priority</p>
                <p className="mt-2 text-sm text-slate-700">Designed around irrigation hours and local load conditions.</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-green-100 to-emerald-300 p-5">
                <Tractor className="mb-4 h-8 w-8 text-green-800" />
                <p className="text-lg font-semibold text-slate-900">Field-first recommendations</p>
                <p className="mt-2 text-sm text-slate-700">Pump capacity, head, and runtime are checked before sizing.</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white">
              <p className="text-sm uppercase tracking-wide text-yellow-300">Service areas</p>
              <p className="mt-2 text-2xl font-bold">Ahilyanagar , Dhule , Nashik and nearby villages</p>
              <p className="mt-2 text-sm text-slate-300">Fast callback flows, WhatsApp-first communication, and admin-ready lead capture.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="page-wrap space-y-8">
          <SectionHeading
            eyebrow="Quick Services"
            title="Built for the decisions farmers make every season"
            body="The first experience is intentionally simple so visitors can call, compare, or submit a lead without friction."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceHighlights.map((item) => (
              <div key={item.title} className="panel p-5">
                <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="page-wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow={t("home.whyTitle")}
            title="A local experience that feels direct and trustworthy"
            body="The website is shaped around speed, clear choices, and lead capture that does not collapse when traffic spikes."
          />
          <div className="space-y-4">
            {t("home.why", { returnObjects: true }).map((point) => (
              <div key={point} className="panel flex gap-4 p-5">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-green-700" />
                <p className="text-sm leading-7 text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
