import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiExternalLink, FiX, FiStar } from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import styles from './Projects.module.css';

type Filter = 'all' | 'frontend' | 'backend' | 'fullstack';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const isDragging = React.useRef(false);

  const filters: Filter[] = ['all', 'fullstack', 'frontend', 'backend'];

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <motion.div
          className="scene-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
        >
          ACT V &mdash; PORTFOLIO
        </motion.div>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2>{t('projects.title')}</h2>
          <p>{t('projects.subtitle')}</p>
        </motion.div>

        {/* Filters */}
        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f}
              className={[styles.filterBtn, filter === f && styles.active].filter(Boolean).join(' ')}
              onClick={() => setFilter(f)}
            >
              {t(`projects.filters.${f}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                className={styles.card}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                /* ── Looney Tunes drag ── */
                drag
                dragSnapToOrigin
                dragElastic={0.85}
                dragTransition={{ bounceStiffness: 620, bounceDamping: 5 }}
                onDragStart={() => { isDragging.current = true; }}
                onDragEnd={() => { setTimeout(() => { isDragging.current = false; }, 80); }}
                whileHover={{ y: -6 }}
                whileDrag={{
                  scale: 1.13,
                  rotate: 7,
                  zIndex: 60,
                  boxShadow: '0 30px 80px rgba(201,162,39,0.6), 0 0 0 2px #e8b55a',
                  filter: 'brightness(1.18) saturate(1.25)',
                  cursor: 'grabbing',
                }}
                onClick={() => { if (!isDragging.current) setSelected(project); }}
              >
                {/* Card top */}
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    {project.featured && (
                      <span className={styles.featured}>
                        <FiStar /> {t('projects.featured')}
                      </span>
                    )}
                    <span className={styles.category}>{project.category}</span>
                  </div>
                  <div className={styles.cardLinks} onClick={(e) => e.stopPropagation()}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub">
                        <FiGithub />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Demo">
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>

                {/* Tech badges */}
                <div className={styles.tags}>
                  {project.tech.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="cyan">{tech}</Badge>
                  ))}
                  {project.tech.length > 4 && (
                    <Badge variant="default">+{project.tech.length - 4}</Badge>
                  )}
                </div>

                <button className={styles.detailsBtn} onClick={() => setSelected(project)}>
                  {t('projects.view_details')} →
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelected(null)} aria-label="Close">
                <FiX />
              </button>

              <div className={styles.modalMeta}>
                <span className={styles.category}>{selected.category}</span>
                {selected.featured && (
                  <span className={styles.featured}><FiStar /> {t('projects.featured')}</span>
                )}
              </div>

              <h2 className={styles.modalTitle}>{selected.title}</h2>
              <p className={styles.modalDesc}>{selected.longDescription || selected.description}</p>

              <div className={styles.modalSection}>
                <h4>{t('projects.tech_stack')}</h4>
                <div className={styles.tags}>
                  {selected.tech.map((tech) => (
                    <Badge key={tech} variant="cyan">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className={styles.modalActions}>
                {selected.github && (
                  <Button as="a" href={selected.github} variant="secondary" size="md" external>
                    <FiGithub /> {t('projects.view_code')}
                  </Button>
                )}
                {selected.demo && (
                  <Button as="a" href={selected.demo} variant="primary" size="md" external>
                    <FiExternalLink /> {t('projects.view_demo')}
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
