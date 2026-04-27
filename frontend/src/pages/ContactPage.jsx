import { useState } from "react";
import { Phone, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import { contactDetails } from "../data/siteContent";
import api from "../lib/api";

const initialForm = {
  name: "",
  phone: "",
  requirement: "",
};

function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await api.post("/leads", form);
      setForm(initialForm);
      setStatus({ type: "success", message: t("contact.success") });
    } catch (error) {
      setStatus({ type: "warning", message: t("contact.fallback") });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-band">
      <div className="page-wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Contact"
          title={t("contact.title")}
          body="Fast action buttons stay visible, while the lead form collects the details your admin dashboard needs."
        />
        <div className="panel-strong p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <a href={`tel:${contactDetails.phone}`} className="panel flex items-center gap-3 p-4">
              <Phone className="h-5 w-5 text-green-700" />
              <div>
                <p className="text-sm text-slate-500">Call</p>
                <p className="font-semibold text-slate-900">{contactDetails.phone}</p>
              </div>
            </a>
            <a href={`mailto:${contactDetails.email}`} className="panel flex items-center gap-3 p-4">
              <Send className="h-5 w-5 text-green-700" />
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold text-slate-900">{contactDetails.email}</p>
              </div>
            </a>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              className="input-field"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              required
            />
            <input
              className="input-field"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))}
              required
            />
            <textarea
              className="input-field min-h-[140px]"
              placeholder="What do you need? Solar pump, rooftop system, subsidy guidance..."
              value={form.requirement}
              onChange={(e) => setForm((current) => ({ ...current, requirement: e.target.value }))}
              required
            />
            <button type="submit" className="action-primary w-full" disabled={submitting}>
              {submitting ? "Sending..." : "Send inquiry"}
            </button>
          </form>

          {status.message ? (
            <p
              className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                status.type === "success" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-900"
              }`}
            >
              {status.message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
