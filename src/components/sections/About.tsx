import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiCode, FiLayers, FiZap } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import Button from '../ui/Button';
import styles from './About.module.css';

const STATS = [
  { key: 'experience', value: '5+' },
  { key: 'projects', value: '30+' },
  { key: 'technologies', value: '20+' },
] as const;

const FEATURES = [
  { icon: FiCode, label: 'Clean Code' },
  { icon: FiLayers, label: 'Arquitectura' },
  { icon: FiZap, label: 'Performance' },
];

const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});

const About: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  return (
    <section id="about" className={styles.about}>
      <motion.div
        className="scene-label"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
      >
        ACT II &mdash; BACKSTORY
      </motion.div>
      <div className={`container ${styles.inner}`} ref={ref}>
        {/* Avatar — 35mm film frame */}
        <motion.div
          className={styles.avatarCol}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.filmFrame}>
            {/* Sprocket strip — top */}
            <div className={styles.filmStripTop}>
              {[...Array(7)].map((_, i) => <span key={i} className={styles.sprocket} />)}
            </div>

            {/* Image area */}
            <div className={styles.filmImageWrap}>
              <img src="/avatar.jpg" alt="Carlos" className={styles.filmImg} />
              <div className={styles.filmGrain} aria-hidden />
              <div className={styles.filmVignette} aria-hidden />
              <div className={styles.filmLeak} aria-hidden />
              <div className={styles.filmLeakBottom} aria-hidden />
              {/* Frame counter overlay */}
              <span className={styles.filmCounter} aria-hidden>▲ 24A</span>
            </div>

            {/* Sprocket strip — bottom */}
            <div className={styles.filmStripBottom}>
              {[...Array(7)].map((_, i) => <span key={i} className={styles.sprocket} />)}
            </div>

            {/* Metadata strip */}
            <div className={styles.filmMeta}>
              <span>KODAK&nbsp;5213</span>
              <span>&#9650;&nbsp;35mm</span>
              <span>©MMXXVI</span>
            </div>
          </div>

          <div className={styles.features}>
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className={styles.featureChip}>
                <Icon className={styles.featureIcon} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Text col */}
        <div className={styles.textCol}>
          <motion.div
            className="section-header"
            style={{ textAlign: 'left', marginBottom: '1.5rem' }}
            variants={fadeIn(0.1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <h2>{t('about.title')}</h2>
            <p>{t('about.subtitle')}</p>
          </motion.div>

          {[1, 2, 3].map((n, i) => (
            <motion.p
              key={n}
              className={styles.paragraph}
              variants={fadeIn(0.15 + i * 0.1)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              {t(`about.paragraph${n}`)}
            </motion.p>
          ))}

          {/* Stats */}
          <motion.div
            className={styles.stats}
            variants={fadeIn(0.45)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {STATS.map(({ key, value }) => (
              <div key={key} className={styles.stat}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{t(`about.stats.${key}`)}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn(0.55)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <Button
              as="a"
              href="https://drive.google.com/uc?export=download&id=1MQxM4DTQHQlICMccqbkFycnEczMC63DZ"
              variant="primary"
              size="md"
              external
            >
              <FiDownload /> {t('about.download_cv')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
