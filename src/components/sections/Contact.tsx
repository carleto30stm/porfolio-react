import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiClock, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useForm, ValidationError } from '@formspree/react';
import { useInView } from '../../hooks/useInView';
import Button from '../ui/Button';
import styles from './Contact.module.css';

const FORMSPREE_ID = (import.meta.env as Record<string, string>).VITE_FORMSPREE_ID || 'mpqyzorz';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  const INFO = [
    { icon: FiMapPin, label: t('contact.info.location'), value: t('contact.info.location_value') },
    { icon: FiClock, label: t('contact.info.availability'), value: t('contact.info.availability_value') },
  ];

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <motion.div
          className="scene-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
        >
          ACT VII &mdash; REACH OUT
        </motion.div>
        <motion.div
          className="section-header"
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {/* Info column */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {INFO.map(({ icon: Icon, label, value }) => (
              <div key={label} className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Icon />
                </div>
                <div>
                  <p className={styles.infoLabel}>{label}</p>
                  <p className={styles.infoValue}>{value}</p>
                </div>
              </div>
            ))}

            <div className={styles.socialLinks}>
              <a href="https://github.com/carleto30stm" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <FiGithub /> GitHub
              </a>
              <a href="https://linkedin.com/in/carloscampuzanotorres" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <FiLinkedin /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {state.succeeded ? (
              <p className={styles.successMsg}>{t('contact.success')}</p>
            ) : (
              <>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name">{t('contact.name')}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={t('contact.name_placeholder')}
                      className={styles.input}
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className={styles.errorMsg} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">{t('contact.email')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t('contact.email_placeholder')}
                      className={styles.input}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className={styles.errorMsg} />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="subject">{t('contact.subject')}</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder={t('contact.subject_placeholder')}
                    className={styles.input}
                  />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} className={styles.errorMsg} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t('contact.message_placeholder')}
                    className={styles.textarea}
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className={styles.errorMsg} />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={state.submitting}
                >
                  <FiSend />
                  {state.submitting ? t('contact.sending') : t('contact.send')}
                </Button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
