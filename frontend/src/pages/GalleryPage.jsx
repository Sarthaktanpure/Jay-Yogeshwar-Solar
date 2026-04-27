import { useEffect, useState } from "react";
import { MessageSquare, PlayCircle, Send, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { galleryItems } from "../data/siteContent";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

function renderVideo(url) {
  if (!url) {
    return null;
  }

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return <iframe className="h-full w-full" src={url} title="Project video" allowFullScreen />;
  }

  return <video className="h-full w-full object-cover" src={url} controls playsInline />;
}

function GalleryPage() {
  const { isAuthenticated, user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState([]);
  const [forms, setForms] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({});

  async function loadData() {
    setLoading(true);

    try {
      const [{ data: projectData }, { data: commentData }] = await Promise.all([
        api.get("/projects"),
        api.get("/comments"),
      ]);
      setProjects(projectData);
      setComments(commentData);
    } catch {
      setProjects([]);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCommentSubmit(event, projectId) {
    event.preventDefault();
    const text = forms[projectId]?.trim();
    if (!text) {
      return;
    }

    setStatus((current) => ({ ...current, [projectId]: "sending" }));

    try {
      const { data } = await api.post("/comments", { projectId, text });
      setComments((current) => [data, ...current]);
      setForms((current) => ({ ...current, [projectId]: "" }));
      setStatus((current) => ({ ...current, [projectId]: "sent" }));
    } catch {
      setStatus((current) => ({ ...current, [projectId]: "error" }));
    }
  }

  const hasProjects = projects.length > 0;

  return (
    <section className="section-band">
      <div className="page-wrap space-y-8">
        <SectionHeading
          eyebrow="Project Gallery"
          title="Site videos, project records, and farmer feedback in one place"
          body="Visitors can browse completed work, while signed-in users can leave comments below each project video."
        />

        {loading ? <div className="panel-strong p-6 text-center text-slate-600">Loading project gallery...</div> : null}

        {hasProjects ? (
          <div className="grid gap-6">
            {projects.map((project) => {
              const projectComments = comments.filter((comment) => comment.projectId === String(project._id));
              const primaryVideo = project.videos?.[0]?.url;

              return (
                <article key={project._id} className="panel-strong overflow-hidden">
                  <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="min-h-[280px] bg-slate-900">
                      {primaryVideo ? (
                        renderVideo(primaryVideo)
                      ) : (
                        <div className="flex h-full min-h-[280px] items-center justify-center text-slate-200">
                          <div className="text-center">
                            <PlayCircle className="mx-auto h-12 w-12 text-yellow-300" />
                            <p className="mt-3 text-sm">Video will appear here after admin upload.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-5 p-5 sm:p-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="chip">{project.category}</span>
                        {project.status ? <span className="chip bg-yellow-100 text-yellow-900">{project.status}</span> : null}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{project.description || "Project details coming soon."}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-[#f5f8ec] p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{project.location || "Shared on request"}</p>
                        </div>
                        <div className="rounded-2xl bg-[#f5f8ec] p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Capacity</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{project.capacityKw ? `${project.capacityKw} kW` : "Configured per site"}</p>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white p-4">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-green-700" />
                          <p className="text-sm font-semibold text-slate-900">Farmer comments</p>
                        </div>

                        <div className="mt-4 space-y-3">
                          {projectComments.length ? (
                            projectComments.map((comment) => (
                              <div key={comment._id} className="rounded-2xl border border-green-900/10 bg-[#fbfcf7] p-4">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="text-sm font-semibold text-slate-900">{comment.userName}</p>
                                  <p className="text-xs text-slate-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                </div>
                                <p className="mt-2 text-sm leading-7 text-slate-600">{comment.text}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-slate-500">No comments yet for this project.</p>
                          )}
                        </div>

                        {isAuthenticated ? (
                          <form className="mt-4 space-y-3" onSubmit={(event) => handleCommentSubmit(event, String(project._id))}>
                            <textarea
                              className="input-field min-h-[110px]"
                              placeholder={`Share your feedback${user?.name ? `, ${user.name}` : ""}`}
                              value={forms[String(project._id)] || ""}
                              onChange={(event) =>
                                setForms((current) => ({ ...current, [String(project._id)]: event.target.value }))
                              }
                              required
                            />
                            <button type="submit" className="action-primary">
                              <Send className="h-4 w-4" />
                              Post comment
                            </button>
                            {status[String(project._id)] === "error" ? (
                              <p className="text-sm text-red-700">Comment could not be posted right now.</p>
                            ) : null}
                          </form>
                        ) : (
                          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-amber-900">
                            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
                            <p className="text-sm leading-7">
                              Please <Link to="/auth" className="font-semibold underline">login or sign up</Link> to comment on project videos.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : !loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item) => (
              <div key={item.title} className={`min-h-[240px] rounded-2xl bg-gradient-to-br ${item.tone} p-5 text-slate-900 shadow-lg`}>
                <span className="chip bg-white/60 text-slate-900">{item.tag}</span>
                <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
                <p className="mt-2 max-w-[18rem] text-sm text-slate-800">
                  Add the first real site record from the admin dashboard and it will replace these placeholders.
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default GalleryPage;
