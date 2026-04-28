import { LogIn, LogOut, Menu, Phone, Shield, SunMedium, User } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [...links];
  if (isAdmin) {
    navItems.push({ to: "/admin", key: "admin", label: "Admin" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-[#fcfaf1]/90 backdrop-blur">
      <div className="page-wrap flex min-h-[76px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-500 text-slate-900 shadow-md">
            <SunMedium className="h-6 w-6" />
          </div>
          <div className="max-w-[220px] text-sm font-semibold leading-tight text-slate-900 sm:max-w-none">
            {t("brand")}
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? "text-green-800" : "text-slate-700 hover:text-green-800"
                }`
              }
            >
              {link.label || t(`nav.${link.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 md:flex">
              <User className="h-4 w-4 text-green-700" />
              <span className="max-w-[160px] truncate">{user.name}</span>
            </div>
          ) : null}
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          {user ? (
            <button type="button" onClick={logout} className="action-secondary hidden md:inline-flex">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <Link to="/auth" className="action-secondary hidden md:inline-flex">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
          <a href="tel:+919921390121" className="action-primary hidden md:inline-flex">
            <Phone className="h-4 w-4" />
            {t("cta.call")}
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-green-900/10 bg-white/80 text-slate-700 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="page-wrap pb-4 lg:hidden">
          <div className="panel space-y-2 p-3">
            {navItems.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive ? "bg-green-50 text-green-800" : "text-slate-700"
                  }`
                }
              >
                {link.label || t(`nav.${link.key}`)}
              </NavLink>
            ))}
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link to="/auth" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700">
                <Shield className="h-4 w-4" />
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      ) : null}
      <div className="page-wrap pb-3 sm:hidden">
        <LanguageToggle />
      </div>
    </header>
  );
}

export default Navbar;
