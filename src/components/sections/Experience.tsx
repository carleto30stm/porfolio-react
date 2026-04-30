import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiBook } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import { experiences } from '../../data/experience';
import type { Experience as ExperienceType } from '../../types';
import Badge from '../ui/Badge';
import styles from './Experience.module.css';

type Tab = 'work' | 'education';

const Experience: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const [tab, setTab] = useState<Tab>('work');

  const filtered = experiences.filter((e) => e.type === tab);

  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <motion.div
          className="scene-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
        >
          ACT V &mdash; TIMELINE
        </motion.div>
        <motion.div
          className="section-header"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('experience.title')}</h2>
          <p>{t('experience.subtitle')}</p>
        </motion.div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={[styles.tab, tab === 'work' && styles.active].filter(Boolean).join(' ')}
            onClick={() => setTab('work')}
          >
            <FiBriefcase /> {t('experience.work')}
          </button>
          <button
            className={[styles.tab, tab === 'education' && styles.active].filter(Boolean).join(' ')}
            onClick={() => setTab('education')}
          >
            <FiBook /> {t('experience.education')}
          </button>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, i) => (
              <TimelineItem key={exp.id} exp={exp} index={i} inView={inView} t={t} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  exp: ExperienceType;
  index: number;
  inView: boolean;
  t: (key: string) => string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ exp, index, inView, t }) => (
  <motion.div
    className={styles.item}
    layout
    initial={{ opacity: 0, x: -50 }}
    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
    exit={{ opacity: 0, x: 40, transition: { duration: 0.22 } }}
    transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
  >
    {/* Dot + line */}
    <div className={styles.dotWrap}>
      <motion.div
        className={styles.dot}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: 'spring', stiffness: 300, delay: index * 0.1 + 0.25 }}
      />
      <div className={styles.line} />
    </div>

    {/* Card */}
    <motion.div
      className={styles.content}
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { boxShadow: '0 2px 24px 0 rgba(201,162,39,0.06)' },
        hover: { boxShadow: '0 8px 48px 0 rgba(201,162,39,0.28)', y: -4 },
      }}
      transition={{ duration: 0.35 }}
    >
      {/* Light sweep */}
      <div className={styles.cardSweep} aria-hidden />

      <div className={styles.header}>
        <div>
          <h3 className={styles.role}>{exp.role}</h3>
          <p className={styles.company}>{exp.company}</p>
        </div>
        <span className={styles.period}>
          {exp.period}{!exp.endDate ? ` — ${t('experience.present')}` : ''}
        </span>
      </div>

      <ul className={styles.bullets}>
        {exp.description.map((desc, di) => (
          <motion.li
            key={di}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.35, delay: index * 0.1 + di * 0.06 + 0.3 }}
          >
            {desc}
          </motion.li>
        ))}
      </ul>

      <div className={styles.tags}>
        {exp.tech.map((tech) => (
          <Badge key={tech} variant="purple">{tech}</Badge>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default Experience;
