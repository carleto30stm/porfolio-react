import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          {t('footer.made_with')} {t('footer.by')} &mdash;{' '}
          {year} &copy; {t('footer.rights')}
        </p>
        <div className={styles.socials}>
          <a
            href="https://github.com/carleto30stm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={styles.socialLink}
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/carloscampuzanotorres"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={styles.socialLink}
          >
            <FiLinkedin />
          </a>
          {/* <a
            href="https://twitter.com/carlos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className={styles.socialLink}
          >
            <FiTwitter />
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
