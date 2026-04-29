import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import styles from './Footer.module.css';

const toRoman = (num: number): string => {
  const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) { result += syms[i]; num -= vals[i]; }
  }
  return result;
};

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const romanYear = toRoman(new Date().getFullYear());

  return (
    <footer className={styles.footer}>
      <div className={styles.goldLine} />
      <div className={styles.inner}>
        <div className={styles.credits}>
          <span className={styles.creditsLabel}>{t('footer.produced_by')}</span>
          <span className={styles.creditsName}>Carlos Campuzano Torres</span>
        </div>
        <p className={styles.year}>{romanYear}</p>
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
        </div>
      </div>
      <div className={styles.goldLine} />
    </footer>
  );
};

export default Footer;
