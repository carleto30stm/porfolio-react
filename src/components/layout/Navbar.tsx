import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Language } from '../../types';
import styles from './Navbar.module.css';

const NAV_ITEMS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'] as const;

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      const sections = NAV_ITEMS.map((id) => document.getElementById(id));
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    const next: Language = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    localStorage.setItem('portfolio-lang', next);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className={[styles.navbar, scrolled && styles.scrolled].filter(Boolean).join(' ')}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <button className={styles.logo} onClick={() => scrollTo('home')}>
          <span className={styles.logoSymbol}>&lt;</span>
          <span className={styles.logoName}>Carlos</span>
          <span className={styles.logoSymbol}>/&gt;</span>
        </button>

        {/* Desktop nav */}
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button
                className={[styles.navLink, activeSection === item && styles.active]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => scrollTo(item)}
              >
                {t(`nav.${item}`)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className={styles.actions}>
          <button className={styles.langToggle} onClick={toggleLang} aria-label="Toggle language">
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
          {/* Mobile hamburger */}
          <button
            className={[styles.hamburger, menuOpen && styles.open].filter(Boolean).join(' ')}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                className={[styles.mobileLink, activeSection === item && styles.active]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => scrollTo(item)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {t(`nav.${item}`)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
