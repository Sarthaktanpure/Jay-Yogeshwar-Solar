import SectionHeading from "../components/SectionHeading";
import { productBands } from "../data/siteContent";

function SolutionsPage() {
  return (
    <section className="section-band">
      <div className="page-wrap space-y-8">
        <SectionHeading
          eyebrow="Farmer Solutions"
          title="Solar pump options matched to field load and water demand"
          body="These starter packages are arranged around common HP requirements so the sales conversation begins with something practical."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {productBands.map((band) => (
            <div key={band.title} className="panel-strong p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-700">{band.range}</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">{band.title}</h3>
              <div className="mt-4 flex gap-3 text-sm text-slate-600">
                <span className="chip">{band.hp} HP</span>
                <span className="chip">{band.kw} kW</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{band.bestFor}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SolutionsPage;
