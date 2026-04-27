import { useEffect, useState } from "react";
import { BarChart3, MessageSquare, Plus, Trash2, Users } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import api from "../lib/api";

const initialProjectForm = {
  title: "",
  category: "",
  description: "",
  location: "",
  farmerName: "",
  systemType: "",
  capacityKw: "",
  growthValue: "",
  status: "active",
};

const initialTrendForm = {
  title: "",
  content: "",
  source: "",
};

function AdminPage() {
  const [overview, setOverview] = useState(null);
  const [projects, setProjects] = useState([]);
  const [trends, setTrends] = useState([]);
  const [comments, setComments] = useState([]);
  const [leads, setLeads] = useState([]);
  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [trendForm, setTrendForm] = useState(initialTrendForm);
  const [projectFiles, setProjectFiles] = useState({ image: null, video: null });
  const [savingProject, setSavingProject] = useState(false);
  const [savingTrend, setSavingTrend] = useState(false);
  const [message, setMessage] = useState("");

  async function loadAdminData() {
    const [
      { data: overviewData },
      { data: projectData },
      { data: trendData },
      { data: commentData },
      { data: leadData },
    ] = await Promise.all([
      api.get("/admin/overview"),
      api.get("/projects"),
      api.get("/trends"),
      api.get("/comments"),
      api.get("/leads"),
    ]);

    setOverview(overviewData);
    setProjects(projectData);
    setTrends(trendData);
    setComments(commentData);
    setLeads(leadData);
  }

  useEffect(() => {
    loadAdminData().catch(() => setMessage("Admin data could not be loaded right now."));
  }, []);

  async function handleProjectSubmit(event) {
    event.preventDefault();
    setSavingProject(true);
    setMessage("");

    try {
      const payload = new FormData();
      payload.append("title", projectForm.title);
      payload.append("category", projectForm.category);
      payload.append("description", projectForm.description);
      payload.append("location", projectForm.location);
      payload.append("farmerName", projectForm.farmerName);
      payload.append("systemType", projectForm.systemType);
      payload.append("capacityKw", String(Number(projectForm.capacityKw || 0)));
      payload.append("growthValue", String(Number(projectForm.growthValue || 0)));
      payload.append("status", projectForm.status);

      if (projectFiles.image) {
        payload.append("image", projectFiles.image);
      }

      if (projectFiles.video) {
        payload.append("video", projectFiles.video);
      }

      await api.post("/projects", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProjectForm(initialProjectForm);
      setProjectFiles({ image: null, video: null });
      event.target.reset();
      await loadAdminData();
      setMessage("Project site added successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Project could not be saved.");
    } finally {
      setSavingProject(false);
    }
  }

  async function handleTrendSubmit(event) {
    event.preventDefault();
    setSavingTrend(true);
    setMessage("");

    try {
      await api.post("/trends", trendForm);
      setTrendForm(initialTrendForm);
      await loadAdminData();
      setMessage("Market record added successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Trend could not be saved.");
    } finally {
      setSavingTrend(false);
    }
  }

  async function removeComment(id) {
    try {
      await api.delete(`/comments/${id}`);
      await loadAdminData();
      setMessage("Comment removed.");
    } catch {
      setMessage("Comment could not be removed.");
    }
  }

  async function removeProject(id) {
    try {
      await api.delete(`/projects/${id}`);
      await loadAdminData();
      setMessage("Project removed.");
    } catch {
      setMessage("Project could not be removed.");
    }
  }

  const metricCards = overview
    ? [
        { label: "Users", value: overview.metrics.totalUsers, icon: Users },
        { label: "Projects", value: overview.metrics.totalProjects, icon: BarChart3 },
        { label: "Comments", value: overview.metrics.totalComments, icon: MessageSquare },
        { label: "Market growth", value: `${overview.metrics.marketGrowth}%`, icon: Plus },
      ]
    : [];

  return (
    <section className="section-band">
      <div className="page-wrap space-y-8">
        <SectionHeading
          eyebrow="Sensitive Dashboard"
          title="Manage project videos, farmer comments, leads, and growth signals from one protected route"
          body="This workspace is available only for the approved admin email addresses."
        />

        {message ? <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-900">{message}</div> : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="panel p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <Icon className="h-5 w-5 text-green-700" />
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <form className="panel-strong p-6" onSubmit={handleProjectSubmit}>
            <h3 className="text-xl font-bold text-slate-900">Add project site</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input className="input-field" placeholder="Project title" value={projectForm.title} onChange={(event) => setProjectForm((current) => ({ ...current, title: event.target.value }))} required />
              <input className="input-field" placeholder="Category" value={projectForm.category} onChange={(event) => setProjectForm((current) => ({ ...current, category: event.target.value }))} required />
              <input className="input-field" placeholder="Farmer name" value={projectForm.farmerName} onChange={(event) => setProjectForm((current) => ({ ...current, farmerName: event.target.value }))} />
              <input className="input-field" placeholder="Location" value={projectForm.location} onChange={(event) => setProjectForm((current) => ({ ...current, location: event.target.value }))} />
              <input className="input-field" placeholder="System type" value={projectForm.systemType} onChange={(event) => setProjectForm((current) => ({ ...current, systemType: event.target.value }))} />
              <input className="input-field" type="number" min="0" step="0.1" placeholder="Capacity kW" value={projectForm.capacityKw} onChange={(event) => setProjectForm((current) => ({ ...current, capacityKw: event.target.value }))} />
              <input className="input-field" type="number" min="0" step="1" placeholder="Growth value" value={projectForm.growthValue} onChange={(event) => setProjectForm((current) => ({ ...current, growthValue: event.target.value }))} />
              <input className="input-field" placeholder="Status" value={projectForm.status} onChange={(event) => setProjectForm((current) => ({ ...current, status: event.target.value }))} />
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-slate-700">Project image</span>
                <input
                  className="input-field"
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setProjectFiles((current) => ({ ...current, image: event.target.files?.[0] || null }))
                  }
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-slate-700">Project video</span>
                <input
                  className="input-field"
                  type="file"
                  accept="video/*"
                  onChange={(event) =>
                    setProjectFiles((current) => ({ ...current, video: event.target.files?.[0] || null }))
                  }
                />
              </label>
              <textarea className="input-field min-h-[140px] sm:col-span-2" placeholder="Project description" value={projectForm.description} onChange={(event) => setProjectForm((current) => ({ ...current, description: event.target.value }))} />
            </div>
            <button type="submit" className="action-primary mt-5" disabled={savingProject}>
              {savingProject ? "Saving..." : "Add project"}
            </button>
          </form>

          <form className="panel-strong p-6" onSubmit={handleTrendSubmit}>
            <h3 className="text-xl font-bold text-slate-900">Add market record</h3>
            <div className="mt-5 space-y-4">
              <input className="input-field" placeholder="Trend title" value={trendForm.title} onChange={(event) => setTrendForm((current) => ({ ...current, title: event.target.value }))} required />
              <input className="input-field" placeholder="Source" value={trendForm.source} onChange={(event) => setTrendForm((current) => ({ ...current, source: event.target.value }))} />
              <textarea className="input-field min-h-[200px]" placeholder="Market note or growth update" value={trendForm.content} onChange={(event) => setTrendForm((current) => ({ ...current, content: event.target.value }))} required />
            </div>
            <button type="submit" className="action-primary mt-5" disabled={savingTrend}>
              {savingTrend ? "Saving..." : "Add record"}
            </button>
          </form>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="panel-strong p-6">
            <h3 className="text-xl font-bold text-slate-900">Project sites</h3>
            <div className="mt-5 space-y-4">
              {projects.map((project) => (
                <div key={project._id} className="rounded-2xl border border-green-900/10 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{project.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{project.location || "Location not set"}</p>
                    </div>
                    <button type="button" onClick={() => removeProject(project._id)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{project.description || "No description yet."}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-strong p-6">
            <h3 className="text-xl font-bold text-slate-900">Farmer comments</h3>
            <div className="mt-5 space-y-4">
              {comments.length ? (
                comments.map((comment) => (
                  <div key={comment._id} className="rounded-2xl border border-green-900/10 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{comment.userName}</p>
                        <p className="text-xs text-slate-500">{comment.userEmail}</p>
                      </div>
                      <button type="button" onClick={() => removeComment(comment._id)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No comments to moderate yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="panel-strong p-6">
            <h3 className="text-xl font-bold text-slate-900">Latest leads</h3>
            <div className="mt-5 space-y-3">
              {leads.length ? (
                leads.map((lead) => (
                  <div key={lead._id} className="rounded-2xl border border-green-900/10 bg-white p-4">
                    <p className="font-semibold text-slate-900">{lead.name}</p>
                    <p className="text-sm text-slate-600">{lead.phone}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{lead.requirement}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No leads yet.</p>
              )}
            </div>
          </div>

          <div className="panel-strong p-6">
            <h3 className="text-xl font-bold text-slate-900">Market growth notes</h3>
            <div className="mt-5 space-y-4">
              {trends.length ? (
                trends.map((trend) => (
                  <div key={trend._id} className="rounded-2xl border border-green-900/10 bg-white p-4">
                    <p className="font-semibold text-slate-900">{trend.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{trend.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No growth records yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPage;
