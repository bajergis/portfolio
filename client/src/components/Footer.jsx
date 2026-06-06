import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-logo">Jason Blackschleger</span>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Writer · Artist · Visual Storyteller
          </p>
        </div>

        <nav className="footer-nav">
          <Link to="/writing">Writing</Link>
          <Link to="/art">Art</Link>
          <Link to="/games">Games</Link>
        </nav>

        <div className="footer-right">
          <a href="mailto:contact@jasonblackschleger.com" className="footer-email">
            contact@jasonblackschleger.com
          </a>
          <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '1rem' }}>
            © {year} Jason Blackschleger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
