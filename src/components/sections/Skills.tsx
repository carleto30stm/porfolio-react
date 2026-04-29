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
import { useInView } from '../../hooks/useInView';
import { skills } from '../../data/skills';
import styles from './Skills.module.css';

const ICON_MAP: Record<string, React.ElementType> = {
  SiReact, SiTypescript, SiNextdotjs, SiJavascript, SiHtml5, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPython, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiPrisma,
  SiDocker, SiGit, SiLinux,
  SiJest, SiFigma, SiPostman,
};

type Category = 'all' | 'frontend' | 'backend' | 'database' | 'devops' | 'tools';

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const [active, setActive] = useState<Category>('all');

  const categories: Category[] = ['all', 'frontend', 'backend', 'database', 'devops', 'tools'];
  const filtered = active === 'all' ? skills : skills.filter((s) => s.category === active);

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
                className={styles.tag}
                layout
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.1, y: -3 }}
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
