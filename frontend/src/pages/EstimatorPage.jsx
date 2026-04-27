import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";

const baseRates = {
  onGrid: 62000,
  hybrid: 84000,
  pump: 71000,
};

function EstimatorPage() {
  const { t } = useTranslation();
  const [systemType, setSystemType] = useState("pump");
  const [hp, setHp] = useState(5);
  const [kw, setKw] = useState(4);

  const estimate = useMemo(() => {
    const base = baseRates[systemType];
    const referenceSize = systemType === "pump" ? hp : kw;
    const subtotal = Math.round(base * Math.max(referenceSize, 1));
    const subsidy = Math.round(subtotal * 0.22);
    const finalBand = {
      low: subtotal - Math.round(subtotal * 0.08) - subsidy,
      high: subtotal + Math.round(subtotal * 0.12) - subsidy,
    };

    return { subtotal, subsidy, finalBand };
  }, [hp, kw, systemType]);

  return (
    <section className="section-band">
      <div className="page-wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Estimator"
          title={t("estimator.title")}
          body={t("estimator.note")}
        />
        <div className="panel-strong p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              System type
              <select className="input-field" value={systemType} onChange={(e) => setSystemType(e.target.value)}>
                <option value="pump">Solar pump</option>
                <option value="onGrid">On-grid rooftop</option>
                <option value="hybrid">Hybrid backup</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Motor HP
              <input
                className="input-field"
                type="number"
                min="1"
                max="20"
                value={hp}
                onChange={(e) => setHp(Number(e.target.value))}
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Solar capacity (kW)
              <input
                className="input-field"
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={kw}
                onChange={(e) => setKw(Number(e.target.value))}
              />
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>1 kW</span>
                <span className="font-semibold text-slate-900">{kw} kW</span>
                <span>20 kW</span>
              </div>
            </label>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="panel p-4">
              <p className="text-sm text-slate-500">Base estimate</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">Rs. {estimate.subtotal.toLocaleString("en-IN")}</p>
            </div>
            <div className="panel p-4">
              <p className="text-sm text-slate-500">Indicative subsidy</p>
              <p className="mt-2 text-2xl font-bold text-green-800">Rs. {estimate.subsidy.toLocaleString("en-IN")}</p>
            </div>
            <div className="panel p-4">
              <p className="text-sm text-slate-500">Expected project band</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Rs. {estimate.finalBand.low.toLocaleString("en-IN")} - {estimate.finalBand.high.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EstimatorPage;
