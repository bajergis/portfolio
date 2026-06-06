import { useState } from 'react';
import useFetch from '../components/useFetch';
import PageHero from '../components/PageHero';

function Lightbox({ src, alt, onClose }) {
  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>
      <img src={src} alt={alt} onClick={e => e.stopPropagation()} />
    </div>
  );
}

// Placeholder shown when no real image is supplied
function ArtPlaceholder({ title, medium }) {
  return (
    <div className="art-placeholder">
      <span className="art-placeholder-label">{title}</span>
      <span className="art-placeholder-medium">{medium}</span>
    </div>
  );
}

export default function Art() {
  const { data, loading } = useFetch('/api/art');
  const [lightbox, setLightbox] = useState(null);
  const [view, setView] = useState('samples'); // 'samples' | 'animations'

  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Art Samples"
        subtitle="Selected illustrations, character designs, and animations."
      />

      <section className="page-section">
        <div className="container">
          <div className="tab-bar">
            <button
              className={`tab-btn${view === 'samples' ? ' active' : ''}`}
              onClick={() => setView('samples')}
            >
              Illustrations
            </button>
            <button
              className={`tab-btn${view === 'animations' ? ' active' : ''}`}
              onClick={() => setView('animations')}
            >
              Animations
            </button>
          </div>

          {loading && <p className="text-muted mt-4">Loading…</p>}

          {data && view === 'samples' && (
            <div className="gallery-grid mt-4">
              {data.samples.map(item => (
                <div
                  key={item.id}
                  className="gallery-item"
                  onClick={() => setLightbox(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.title}`}
                  onKeyDown={e => e.key === 'Enter' && setLightbox(item)}
                >
                  {item.thumb
                    ? <img src={item.thumb} alt={item.title} loading="lazy" />
                    : <ArtPlaceholder title={item.title} medium={item.medium} />
                  }
                  <div className="gallery-caption">
                    <strong style={{ fontSize: '0.9rem' }}>{item.title}</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.8 }}>{item.medium} · {item.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data && view === 'animations' && (
            <div className="anim-grid mt-4">
              {data.animations.map(item => (
                <div key={item.id} className="anim-item">
                  {item.src
                    ? <img src={item.src} alt={item.title} />
                    : <ArtPlaceholder title={item.title} medium={item.medium} />
                  }
                  <div className="anim-meta">
                    <span className="anim-title">{item.title}</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>{item.medium} · {item.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          src={lightbox.src || lightbox.thumb}
          alt={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}