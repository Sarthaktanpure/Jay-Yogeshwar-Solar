import { LogIn, LogOut, Menu, Phone, Shield, SunMedium, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageToggle from "./LanguageToggle";

const links = [
  { to: "/", key: "home" },
  { to: "/solutions", key: "solutions" },
  { to: "/estimator", key: "estimator" },
  { to: "/trends", key: "trends" },
  { to: "/gallery", key: "gallery" },
  { to: "/contact", key: "contact" },
];

function Navbar() {
  const { t } = useTranslation();
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [...links];
  if (isAdmin) {
    navItems.push({ to: "/admin", key: "admin", label: "Admin" });
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    [
      "rounded-full px-3 py-2 text-sm font-semibold transition duration-200",
      isActive
        ? "bg-green-900 text-white shadow-[0_12px_30px_rgba(31,90,42,0.22)]"
        : "text-slate-700 hover:bg-white/80 hover:text-green-800",
    ].join(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#fcfaf1]/85 backdrop-blur-xl supports-[backdrop-filter]:bg-[#fcfaf1]/78">
      <div className="page-wrap">
        <div className="flex min-h-[74px] items-center justify-between gap-3 py-3">
          <Link to="/" className="min-w-0 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-500 text-slate-900 shadow-[0_14px_34px_rgba(228,176,33,0.26)]">
              <SunMedium className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold leading-tight text-slate-900 sm:text-[15px]">
                {t("brand")}
              </div>
              <div className="hidden text-xs font-medium text-slate-500 md:block">
                Solar solutions for farms, homes, and business sites
              </div>
            </div>
          </Link>

          <nav className="hidden items-center rounded-full border border-white/70 bg-white/65 p-1 shadow-[0_12px_34px_rgba(31,90,42,0.08)] lg:flex">
            {navItems.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label || t(`nav.${link.key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/72 px-3 py-2 text-sm font-medium text-slate-700 xl:flex">
                <User className="h-4 w-4 text-green-700" />
                <span className="max-w-[140px] truncate">{user.name}</span>
              </div>
            ) : null}

            <div className="hidden md:block">
              <LanguageToggle />
            </div>

            {user ? (
              <button type="button" onClick={logout} className="action-secondary hidden min-[1180px]:inline-flex">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link to="/auth" className="action-secondary hidden min-[1180px]:inline-flex">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}

            <a
              href="tel:+919921390121"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-green-900 px-3 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(31,90,42,0.24)] transition hover:bg-green-800 sm:px-4 lg:h-12 lg:px-5"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{t("cta.call")}</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-green-900/10 bg-white/82 text-slate-700 shadow-[0_12px_28px_rgba(31,90,42,0.1)] transition hover:bg-white lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {menuOpen ? (
        <div id="mobile-navigation" className="page-wrap pb-4 lg:hidden">
          <div className="panel overflow-hidden rounded-[1.75rem] border-white/70 bg-white/88 p-3 shadow-[0_20px_60px_rgba(31,90,42,0.12)]">
            <div className="mb-2 flex items-center justify-between gap-3 rounded-2xl bg-[#f6f2e1] px-4 py-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900">Quick access</div>
                <div className="truncate text-xs text-slate-500">{user ? user.name : t("brand")}</div>
              </div>
              <div className="shrink-0 sm:hidden">
                <LanguageToggle />
              </div>
            </div>

            <div className="grid gap-1.5">
              {navItems.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    [
                      "block rounded-2xl px-4 py-3 text-sm font-semibold transition",
                      isActive ? "bg-green-900 text-white" : "text-slate-700 hover:bg-[#f6f2e1]",
                    ].join(" ")
                  }
                >
                  {link.label || t(`nav.${link.key}`)}
                </NavLink>
              ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f6f2e1]"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f6f2e1]"
                >
                  <Shield className="h-4 w-4" />
                  Login / Sign Up
                </Link>
              )}

              <a
                href="tel:+919921390121"
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-green-900 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(31,90,42,0.2)]"
              >
                <Phone className="h-4 w-4" />
                {t("cta.call")}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
