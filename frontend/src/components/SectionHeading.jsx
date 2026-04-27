function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="max-w-2xl space-y-3">
      {eyebrow ? <span className="chip">{eyebrow}</span> : null}
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      {body ? <p className="text-base leading-7 text-slate-600">{body}</p> : null}
    </div>
  );
}

export default SectionHeading;
