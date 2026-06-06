import { useState } from 'react';
import useFetch from '../components/useFetch';
import PageHero from '../components/PageHero';

const TABS = [
  { key: 'screenplays', label: 'Screenplays' },
  { key: 'novels', label: 'Novels' },
  { key: 'graphicNovels', label: 'Graphic Novels' },
  { key: 'other', label: 'Other' },
];

function WritingItem({ item, meta }) {
  const [pdfOpen, setPdfOpen] = useState(false);

  return (
    <div className="writing-item-wrap">
      <div className="writing-item">
        <div className="writing-item-main">
          <h3 className="writing-title">{item.title}</h3>
          <p className="text-muted mt-1" style={{ fontSize: '0.95rem' }}>{item.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {meta.map((m, i) => m && <span key={i} className="tag">{m}</span>)}
          </div>
          {item.excerptFile && (
            <div className="flex flex-wrap gap-1 mt-2">
              <button
                className={`btn btn-outline excerpt-download`}
                onClick={() => setPdfOpen(o => !o)}
              >
                {pdfOpen ? '↑ Close Excerpt' : '↓ Read Excerpt'}
              </button>
              <a href={item.excerptFile} download className="btn btn-outline excerpt-download">
                ↓ Download PDF
              </a>
            </div>
          )}
        </div>
      </div>
      {pdfOpen && item.excerptFile && (
        <iframe
          src={`${item.excerptFile}#toolbar=0&navpanes=0`}
          className="excerpt-iframe"
          title={`${item.title} excerpt`}
        />
      )}
    </div>
  );
}

export default function Writing() {
  const { data, loading } = useFetch('/api/writing');
  const [tab, setTab] = useState('screenplays');

  const getItems = () => {
    if (!data) return [];
    switch (tab) {
      case 'screenplays':
        return data.screenplays.map(item => ({
          item,
          meta: [item.genre, `${item.pages}pp`, item.year],
        }));
      case 'novels':
        return data.novels.map(item => ({
          item,
          meta: [item.genre, `${item.wordCount} words`, item.year],
        }));
      case 'graphicNovels':
        return data.graphicNovels.map(item => ({
          item,
          meta: [item.genre, `${item.issues} issues`, item.year],
        }));
      case 'other':
        return (data.other || []).map(item => ({
          item,
          meta: [item.type, item.publication, item.year].filter(Boolean),
        }));
      default:
        return [];
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Writing"
        subtitle="Screenplays, novels, graphic narratives, and selected other writing."
      />

      <section className="page-section">
        <div className="container">
          <div className="tab-bar">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`tab-btn${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {loading && <p className="text-muted mt-4">Loading…</p>}

          {data && (
            <div className="writing-list mt-4">
              {getItems().map(({ item, meta }, i) => (
                <WritingItem key={i} item={item} meta={meta} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}