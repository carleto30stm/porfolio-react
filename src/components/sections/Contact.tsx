import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiSend, FiGithub, FiLinkedin, FiCheck, FiTerminal } from 'react-icons/fi';
import { useForm, ValidationError } from '@formspree/react';
import { useInView } from '../../hooks/useInView';
import Button from '../ui/Button';
import styles from './Contact.module.css';
import { FaTiktok } from 'react-icons/fa';
import { GITHUB_LINK, LINKEDIN_LINK, TIKTOK_LINK } from '../../data/constants';

const FORMSPREE_ID = (import.meta.env as Record<string, string>).VITE_FORMSPREE_ID || 'mpqyzorz';

const JSON_LINES = [
  { key: 'LOCATION',     value: 'Argentina / Remoto' },
  { key: 'STATUS',       value: 'Disponible para proyectos' },
  { key: 'STACK',        value: 'Fullstack • TypeScript • Node' },
  { key: 'RESPONSE',     value: '< 24h' },
];

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [focused, setFocused] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [filled, setFilled] = useState<Record<string, boolean>>({});

  const markFilled = (field: string, val: string) => {
    setFilled(prev => ({ ...prev, [field]: val.trim().length > 0 }));
    if (field === 'message') setCharCount(val.length);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container">

        {/* ACT label */}
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

          {/* ── Info column ── */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* JSON data file */}
            <div className={styles.dataFile}>
              <div className={styles.dataFileHeader}>
                <FiTerminal className={styles.dataFileIcon} />
                <span>contact_data.json</span>
              </div>
              <div className={styles.dataFileBody}>
                <span className={styles.jsonBrace}>{'{'}</span>
                {JSON_LINES.map(({ key, value }, i) => (
                  <div key={key} className={styles.jsonLine}>
                    <span className={styles.jsonKey}>"{key}"</span>
                    <span className={styles.jsonColon}>: </span>
                    <span className={styles.jsonValue}>"{value}"</span>
                    {i < JSON_LINES.length - 1 && <span className={styles.jsonComma}>,</span>}
                  </div>
                ))}
                <span className={styles.jsonBrace}>{'}'}</span>
              </div>
            </div>

            {/* Social */}
            <div className={styles.socialLinks}>
              <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <FiGithub /> GitHub
              </a>
              <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <FiLinkedin /> LinkedIn
              </a>
              <a href={TIKTOK_LINK} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <FaTiktok /> TikTok
              </a>
            </div>

          </motion.div>

          {/* ── Terminal form ── */}
          <motion.div
            className={styles.terminalWrap}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {/* Window chrome */}
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={styles.dot} style={{ background: '#ff5f57' }} />
                <span className={styles.dot} style={{ background: '#febc2e' }} />
                <span className={styles.dot} style={{ background: '#28c840' }} />
              </div>
              <span className={styles.terminalTitle}>// OPEN_TRANSMISSION.sh</span>
              <span className={styles.terminalBlink}>▌</span>
            </div>

            {/* Scan-line overlay */}
            <div className={styles.scanLines} aria-hidden />

            <AnimatePresence mode="wait">
              {state.succeeded ? (
                /* ── Success screen ── */
                <motion.div
                  key="success"
                  className={styles.successScreen}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55 }}
                >
                  <motion.div
                    className={styles.successIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, delay: 0.2 }}
                  >
                    <FiCheck />
                  </motion.div>
                  <p className={styles.successCode}>$ STATUS: 200 OK</p>
                  <p className={styles.successMsg}>// TRANSMISSION COMPLETE</p>
                  <p className={styles.successSub}>{t('contact.success')}</p>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  className={styles.form}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                >
                  {/* Boot lines */}
                  <p className={styles.formPrompt}>
                    <span className={styles.promptDollar}>$</span>
                    {' ./initiate_contact.sh --secure'}
                  </p>
                  <p className={styles.promptLine}>
                    <span className={styles.promptGreen}>✓</span> Connection established. Ready to transmit.
                  </p>

                  {/* Name + Email row */}
                  <div className={styles.row}>
                    <div className={[styles.field, focused === 'name' ? styles.fieldFocused : ''].filter(Boolean).join(' ')}>
                      <label htmlFor="name" className={styles.fieldLabel}>
                        <span className={styles.promptChar}>&gt;</span> {t('contact.name')}
                        {filled.name && <FiCheck className={styles.fieldCheck} />}
                      </label>
                      <input
                        id="name" name="name" type="text" required
                        placeholder={t('contact.name_placeholder')}
                        className={styles.input}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        onChange={e => markFilled('name', e.target.value)}
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} className={styles.errorMsg} />
                    </div>
                    <div className={[styles.field, focused === 'email' ? styles.fieldFocused : ''].filter(Boolean).join(' ')}>
                      <label htmlFor="email" className={styles.fieldLabel}>
                        <span className={styles.promptChar}>&gt;</span> {t('contact.email')}
                        {filled.email && <FiCheck className={styles.fieldCheck} />}
                      </label>
                      <input
                        id="email" name="email" type="email" required
                        placeholder={t('contact.email_placeholder')}
                        className={styles.input}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        onChange={e => markFilled('email', e.target.value)}
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className={styles.errorMsg} />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className={[styles.field, focused === 'subject' ? styles.fieldFocused : ''].filter(Boolean).join(' ')}>
                    <label htmlFor="subject" className={styles.fieldLabel}>
                      <span className={styles.promptChar}>&gt;</span> {t('contact.subject')}
                      {filled.subject && <FiCheck className={styles.fieldCheck} />}
                    </label>
                    <input
                      id="subject" name="subject" type="text" required
                      placeholder={t('contact.subject_placeholder')}
                      className={styles.input}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused(null)}
                      onChange={e => markFilled('subject', e.target.value)}
                    />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} className={styles.errorMsg} />
                  </div>

                  {/* Message */}
                  <div className={[styles.field, focused === 'message' ? styles.fieldFocused : ''].filter(Boolean).join(' ')}>
                    <label htmlFor="message" className={styles.fieldLabel}>
                      <span className={styles.promptChar}>&gt;</span> {t('contact.message')}
                      <span className={styles.charCounter}>[{charCount}/500]</span>
                    </label>
                    <textarea
                      id="message" name="message" required rows={5} maxLength={500}
                      placeholder={t('contact.message_placeholder')}
                      className={styles.textarea}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      onChange={e => markFilled('message', e.target.value)}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className={styles.errorMsg} />
                  </div>

                  {/* Submit + progress */}
                  <div className={styles.submitRow}>
                    <Button variant="primary" size="lg" type="submit" disabled={state.submitting}>
                      <FiSend />
                      {state.submitting ? t('contact.sending') : t('contact.send')}
                    </Button>
                    {state.submitting && (
                      <div className={styles.transmitting}>
                        <motion.div
                          className={styles.transmitBar}
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.6, ease: 'easeInOut' }}
                        />
                        <span className={styles.transmitLabel}>TRANSMITTING...</span>
                      </div>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
