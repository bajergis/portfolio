
export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-sub text-muted">{subtitle}</p>}
        <div className="divider" />
      </div>
    </section>
  );
}
