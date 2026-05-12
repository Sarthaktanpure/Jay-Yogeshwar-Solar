import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Building2,
  CalendarRange,
  Flame,
  Home,
  Lightbulb,
  MapPin,
  Megaphone,
  Phone,
  Sparkles,
  Sun,
  Tractor,
  Droplets,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import solarImage from "../assets/solar.jpg";
import SectionHeading from "../components/SectionHeading";
import { serviceHighlights, stats } from "../data/siteContent";
import api from "../lib/api";

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
  const [dailyPosts, setDailyPosts] = useState([]);
  const [showcases, setShowcases] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadHomeData() {
      try {
        const [{ data: showcaseData }, { data: dailyPostData }] = await Promise.all([
          api.get("/home-showcases"),
          api.get("/daily-posts"),
        ]);

        if (active) {
          setShowcases(Array.isArray(showcaseData) ? showcaseData.filter((item) => item.image?.url) : []);
          setDailyPosts(Array.isArray(dailyPostData) ? dailyPostData.filter((item) => item.image?.url) : []);
        }
      } catch {
        if (active) {
          setShowcases([]);
          setDailyPosts([]);
        }
      }
    }

    loadHomeData();

    return () => {
      active = false;
    };
  }, []);

  const marqueeImages = useMemo(() => {
    if (!showcases.length) {
      return [];
    }

    return [...showcases, ...showcases];
  }, [showcases]);

  const featuredDailyPost = dailyPosts[0] || null;
  const secondaryDailyPosts = dailyPosts.slice(1, 4);

  function getDailyPostMeta(kind) {
    switch (kind) {
      case "offer":
        return {
          label: "Today's offer",
          icon: Sparkles,
          tone: "bg-amber-100 text-amber-900",
        };
      case "event":
        return {
          label: "Event update",
          icon: CalendarRange,
          tone: "bg-sky-100 text-sky-900",
        };
      case "update":
        return {
          label: "Solar update",
          icon: Sun,
          tone: "bg-emerald-100 text-emerald-900",
        };
      default:
        return {
          label: "Notice board",
          icon: Megaphone,
          tone: "bg-slate-200 text-slate-900",
        };
    }
  }

  return (
    <>
      <section className="section-band pt-8 sm:pt-10">
        <div className="page-wrap grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="space-y-6 lg:space-y-7">
            <div className="relative max-w-3xl overflow-hidden rounded-[2rem] border border-white/75 bg-white/45 p-6 shadow-[0_30px_90px_rgba(31,90,42,0.16)] ring-1 ring-white/35 backdrop-blur-md sm:p-8 lg:p-10">
              <img
                src={solarImage}
                alt="Solar panel installation site"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#fffdf7]/95 via-[#fffdf7]/86 to-[#fffdf7]/56" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,212,81,0.22),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
              <div className="relative space-y-5">
                <span className="chip">{t("home.eyebrow")}</span>
                <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.03] tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-[4.1rem]">
                  {t("home.title")}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-700 lg:text-[1.15rem]">{t("home.body")}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="tel:+919921390121"
                className="action-primary rounded-2xl px-6 shadow-[0_18px_40px_rgba(31,90,42,0.22)] hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                {t("cta.call")}
              </a>
              <Link
                to="/estimator"
                className="action-secondary rounded-2xl px-6 shadow-[0_18px_40px_rgba(228,176,33,0.22)] hover:-translate-y-0.5"
              >
                {t("cta.quote")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="panel rounded-[1.6rem] border-white/60 bg-white/80 p-5 shadow-[0_20px_55px_rgba(31,90,42,0.09)]"
                >
                  <p className="text-3xl font-extrabold tracking-[-0.03em] text-green-800">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-strong overflow-hidden rounded-[2rem] border-white/60 bg-white/75 p-6 shadow-[0_28px_90px_rgba(31,90,42,0.12)] backdrop-blur-md lg:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] bg-gradient-to-br from-yellow-50 via-amber-100 to-amber-300 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                <Sun className="mb-4 h-8 w-8 text-amber-700" />
                <p className="text-lg font-semibold text-slate-900">Daytime power priority</p>
                <p className="mt-2 text-sm leading-7 text-slate-700">Designed around irrigation hours and local load conditions.</p>
              </div>
              <div className="rounded-[1.6rem] bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-300 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
                <Tractor className="mb-4 h-8 w-8 text-green-800" />
                <p className="text-lg font-semibold text-slate-900">Field-first recommendations</p>
                <p className="mt-2 text-sm leading-7 text-slate-700">Pump capacity, head, and runtime are checked before sizing.</p>
              </div>
            </div>
            <div className="mt-5 rounded-[1.7rem] bg-[linear-gradient(135deg,#17351f_0%,#12271a_45%,#09140e_100%)] p-6 text-white shadow-[0_22px_55px_rgba(15,23,42,0.2)]">
              <p className="text-sm uppercase tracking-[0.22em] text-yellow-300">Service areas</p>
              <p className="mt-3 text-2xl font-bold tracking-[-0.03em]">Ahilyanagar , Dhule , Nashik and nearby villages</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">Fast callback flows, WhatsApp-first communication, and admin-ready lead capture.</p>
            </div>
          </div>
        </div>
      </section>

      {showcases.length ? (
        <section className="section-band py-6 sm:py-8">
          <div className="page-wrap">
            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.42))] p-5 shadow-[0_28px_90px_rgba(31,90,42,0.08)] ring-1 ring-white/40 backdrop-blur-sm sm:p-6 lg:p-8">
              <SectionHeading
                eyebrow="Live Installations"
                title="Non-stop project visuals from the field"
                body="All images are officially uploaded by Jay Yogeshwar Solar Systems from real project sites."
              />

              <div className="mt-8 space-y-4">
                <div className="home-marquee-mask">
                  <div className="home-marquee-track animate-home-marquee">
                    {marqueeImages.map((item, index) => (
                      <article
                        key={`${item._id}-${index}`}
                        className="home-marquee-card group"
                      >
                        <img
                          src={item.image.url}
                          alt={item.title || "Solar installation"}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 text-white">
                          <p className="text-sm font-semibold sm:text-base">{item.title || "Solar installation"}</p>
                          {item.subtitle ? <p className="mt-1 text-xs text-white/80 sm:text-sm">{item.subtitle}</p> : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="home-marquee-mask">
                  <div className="home-marquee-track animate-home-marquee-reverse">
                    {[...marqueeImages].reverse().map((item, index) => (
                      <article
                        key={`reverse-${item._id}-${index}`}
                        className="home-marquee-card group"
                      >
                        <img
                          src={item.image.url}
                          alt={item.title || "Solar installation"}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 text-white">
                          <p className="text-sm font-semibold sm:text-base">{item.title || "Solar installation"}</p>
                          {item.subtitle ? <p className="mt-1 text-xs text-white/80 sm:text-sm">{item.subtitle}</p> : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {dailyPosts.length ? (
        <section className="section-band py-4 sm:py-6">
          <div className="page-wrap">
            <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(16,35,25,0.98)_0%,rgba(26,58,39,0.96)_48%,rgba(235,178,34,0.14)_100%)] p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.22)] ring-1 ring-white/10 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl space-y-3">
                  <span className="inline-flex items-center rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
                    Daily Posts
                  </span>
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    Today&apos;s offers, event posters, and solar notices
                  </h2>
                  <p className="text-base leading-7 text-slate-200">
                    Fresh updates from the Jay Yogeshwar Solar Energy System.
                  </p>
                </div>
                <div className="max-w-md rounded-[1.4rem] border border-white/10 bg-white/8 px-4 py-3 text-sm leading-7 text-slate-200 backdrop-blur-sm">
                  Making India Green
                </div>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                {featuredDailyPost ? (
                  <article className="group overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/8 shadow-[0_26px_70px_rgba(0,0,0,0.24)] backdrop-blur-sm">
                    <div className="relative h-[320px] overflow-hidden sm:h-[380px]">
                      <img
                        src={featuredDailyPost.image.url}
                        alt={featuredDailyPost.title || "Daily solar post"}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/18 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        {(() => {
                          const meta = getDailyPostMeta(featuredDailyPost.kind);
                          const Icon = meta.icon;
                          return (
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${meta.tone}`}>
                              <Icon className="h-3.5 w-3.5" />
                              {meta.label}
                            </span>
                          );
                        })()}
                        <h3 className="mt-4 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
                          {featuredDailyPost.title || "Daily solar update"}
                        </h3>
                        {featuredDailyPost.subtitle ? (
                          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                            {featuredDailyPost.subtitle}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ) : null}

                <div className="grid gap-4">
                  {secondaryDailyPosts.map((post) => {
                    const meta = getDailyPostMeta(post.kind);
                    const Icon = meta.icon;

                    return (
                      <article
                        key={post._id}
                        className="flex gap-4 rounded-[1.6rem] border border-white/12 bg-white/8 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm transition duration-300 hover:-translate-y-1"
                      >
                        <img
                          src={post.image.url}
                          alt={post.title || "Daily solar post"}
                          className="h-24 w-24 shrink-0 rounded-[1.2rem] object-cover sm:h-28 sm:w-28"
                        />
                        <div className="min-w-0 py-1">
                          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${meta.tone}`}>
                            <Icon className="h-3.5 w-3.5" />
                            {meta.label}
                          </span>
                          <h3 className="mt-3 text-lg font-semibold text-white">{post.title || "Daily solar update"}</h3>
                          {post.subtitle ? (
                            <p className="mt-2 text-sm leading-6 text-slate-200">{post.subtitle}</p>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}

                  {dailyPosts.length > 4 ? (
                    <div className="rounded-[1.6rem] border border-dashed border-white/16 bg-white/6 p-5 text-sm leading-7 text-slate-200">
                      More daily updates are already stored in the dashboard. The latest ones stay prioritized here automatically.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-band pt-6">
        <div className="page-wrap space-y-10">
          <div className="space-y-8 rounded-[2.25rem] bg-white/35 p-1">
            <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.62),rgba(255,255,255,0.3))] p-6 shadow-[0_28px_90px_rgba(31,90,42,0.08)] ring-1 ring-white/40 backdrop-blur-sm sm:p-8 lg:p-10">
              <SectionHeading
                eyebrow="Company Profile"
                title="Jay Yogeshwar Solar Energy System"
                body="A trusted renewable energy company focused on sustainable, reliable, and cost-effective solar solutions for farmers, homes, businesses, and institutions."
              />
              <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="panel rounded-[1.8rem] border-white/60 bg-white/80 p-6 shadow-[0_20px_60px_rgba(31,90,42,0.08)] lg:p-7">
                  <p className="text-base leading-8 text-slate-700">
                    With years of solar expertise and a clean-energy vision, the company has delivered projects in
                    multiple states while staying grounded in local service from Rahuri, Ahilyanagar.
                  </p>
                  <div className="mt-6 space-y-4">
                    {companyHighlights.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 rounded-[1.4rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,250,248,0.82))] p-4 shadow-[0_10px_30px_rgba(31,90,42,0.05)]"
                      >
                        <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-green-700" />
                        <p className="text-sm leading-7 text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel-strong rounded-[1.8rem] border-white/60 bg-white/78 p-6 shadow-[0_20px_60px_rgba(31,90,42,0.1)] lg:p-7">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,#162233_0%,#0f172a_100%)] p-5 text-white shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
                      <p className="text-sm uppercase tracking-[0.2em] text-yellow-300">Call Us</p>
                      <p className="mt-3 text-2xl font-bold tracking-[-0.03em]">8788375146</p>
                      <p className="mt-1 text-lg text-slate-200">9921390121</p>
                      <p className="mt-4 text-sm text-slate-300">Email: yogeshmhase08@gmail.com</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-gradient-to-br from-green-50 via-emerald-100 to-emerald-200 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                      <MapPin className="h-7 w-7 text-green-800" />
                      <p className="mt-4 text-lg font-semibold text-slate-900">Rahuri Office</p>
                      <p className="mt-2 text-sm leading-7 text-slate-700">
                        Shop No. 3, Sita Plaza Complex, in front of Rahuri Bus Stop, Rahuri, Ahilyanagar - 413705
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-[1.5rem] border border-green-100/90 bg-white/92 p-5 shadow-[0_12px_35px_rgba(31,90,42,0.05)]">
                    <p className="text-sm uppercase tracking-[0.2em] text-green-700">Mission & Vision</p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Empower individuals, farmers, businesses, and communities with reliable eco-friendly solar
                      solutions and help drive India toward clean, renewable energy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.62),rgba(255,255,255,0.3))] p-6 shadow-[0_28px_90px_rgba(31,90,42,0.08)] ring-1 ring-white/40 backdrop-blur-sm sm:p-8 lg:p-10">
              <SectionHeading
                eyebrow="Authorized Brands"
                title="Trusted solar brands we work with"
                body="We bring you products from leading companies through Jay Yogeshwar Solar."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {brandLogos.map((brand) => (
                  <div
                    key={brand.name}
                    className="panel group flex min-h-[160px] items-center justify-center rounded-[1.7rem] border-white/70 bg-white/84 p-6 text-center shadow-[0_18px_50px_rgba(31,90,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(31,90,42,0.11)]"
                  >
                    <div>
                      <div className="mb-5 flex justify-center">
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
            </div>

            <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.62),rgba(255,255,255,0.3))] p-6 shadow-[0_28px_90px_rgba(31,90,42,0.08)] ring-1 ring-white/40 backdrop-blur-sm sm:p-8 lg:p-10">
              <SectionHeading
                eyebrow="Solar Products"
                title="Solar systems the company sells and supports"
                body="The brochure highlights a practical product mix for agriculture, homes, businesses, and public infrastructure."
              />
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {productShowcase.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="panel group overflow-hidden rounded-[1.8rem] border-white/65 bg-white/84 p-0 shadow-[0_18px_50px_rgba(31,90,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(31,90,42,0.12)]"
                    >
                      <div className={`h-44 bg-gradient-to-br ${item.tone} p-6`}>
                        <div className="flex h-full items-end justify-between">
                          <div>
                            <p className="chip bg-white/80">Product</p>
                            <h3 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-slate-900">{item.title}</h3>
                          </div>
                          <div className="rounded-[1.4rem] bg-white/85 p-3 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
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
            </div>

            <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.62),rgba(255,255,255,0.3))] p-6 shadow-[0_28px_90px_rgba(31,90,42,0.08)] ring-1 ring-white/40 backdrop-blur-sm sm:p-8 lg:p-10">
              <SectionHeading
                eyebrow="Quick Services"
                title="Built for the decisions farmers make every season"
                body="The first experience is intentionally simple so visitors can call, compare, or submit a lead without friction."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {serviceHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="panel rounded-[1.6rem] border-white/65 bg-white/82 p-5 shadow-[0_16px_45px_rgba(31,90,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(31,90,42,0.1)]"
                  >
                    <p className="text-lg font-semibold tracking-[-0.02em] text-slate-900">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band pt-4">
        <div className="page-wrap grid gap-8 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0.3))] p-6 shadow-[0_28px_90px_rgba(31,90,42,0.08)] ring-1 ring-white/40 backdrop-blur-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="pt-1">
            <SectionHeading
              eyebrow={t("home.whyTitle")}
              title="A local experience that feels direct and trustworthy"
              body="The website is shaped around speed, clear choices, and lead capture that does not collapse when traffic spikes."
            />
          </div>
          <div className="space-y-4">
            {t("home.why", { returnObjects: true }).map((point) => (
              <div
                key={point}
                className="panel flex gap-4 rounded-[1.5rem] border-white/65 bg-white/82 p-5 shadow-[0_16px_42px_rgba(31,90,42,0.07)]"
              >
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
