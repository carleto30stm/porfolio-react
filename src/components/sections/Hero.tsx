import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin, FiArrowDown } from 'react-icons/fi';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import Button from '../ui/Button';
import styles from './Hero.module.css';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const roles = t('hero.roles', { returnObjects: true }) as string[];
  const { text } = useTypingEffect({ words: roles });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={styles.hero}>
      {/* Background grid */}
      <div className={styles.grid} aria-hidden />

      {/* Floating blobs */}
      <div className={styles.blobCyan} aria-hidden />
      <div className={styles.blobPurple} aria-hidden />

      <div className={styles.content}>
        <motion.div className={styles.textBlock} variants={container} initial="hidden" animate="show">
          <motion.p className={styles.greeting} variants={item}>
            <span className={styles.greetingBracket}>//</span> {t('hero.greeting')}
          </motion.p>

          <motion.h1 className={styles.name} variants={item}>
            {t('hero.name')}
          </motion.h1>

          <motion.div className={styles.roleWrapper} variants={item}>
            <span className={styles.rolePrefix}>&lt;</span>
            <span className={styles.role}>{text}</span>
            <span className={styles.cursor} aria-hidden />
            <span className={styles.roleSuffix}>/&gt;</span>
          </motion.div>

          <motion.p className={styles.description} variants={item}>
            {t('hero.description')}
          </motion.p>

          <motion.div className={styles.cta} variants={item}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo('projects')}
            >
              {t('hero.cta_projects')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo('contact')}
            >
              {t('hero.cta_contact')}
            </Button>
          </motion.div>

          <motion.div className={styles.socials} variants={item}>
            <a
              href="https://github.com/carleto30stm"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://linkedin.com/in/carloscampuzanotorres"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
          </motion.div>
        </motion.div>

        {/* Code card decoration */}
        <motion.div
          className={styles.codeCard}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <div className={styles.codeHeader}>
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
            <span className={styles.codeFileName}>carlos.ts</span>
          </div>
          <pre className={styles.codeBody}>
            <code>{`const developer = {
  name: "Carlos",
  role: "Fullstack Dev",
  stack: [
    "React", "TypeScript",
    "Node.js", "PostgreSQL"
  ],
  passion: "Clean Code",
  available: true,
};

export default developer;`}</code>
          </pre>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className={styles.scrollIndicator}
        onClick={() => scrollTo('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-label={t('hero.scroll')}
      >
        <FiArrowDown />
      </motion.button>
    </section>
  );
};

export default Hero;
