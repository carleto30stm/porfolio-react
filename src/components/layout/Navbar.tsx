import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiHome, FiUser, FiCpu, FiFolder, FiBriefcase, FiMail, FiX } from 'react-icons/fi';
import type { Language } from '../../types';
import styles from './Navbar.module.css';

const NAV_ITEMS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'] as const;

const NAV_ICONS: Record<string, React.ElementType> = {
  home: FiHome,
  about: FiUser,
  skills: FiCpu,
  projects: FiFolder,
  experience: FiBriefcase,
  contact: FiMail,
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const SPROCKET_COUNT = 30;

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map((id) => document.getElementById(id));
      const scrollPos = window.scrollY + 120;
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
    <>
      {/* ── 35mm Film-strip Sidebar ── */}
      <motion.aside
        className={styles.sidebar}
        initial={{ x: -76, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Grain container (overflow hidden so grain doesn't bleed) */}
        <div className={styles.grainContainer} aria-hidden>
          <div className={styles.grain} />
        </div>

        {/* Left sprocket strip */}
        <div className={styles.sprocketCol} aria-hidden>
          {Array.from({ length: SPROCKET_COUNT }).map((_, i) => (
            <span key={i} className={styles.sprocket} />
          ))}
        </div>

        {/* Film body */}
        <div className={styles.filmBody}>

          {/* Lens logo */}
          <button className={styles.logo} onClick={() => scrollTo('home')} aria-label="Home">
            <div className={styles.lens}>
              <div className={styles.lensRing} />
              <span className={styles.lensDot} />
            </div>
          </button>

          <div className={styles.divider} aria-hidden />

          {/* Nav items */}
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item, i) => {
              const Icon = NAV_ICONS[item];
              const isActive = activeSection === item;
              return (
                <li key={item} className={styles.navLi}>
                  <button
                    className={[styles.navItem, isActive && styles.navItemActive]
                      .filter(Boolean).join(' ')}
                    onClick={() => scrollTo(item)}
                    aria-label={t(`nav.${item}`)}
                  >
                    {isActive && (
                      <motion.div
                        className={styles.activeGate}
                        layoutId="activeGate"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      />
                    )}
                    <span className={styles.frameNum}>{ROMAN[i]}</span>
                    <Icon className={styles.navIcon} />
                    {/* Tooltip */}
                    <span className={styles.tooltip}>{t(`nav.${item}`)}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={styles.divider} aria-hidden />

          {/* Lang toggle */}
          <button className={styles.langBtn} onClick={toggleLang} aria-label="Toggle language">
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Film metadata */}
          <div className={styles.filmMeta} aria-hidden>
            <span>KODAK</span>
            <span>35mm</span>
          </div>
        </div>

        {/* Right sprocket strip */}
        <div className={styles.sprocketCol} aria-hidden>
          {Array.from({ length: SPROCKET_COUNT }).map((_, i) => (
            <span key={i} className={styles.sprocket} />
          ))}
        </div>
      </motion.aside>

      {/* ── Mobile hamburger ── */}
      <button
        className={[styles.hamburger, menuOpen && styles.open].filter(Boolean).join(' ')}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            <div className={styles.grainContainer} aria-hidden>
              <div className={styles.grain} />
            </div>

            <div className={styles.mobileHeader}>
              <span className={styles.mobileTitle}>— NAVIGATION —</span>
              <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="Close">
                <FiX />
              </button>
            </div>

            {NAV_ITEMS.map((item, i) => {
              const Icon = NAV_ICONS[item];
              return (
                <motion.button
                  key={item}
                  className={[styles.mobileLink, activeSection === item && styles.mobileLinkActive]
                    .filter(Boolean).join(' ')}
                  onClick={() => scrollTo(item)}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className={styles.mobileFrame}>{ROMAN[i]}</span>
                  <Icon />
                  <span>{t(`nav.${item}`)}</span>
                </motion.button>
              );
            })}

            <button className={styles.mobileLang} onClick={toggleLang}>
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

