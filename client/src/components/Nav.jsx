import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/writing', label: 'Writing' },
  { to: '/art', label: 'Art' },
  { to: '/games', label: 'Visual Novels' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav-header${scrolled ? ' nav-scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">JB</Link>

        <button
          className="nav-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        <nav className={`nav-links${open ? ' nav-open' : ''}`}>
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}