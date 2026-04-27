import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import { trendCards } from "../data/siteContent";
import api from "../lib/api";

function TrendsPage() {
  const [trends, setTrends] = useState(trendCards);

  useEffect(() => {
    async function loadTrends() {
      try {
        const { data } = await api.get("/trends");
        if (Array.isArray(data) && data.length) {
          setTrends(
            data.map((item) => ({
              title: item.title,
              body: item.content,
              source: item.source || "Market update",
            })),
          );
        }
      } catch {
        setTrends(trendCards);
      }
    }

    loadTrends();
  }, []);

  return (
    <section className="section-band">
      <div className="page-wrap space-y-8">
        <SectionHeading
          eyebrow="Solar Trends"
          title="Timely updates your sales team can actually use"
          body="The full API-backed trends flow can plug into the backend route later. For now the page is structured around the exact content model you planned."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {trends.map((card) => (
            <article key={card.title} className="panel p-6">
              <p className="text-sm font-semibold text-green-700">{card.source}</p>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendsPage;
