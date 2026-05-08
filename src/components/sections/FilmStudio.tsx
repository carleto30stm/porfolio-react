import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiFilm,
  FiRefreshCw,
  FiShuffle,
} from 'react-icons/fi';
import { useInView } from '../../hooks/useInView';
import styles from './FilmStudio.module.css';

type Scene = {
  id: string;
  title: string;
  role: string;
  cue: string;
};

type Result = {
  title: string;
  copy: string;
};

const STARTING_ORDER = ['deploy', 'brief', 'data', 'ui', 'api'];
const CORRECT_ORDER = ['brief', 'ui', 'api', 'data', 'deploy'];

const shuffle = (ids: string[]) => {
  const next = [...ids];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

const FilmStudio: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const [order, setOrder] = useState(STARTING_ORDER);
  const [checked, setChecked] = useState(false);

  const scenes = t('studio.scenes', { returnObjects: true }) as Scene[];
  const results = t('studio.results', { returnObjects: true }) as {
    perfect: Result;
    close: Result;
    retry: Result;
  };

  const sceneMap = useMemo(
    () => new Map(scenes.map((scene) => [scene.id, scene])),
    [scenes],
  );

  const score = order.reduce(
    (total, id, index) => total + (id === CORRECT_ORDER[index] ? 1 : 0),
    0,
  );
  const isPerfect = score === CORRECT_ORDER.length;
  const activeResult = isPerfect ? results.perfect : score >= 3 ? results.close : results.retry;

  const moveScene = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    setChecked(false);
    setOrder((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const reset = () => {
    setChecked(false);
    setOrder(STARTING_ORDER);
  };

  const randomize = () => {
    setChecked(false);
    setOrder((current) => {
      const next = shuffle(current);
      return next.join('') === current.join('') ? shuffle(next) : next;
    });
  };

  return (
    <section id="studio" className={styles.section}>
      <div className="container">
        <motion.div
          className="scene-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
        >
          ACT IV &mdash; DIRECTOR'S CUT
        </motion.div>

        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('studio.title')}</h2>
          <p>{t('studio.subtitle')}</p>
        </motion.div>

        <div className={styles.stage}>
          <motion.div
            className={styles.viewer}
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.viewerTop}>
              <span>{t('studio.monitor')}</span>
              <FiFilm />
            </div>
            <div className={styles.screen}>
              <div className={styles.scanlines} aria-hidden />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${checked}-${score}`}
                  className={styles.result}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                  transition={{ duration: 0.35 }}
                >
                  <span className={styles.score}>
                    {score}/{CORRECT_ORDER.length}
                  </span>
                  <h3>{checked ? activeResult.title : t('studio.idleTitle')}</h3>
                  <p>{checked ? activeResult.copy : t('studio.idleCopy')}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className={styles.meter} aria-label={t('studio.scoreLabel')}>
              {CORRECT_ORDER.map((id, index) => (
                <span
                  key={id}
                  className={order[index] === id && checked ? styles.meterOn : undefined}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.editor}
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className={styles.slate}>
              <span>{t('studio.slate')}</span>
              <strong>{t('studio.take')}</strong>
            </div>

            <div className={styles.reel} aria-label={t('studio.reelLabel')}>
              {order.map((id, index) => {
                const scene = sceneMap.get(id);
                if (!scene) return null;
                const isCorrect = checked && id === CORRECT_ORDER[index];

                return (
                  <motion.article
                    key={id}
                    className={[styles.scene, isCorrect && styles.sceneCorrect]
                      .filter(Boolean)
                      .join(' ')}
                    layout
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  >
                    <div className={styles.frameNumber}>0{index + 1}</div>
                    <div className={styles.sceneText}>
                      <span>{scene.role}</span>
                      <h3>{scene.title}</h3>
                      <p>{scene.cue}</p>
                    </div>
                    <div className={styles.sceneControls}>
                      <button
                        type="button"
                        onClick={() => moveScene(index, -1)}
                        disabled={index === 0}
                        aria-label={`${t('studio.moveUp')} ${scene.title}`}
                      >
                        <FiChevronUp />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveScene(index, 1)}
                        disabled={index === order.length - 1}
                        aria-label={`${t('studio.moveDown')} ${scene.title}`}
                      >
                        <FiChevronDown />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.primaryAction} onClick={() => setChecked(true)}>
                <FiCheckCircle />
                {t('studio.check')}
              </button>
              <button type="button" onClick={randomize}>
                <FiShuffle />
                {t('studio.shuffle')}
              </button>
              <button type="button" onClick={reset}>
                <FiRefreshCw />
                {t('studio.reset')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FilmStudio;
