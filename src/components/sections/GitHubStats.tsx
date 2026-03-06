import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiUsers, FiUserCheck, FiBook } from 'react-icons/fi';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import { useInView } from '../../hooks/useInView';
import styles from './GitHubStats.module.css';

const GitHubStats: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  const GITHUB_USERNAME = (import.meta.env as { VITE_GITHUB_USERNAME?: string }).VITE_GITHUB_USERNAME || 'carleto30stm';
  const { stats, loading, error } = useGitHubStats(GITHUB_USERNAME);

  const statItems = stats
    ? [
        { icon: FiBook, value: stats.public_repos, label: t('stats.repos') },
        { icon: FiUsers, value: stats.followers, label: t('stats.followers') },
        { icon: FiUserCheck, value: stats.following, label: t('stats.following') },
      ]
    : [];

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className="section-header"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('stats.title')}</h2>
          <p>{t('stats.subtitle')}</p>
        </motion.div>

        <div className={styles.wrapper}>
          {/* Stats cards */}
          <div className={styles.statsRow}>
            {loading && <p className={styles.loadingText}>{t('stats.loading')}</p>}
            {error && <p className={styles.errorText}>{t('stats.error')}</p>}
            {!loading && !error &&
              statItems.map(({ icon: Icon, value, label }, i) => (
                <motion.div
                  key={label}
                  className={styles.statCard}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                >
                  <Icon className={styles.statIcon} />
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </motion.div>
              ))}
          </div>

          {/* GitHub contribution graph embed */}
          <motion.div
            className={styles.graphWrap}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={styles.graphHeader}>
              <FiGithub className={styles.graphIcon} />
              <span>github.com/{GITHUB_USERNAME}</span>
            </div>

            {stats?.contributionCalendar ? (
              <div className={styles.calendarGrid} aria-hidden>
                {stats.contributionCalendar.weeks.map((week, wi) => (
                  <div key={wi} className={styles.week}>
                    {week.contributionDays.map((day) => (
                      <div
                        key={day.date}
                        className={styles.day}
                        title={`${day.date}: ${day.contributionCount} contribs`}
                        style={{ background: day.color }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <img
                src={`https://ghchart.rshah.org/00d4ff/${GITHUB_USERNAME}`}
                alt="GitHub contribution chart"
                className={styles.chartImg}
                loading="lazy"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
