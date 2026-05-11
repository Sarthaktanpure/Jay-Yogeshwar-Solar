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

const initialShowcaseForm = {
  title: "",
  subtitle: "",
};

const initialDailyPostForm = {
  title: "",
  subtitle: "",
  kind: "offer",
};

function AdminPage() {
  const [overview, setOverview] = useState(null);
  const [projects, setProjects] = useState([]);
  const [dailyPosts, setDailyPosts] = useState([]);
  const [showcases, setShowcases] = useState([]);
  const [trends, setTrends] = useState([]);
  const [comments, setComments] = useState([]);
  const [leads, setLeads] = useState([]);
  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [trendForm, setTrendForm] = useState(initialTrendForm);
  const [showcaseForm, setShowcaseForm] = useState(initialShowcaseForm);
  const [dailyPostForm, setDailyPostForm] = useState(initialDailyPostForm);
  const [projectFiles, setProjectFiles] = useState({ image: null, video: null });
  const [showcaseFile, setShowcaseFile] = useState(null);
  const [dailyPostFile, setDailyPostFile] = useState(null);
  const [savingProject, setSavingProject] = useState(false);
  const [savingTrend, setSavingTrend] = useState(false);
  const [savingShowcase, setSavingShowcase] = useState(false);
  const [savingDailyPost, setSavingDailyPost] = useState(false);
  const [message, setMessage] = useState("");

  async function loadAdminData() {
    const [
      { data: overviewData },
      { data: projectData },
      { data: dailyPostData },
      { data: showcaseData },
      { data: trendData },
      { data: commentData },
      { data: leadData },
    ] = await Promise.all([
      api.get("/admin/overview"),
      api.get("/projects"),
      api.get("/daily-posts"),
      api.get("/home-showcases"),
      api.get("/trends"),
      api.get("/comments"),
      api.get("/leads"),
    ]);

    setOverview(overviewData);
    setProjects(projectData);
    setDailyPosts(dailyPostData);
    setShowcases(showcaseData);
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

  async function handleShowcaseSubmit(event) {
    event.preventDefault();
    if (!showcaseFile) {
      setMessage("Please choose an image for the home scrolling section.");
      return;
    }

    setSavingShowcase(true);
    setMessage("");

    try {
      const payload = new FormData();
      payload.append("title", showcaseForm.title);
      payload.append("subtitle", showcaseForm.subtitle);
      payload.append("image", showcaseFile);

      await api.post("/home-showcases", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowcaseForm(initialShowcaseForm);
      setShowcaseFile(null);
      event.target.reset();
      await loadAdminData();
      setMessage("Home showcase image added successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Home showcase image could not be saved.");
    } finally {
      setSavingShowcase(false);
    }
  }

  async function handleDailyPostSubmit(event) {
    event.preventDefault();
    if (!dailyPostFile) {
      setMessage("Please choose an image for the daily posts section.");
      return;
    }

    setSavingDailyPost(true);
    setMessage("");

    try {
      const payload = new FormData();
      payload.append("title", dailyPostForm.title);
      payload.append("subtitle", dailyPostForm.subtitle);
      payload.append("kind", dailyPostForm.kind);
      payload.append("image", dailyPostFile);

      await api.post("/daily-posts", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setDailyPostForm(initialDailyPostForm);
      setDailyPostFile(null);
      event.target.reset();
      await loadAdminData();
      setMessage("Daily post added successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Daily post could not be saved.");
    } finally {
      setSavingDailyPost(false);
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

  async function removeShowcase(id) {
    try {
      await api.delete(`/home-showcases/${id}`);
      await loadAdminData();
      setMessage("Home showcase image removed.");
    } catch {
      setMessage("Home showcase image could not be removed.");
    }
  }

  async function removeDailyPost(id) {
    try {
      await api.delete(`/daily-posts/${id}`);
      await loadAdminData();
      setMessage("Daily post removed.");
    } catch {
      setMessage("Daily post could not be removed.");
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

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form className="panel-strong p-6" onSubmit={handleDailyPostSubmit}>
            <h3 className="text-xl font-bold text-slate-900">Daily posts for home page</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Upload daily offer posters, event images, notices, or solar updates from the admin route.
            </p>
            <div className="mt-5 space-y-4">
              <input
                className="input-field"
                placeholder="Post title"
                value={dailyPostForm.title}
                onChange={(event) => setDailyPostForm((current) => ({ ...current, title: event.target.value }))}
              />
              <input
                className="input-field"
                placeholder="Short description"
                value={dailyPostForm.subtitle}
                onChange={(event) => setDailyPostForm((current) => ({ ...current, subtitle: event.target.value }))}
              />
              <select
                className="input-field"
                value={dailyPostForm.kind}
                onChange={(event) => setDailyPostForm((current) => ({ ...current, kind: event.target.value }))}
              >
                <option value="offer">Today&apos;s offer</option>
                <option value="event">Event</option>
                <option value="notice">Notice</option>
                <option value="update">Solar update</option>
              </select>
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Daily post image</span>
                <input
                  className="input-field"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setDailyPostFile(event.target.files?.[0] || null)}
                  required
                />
              </label>
            </div>
            <button type="submit" className="action-primary mt-5" disabled={savingDailyPost}>
              {savingDailyPost ? "Saving..." : "Add daily post"}
            </button>
          </form>

          <div className="panel-strong p-6">
            <h3 className="text-xl font-bold text-slate-900">Current daily posts</h3>
            <div className="mt-5 space-y-4">
              {dailyPosts.length ? (
                dailyPosts.map((post) => (
                  <div key={post._id} className="rounded-2xl border border-green-900/10 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-lg font-semibold text-slate-900">{post.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{post.subtitle || "Home page daily post"}</p>
                        <p className="mt-2 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-800">
                          {post.kind || "notice"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDailyPost(post._id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {post.image?.url ? (
                      <img
                        src={post.image.url}
                        alt={post.title}
                        className="mt-4 h-40 w-full rounded-2xl object-cover"
                      />
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No daily posts added yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <form className="panel-strong p-6" onSubmit={handleShowcaseSubmit}>
            <h3 className="text-xl font-bold text-slate-900">Home scrolling gallery</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Add images here to show them continuously on the home page.
            </p>
            <div className="mt-5 space-y-4">
              <input
                className="input-field"
                placeholder="Image title"
                value={showcaseForm.title}
                onChange={(event) => setShowcaseForm((current) => ({ ...current, title: event.target.value }))}
              />
              <input
                className="input-field"
                placeholder="Short subtitle"
                value={showcaseForm.subtitle}
                onChange={(event) => setShowcaseForm((current) => ({ ...current, subtitle: event.target.value }))}
              />
              <label>
                <span className="mb-2 block text-sm font-medium text-slate-700">Showcase image</span>
                <input
                  className="input-field"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setShowcaseFile(event.target.files?.[0] || null)}
                  required
                />
              </label>
            </div>
            <button type="submit" className="action-primary mt-5" disabled={savingShowcase}>
              {savingShowcase ? "Saving..." : "Add home image"}
            </button>
          </form>

          <div className="panel-strong p-6">
            <h3 className="text-xl font-bold text-slate-900">Current home images</h3>
            <div className="mt-5 space-y-4">
              {showcases.length ? (
                showcases.map((showcase) => (
                  <div key={showcase._id} className="rounded-2xl border border-green-900/10 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-lg font-semibold text-slate-900">{showcase.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{showcase.subtitle || "Home page scrolling image"}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeShowcase(showcase._id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {showcase.image?.url ? (
                      <img
                        src={showcase.image.url}
                        alt={showcase.title}
                        className="mt-4 h-40 w-full rounded-2xl object-cover"
                      />
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No home scrolling images added yet.</p>
              )}
            </div>
          </div>
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
