import { Link } from 'react-router-dom';
import useFetch from '../components/useFetch';

const projects = [
  { to: '/writing', label: 'Writing', desc: 'Screenplays, novels, graphic novels & more', eyebrow: '01' },
  { to: '/art', label: 'Art', desc: 'Illustration, character design & animation', eyebrow: '02' },
  { to: '/games', label: 'Games', desc: 'Original interactive narratives — thesis & semester work', eyebrow: '03' },
];

export default function Home() {
  const { data } = useFetch('/api/about');

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="home-hero">
        <div className="container home-hero-inner">
          <div className="home-hero-text">
            <span className="eyebrow">Portfolio</span>
            <h1 className="display home-name">
              {data?.name ?? 'Jason Blackschleger'}
            </h1>
            <p className="home-tagline">{data?.tagline ?? 'Writer · Artist · Visual Storyteller'}</p>
            <div className="divider" />
            <p className="home-intro">
              {data?.intro ?? 'Loading…'}
            </p>
            <div className="home-cta mt-4">
              <Link to="/writing" className="btn btn-primary">View My Work</Link>
              {data?.email && (
                <a href={`mailto:${data.email}`} className="btn btn-outline">Get in Touch</a>
              )}
            </div>
          </div>

          <div className="home-hero-accent" aria-hidden="true">
            <div className="accent-block accent-block-1" />
            <div className="accent-block accent-block-2" />
            <div className="accent-block accent-block-3">
              <span>Writer</span>
            </div>
            <div className="accent-block accent-block-4">
              <span>Artist</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work Index ───────────────────────────────────────── */}
      <section className="page-section home-work">
        <div className="container">
          <div className="home-work-header">
            <h2 className="section-title">Selected Work</h2>
            <p className="text-muted" style={{ maxWidth: '40ch', marginTop: '0.5rem' }}>
              A cross-section of projects across writing, visual art, and interactive narrative.
            </p>
          </div>

          <ul className="home-project-list">
            {projects.map(p => (
              <li key={p.to}>
                <Link to={p.to} className="home-project-item">
                  <span className="home-project-num">{p.eyebrow}</span>
                  <div className="home-project-info">
                    <span className="home-project-title">{p.label}</span>
                    <span className="home-project-desc text-muted">{p.desc}</span>
                  </div>
                  <span className="home-project-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Tools strip ──────────────────────────────────────── */}
      <section className="home-tools">
        <div className="container">
          <span className="eyebrow">Tools & Software</span>
          <div className="tools-strip">
            {['Fade In', 'Clip Studio Paint', 'Adobe Photoshop', 'Illustrator', 'Premiere Pro',
              'Ren\'Py', 'Unity'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
