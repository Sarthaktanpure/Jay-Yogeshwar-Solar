import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Building2,
  Flame,
  Home,
  Lightbulb,
  MapPin,
  Phone,
  Sun,
  Tractor,
  Droplets,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { serviceHighlights, stats } from "../data/siteContent";

const companyHighlights = [
  "Authorized dealer for trusted solar brands",
  "Projects completed across Maharashtra, Telangana, Gujarat, and Uttarakhand",
  "Solar solutions for residential, commercial, agricultural, and institutional needs",
];

const productShowcase = [
  {
    title: "Solar Water Pump",
    detail: "Reliable pumping systems for irrigation, borewell, and farm water needs.",
    icon: Droplets,
    tone: "from-amber-100 via-yellow-100 to-lime-100",
  },
  {
    title: "Solar On-Grid System",
    detail: "Rooftop systems for homes, shops, and businesses looking to reduce electricity bills.",
    icon: Building2,
    tone: "from-emerald-100 via-green-100 to-teal-100",
  },
  {
    title: "Solar Off-Grid System",
    detail: "Independent solar setups for places where dependable backup power matters.",
    icon: BatteryCharging,
    tone: "from-yellow-100 via-orange-100 to-amber-100",
  },
  {
    title: "Solar Street Light",
    detail: "Stand-alone lighting solutions for villages, institutions, campuses, and roadsides.",
    icon: Lightbulb,
    tone: "from-lime-100 via-green-100 to-emerald-100",
  },
  {
    title: "Solar Home Lighting Systems",
    detail: "Efficient daily-use lighting for homes and smaller community spaces.",
    icon: Home,
    tone: "from-amber-50 via-yellow-100 to-orange-100",
  },
  {
    title: "Solar Water Heaters",
    detail: "Clean hot water systems designed for residential and commercial use.",
    icon: Flame,
    tone: "from-orange-100 via-amber-100 to-yellow-100",
  },
];

const brandLogos = [
  {
    name: "SHAKTI",
    subtext: "PUMPING LIFE",
    textClass: "text-[#1278C8]",
    accentClass: "bg-[#1278C8]",
  },
  {
    name: "Sudarshan Saur",
    subtext: "Authorized Dealer Brand",
    textClass: "text-[#1F4EA3]",
    accentClass: "bg-[#FFE100]",
  },
  {
    name: "adani",
    subtext: "Solar",
    textClass: "text-[#0E6DB5]",
    accentClass: "bg-slate-300",
  },
  {
    name: "WAAREE",
    subtext: "One with the Sun",
    textClass: "text-[#36A834]",
    accentClass: "bg-[#36A834]",
  },
  {
    name: "Eastman",
    subtext: "ENERGY. UNLIMITED.",
    textClass: "text-[#1662C4]",
    accentClass: "bg-[#F6A61B]",
  },
  {
    name: "LUMINOUS",
    subtext: "Power Solutions",
    textClass: "text-[#1958C7]",
    accentClass: "bg-[#1958C7]",
  },
];

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
              <a href="tel:+919921390121" className="action-primary">
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
            eyebrow="Company Profile"
            title="Jay Yogeshwar Solar Energy System"
            body="A trusted renewable energy company focused on sustainable, reliable, and cost-effective solar solutions for farmers, homes, businesses, and institutions."
          />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="panel p-6">
              <p className="text-base leading-8 text-slate-700">
                With years of solar expertise and a clean-energy vision, the company has delivered projects in
                multiple states while staying grounded in local service from Rahuri, Ahilyanagar.
              </p>
              <div className="mt-6 space-y-4">
                {companyHighlights.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white/70 p-4">
                    <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-green-700" />
                    <p className="text-sm leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-strong p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-yellow-300">Call Us</p>
                  <p className="mt-3 text-2xl font-bold">8788375146</p>
                  <p className="mt-1 text-lg text-slate-200">9921390121</p>
                  <p className="mt-4 text-sm text-slate-300">Email: yogeshmhase08@gmail.com</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 p-5">
                  <MapPin className="h-7 w-7 text-green-800" />
                  <p className="mt-4 text-lg font-semibold text-slate-900">Rahuri Office</p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    Shop No. 3, Sita Plaza Complex, in front of Rahuri Bus Stop, Rahuri, Ahilyanagar - 413705
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-green-100 bg-white/90 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-green-700">Mission & Vision</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Empower individuals, farmers, businesses, and communities with reliable eco-friendly solar
                  solutions and help drive India toward clean, renewable energy.
                </p>
              </div>
            </div>
          </div>

          <SectionHeading
            eyebrow="Authorized Brands"
            title="Trusted solar brands we work with"
            body="Showing the brand logos separately so visitors can quickly see the companies available through Jay Yogeshwar Solar."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {brandLogos.map((brand) => (
              <div key={brand.name} className="panel flex min-h-[150px] items-center justify-center p-6 text-center">
                <div>
                  <div className="mb-4 flex justify-center">
                    <span className={`h-3 w-16 rounded-full ${brand.accentClass}`} />
                  </div>
                  <p className={`text-3xl font-extrabold tracking-wide ${brand.textClass}`}>{brand.name}</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    {brand.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <SectionHeading
            eyebrow="Solar Products"
            title="Solar systems the company sells and supports"
            body="The brochure highlights a practical product mix for agriculture, homes, businesses, and public infrastructure."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {productShowcase.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="panel overflow-hidden p-0">
                  <div className={`h-40 bg-gradient-to-br ${item.tone} p-6`}>
                    <div className="flex h-full items-end justify-between">
                      <div>
                        <p className="chip bg-white/80">Product</p>
                        <h3 className="mt-3 text-2xl font-bold text-slate-900">{item.title}</h3>
                      </div>
                      <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                        <Icon className="h-8 w-8 text-green-800" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-7 text-slate-600">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

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
                <p className="text-sm leading-7 text-slate-700">{point} </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
