import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "hi", label: "HI" },
  { code: "mr", label: "MR" },
];

function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/60 bg-white/80 p-1 shadow-sm">
      {languages.map((language) => {
        const active = i18n.resolvedLanguage === language.code;
        return (
          <button
            key={language.code}
            type="button"
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              active ? "bg-green-700 text-white" : "text-slate-700"
            }`}
            onClick={() => i18n.changeLanguage(language.code)}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageToggle;
