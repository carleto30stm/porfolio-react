import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  SiReact, SiTypescript, SiNextdotjs, SiJavascript, SiHtml5, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPython, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiPrisma,
  SiDocker, SiGit, SiLinux,
  SiJest, SiFigma, SiPostman,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { useInView } from '../../hooks/useInView';
import { skills } from '../../data/skills';
import styles from './Skills.module.css';

const ICON_MAP: Record<string, IconType> = {
  SiReact, SiTypescript, SiNextdotjs, SiJavascript, SiHtml5, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPython, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiPrisma,
  SiDocker, SiGit, SiLinux,
  SiJest, SiFigma, SiPostman,
};

type Category = 'all' | 'frontend' | 'backend' | 'database' | 'devops' | 'tools';

type FloatData = { x: number; y: number; rotate: number };

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const [active, setActive] = useState<Category>('all');
  const [floating, setFloating] = useState<Record<string, FloatData>>({});

  const categories: Category[] = ['all', 'frontend', 'backend', 'database', 'devops', 'tools'];
  const filtered = active === 'all' ? skills : skills.filter((s) => s.category === active);

  const launch = (name: string) => {
    setFloating(prev => {
      if (prev[name]) return prev;
      const angle = Math.random() * Math.PI * 2;
      const distance = 190 + Math.random() * 90;
      return {
        ...prev,
        [name]: {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 30,
          rotate: (Math.random() < 0.5 ? 1 : -1) * (200 + Math.random() * 300),
        },
      };
    });
  };

  const land = (name: string) => {
    setFloating(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <motion.div
          className="scene-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
        >
          ACT III &mdash; ARSENAL
        </motion.div>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2>{t('skills.title')}</h2>
          <p>{t('skills.subtitle')}</p>
        </motion.div>

        {/* Category filters */}
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={[styles.filterBtn, active === cat && styles.filterActive]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActive(cat)}
            >
              {t(`skills.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Tag cloud */}
        <motion.div className={styles.cloud} layout>
          {filtered.map((skill, i) => {
            const Icon = ICON_MAP[skill.icon];
            return (
              <motion.div
                key={skill.name}
                className={[
                  styles.tag,
                  floating[skill.name] ? styles.tagLaunched : '',
                ].filter(Boolean).join(' ')}
                layout
                initial={{ opacity: 0, scale: 0.7 }}
                animate={
                  inView
                    ? floating[skill.name]
                      ? {
                          x: [0, floating[skill.name].x, 0],
                          y: [0, floating[skill.name].y, 0],
                          rotate: [0, floating[skill.name].rotate, 0],
                          scale: [1, 0.82, 1],
                          opacity: [1, 0.65, 1],
                          zIndex: [1, 50, 1],
                        }
                      : { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }
                    : undefined
                }
                transition={
                  floating[skill.name]
                    ? { duration: 2.4, ease: 'easeInOut', times: [0, 0.42, 1] }
                    : { duration: 0.3, delay: i * 0.04 }
                }
                onAnimationComplete={() => {
                  if (floating[skill.name]) land(skill.name);
                }}
                whileHover={floating[skill.name] ? {} : { scale: 1.1, y: -3 }}
                style={{ cursor: floating[skill.name] ? 'default' : 'pointer', position: 'relative' }}
                onClick={() => launch(skill.name)}
                onHoverStart={() => launch(skill.name)}
              >
                {Icon && <Icon className={styles.tagIcon} />}
                <span className={styles.tagName}>{skill.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
