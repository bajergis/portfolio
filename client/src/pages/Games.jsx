import { useState } from 'react';
import useFetch from '../components/useFetch';
import PageHero from '../components/PageHero';

function ProjectSection({ data, type }) {
  const [lightbox, setLightbox] = useState(null);

  if (!data) return null;

  const isThesis = type === 'thesis';

  return (
    <section className="page-section" style={{ borderBottom: '1px solid var(--gray-200)' }}>
      <div className="container">
        <span className="eyebrow">{isThesis ? 'Thesis Project' : 'Semester Project'}</span>
        <h2 className="section-title">{data.title}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
          {data.subtitle} — {data.year}
        </p>

        {/* CTAs */}
        <div className="project-cta">
          {isThesis ? (
            <>
              {data.githubDemoExplore && (
                <a href={data.githubDemoExplore} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                  ↗ Play Demo — Explore Mode
                </a>
              )}
              {data.githubDemoVN && (
                <a href={data.githubDemoVN} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  ↗ Play Demo — VN Mode
                </a>
              )}
            </>
          ) : (
            <>
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                ↗ Play the Game
              </a>
              {data.scriptFile && (
                <a href={data.scriptFile} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  ↗ Read the Script
                </a>
              )}
            </>
          )}
        </div>

        {/* Description + tools */}
        <div className="project-body">
          <div className="project-description">
            <p style={{ whiteSpace: 'pre-line', color: 'var(--gray-600)', fontSize: '1.05rem' }}>
              {data.description}
            </p>
          </div>
          <aside className="project-aside">
            <span className="eyebrow">Built With</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.tools.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </aside>
        </div>

        {/* Demo video (thesis only) */}
        {isThesis && data.demoVideo && (
          <div className="project-video-wrap mt-4">
            <span className="eyebrow">Demo Video</span>
            <video controls className="project-video">
              <source src={data.demoVideo} type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>
        )}

        {/* Screenshots */}
        {data.screenshots?.length > 0 && (
          <div className="mt-4">
            <span className="eyebrow">Screenshots</span>
            <div className="screenshot-grid mt-2">
              {data.screenshots.map((s, i) => (
                <figure key={i} className="screenshot-item" onClick={() => setLightbox(s.src)} style={{ cursor: 'zoom-in' }}>
                  {s.src
                    ? <img src={s.src} alt={s.caption} loading="lazy" />
                    : <div className="screenshot-placeholder">{s.caption}</div>
                  }
                  <figcaption>{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Sprites */}
        {data.sprites?.length > 0 && (
          <div className="mt-4">
            <span className="eyebrow">Character Sprites</span>
            {isThesis ? (
              <div className="sprite-grid mt-2">
                {data.sprites.map((s, i) => {
                  const isFar = s.name?.toLowerCase().includes('far');
                  return (
                    <div key={i} className={`sprite-item${isFar ? ' sprite-far' : ''}`}>
                      {s.src
                        ? <img src={s.src} alt={s.name} loading="lazy" />
                        : <div className="sprite-placeholder">{s.name}</div>
                      }
                      <span>{s.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="sprite-strip mt-2">
                {data.sprites.map((s, i) => (
                  <div key={i} className="sprite-item">
                    {s.src
                      ? <img src={s.src} alt={s.name} loading="lazy" />
                      : <div className="sprite-placeholder">{s.name}</div>
                    }
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Flowchart */}
        {!isThesis && data.flowchart?.length > 0 && (
          <div className="mt-4">
            <span className="eyebrow">Flowchart</span>
            <div className="flowchart-strip mt-2">
              {data.flowchart.map((f, i) => (
                <figure key={i} className="flowchart-item" onClick={() => setLightbox(f.src)} style={{ cursor: 'zoom-in' }}>
                  <img src={f.src} alt={f.name} loading="lazy" />
                  <figcaption>{f.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Screenshot" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

export default function Games() {
  const { data: thesis, loading: tLoading } = useFetch('/api/thesis');
  const { data: semester, loading: sLoading } = useFetch('/api/semester');

  return (
    <>
      <PageHero
        eyebrow="Interactive Work"
        title="Visual Novels & Games"
        subtitle="Original interactive narratives — written, illustrated, and built from scratch."
      />

      {(tLoading || sLoading) && (
        <div className="container page-section">
          <p className="text-muted">Loading…</p>
        </div>
      )}

      <ProjectSection data={thesis} type="thesis" />
      <ProjectSection data={semester} type="semester" />
    </>
  );
}