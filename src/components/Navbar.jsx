import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'venue', label: 'Venue' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'problems', label: 'Problems' },
  { id: 'events', label: 'Events' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [pillStyle, setPillStyle] = useState({ opacity: 0 });
  const linkRefs = useRef({});
  const listRef = useRef(null);

  // Backdrop once the hero is scrolled past
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight whichever section is most in view
  useEffect(() => {
    const sections = LINKS
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Slide the highlight pill under the active link
  useEffect(() => {
    const el = linkRefs.current[active];
    const list = listRef.current;
    if (!el || !list) return;
    const elRect = el.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();
    setPillStyle({
      opacity: 1,
      width: elRect.width,
      transform: `translateX(${elRect.left - listRect.left}px)`,
    });
  }, [active, menuOpen]);

  const goTo = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="site-nav-inner">
        <a href="#home" className="site-nav-brand" onClick={goTo('home')}>
          VANGUARD<span>// HACKQUBIT</span>
        </a>

        <nav className="site-nav-links" ref={listRef}>
          <span className="site-nav-pill" style={pillStyle} aria-hidden="true" />
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              ref={(el) => (linkRefs.current[l.id] = el)}
              className={`site-nav-link ${active === l.id ? 'is-active' : ''}`}
              onClick={goTo(l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="site-nav-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="site-nav-mobile">
        {LINKS.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`site-nav-mobile-link ${active === l.id ? 'is-active' : ''}`}
            style={{ transitionDelay: `${i * 45}ms` }}
            onClick={goTo(l.id)}
          >
            <span className="site-nav-mobile-index">{String(i + 1).padStart(2, '0')}</span>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
