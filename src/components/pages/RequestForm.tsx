'use client';

import Link from 'next/link';
import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import styles from './RequestForm.module.css';

export type Topic = 'call' | 'check';
type Field = 'name' | 'email' | 'organization' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Phase = 'idle' | 'sending' | 'sent' | 'failed';

type Props = {
  initialTopic: Topic;
  /** The website check's price, as on the pricing page. */
  checkPrice: string;
  /** One or two sentences on what the check includes, shown when it is chosen. */
  checkNote: string;
  /** The address replies come from, and the fallback when sending fails. */
  email: string;
};

// The contact endpoint caps the message at 5,000 characters; a topic line is added in front of it.
const LIMIT = { name: 100, email: 200, organization: 200, message: 4800 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHECK_PREFILL = 'I would like to start with the website check.';
const ORDER: Field[] = ['name', 'email', 'organization', 'message'];

const MESSAGES = {
  name: 'Please enter your name.',
  emailEmpty: 'Please enter your email address.',
  emailShape: 'Please check your email address. It should look like name@example.com.',
  message: 'Please add a line or two about what is going on.',
};

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = MESSAGES.name;
  if (!v.email.trim()) errors.email = MESSAGES.emailEmpty;
  else if (!EMAIL.test(v.email.trim())) errors.email = MESSAGES.emailShape;
  if (!v.message.trim()) errors.message = MESSAGES.message;
  return errors;
}

/** The words a field's error would use, so an error that is folding away keeps them until it has gone. */
function messageFor(f: Field, v: Values): string {
  if (f === 'email') return v.email.trim() ? MESSAGES.emailShape : MESSAGES.emailEmpty;
  if (f === 'name') return MESSAGES.name;
  if (f === 'message') return MESSAGES.message;
  return '';
}

export function RequestForm({ initialTopic, checkPrice, checkNote, email }: Props) {
  const uid = useId();
  const id = (part: string) => `${uid}-${part}`;

  const [topic, setTopic] = useState<Topic>(initialTopic);
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    organization: '',
    message: initialTopic === 'check' ? CHECK_PREFILL : '',
  });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  // Read aloud by the live region: every change of state, sending and sent included.
  const [status, setStatus] = useState('');
  // Shown under the form when something needs attention; it keeps its words while the box folds away.
  const [notice, setNotice] = useState('');

  const trapRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const noticeRef = useRef<HTMLParagraphElement>(null);

  // A failed send leaves focus on the button, and the note opens below it, which can be past the
  // bottom of the screen. Scroll just far enough to show where the note will end, while it opens.
  useEffect(() => {
    if (phase !== 'failed') return;
    const note = noticeRef.current;
    const clip = note?.parentElement;
    if (!note || !clip) return;
    const bottom = clip.getBoundingClientRect().top + parseFloat(getComputedStyle(note).marginTop) + note.offsetHeight;
    const room = window.innerHeight - 16;
    // 'auto' follows the page's own scroll-behavior: smooth, or instant with reduced motion.
    if (bottom > room) window.scrollBy({ top: bottom - room, behavior: 'auto' });
  }, [phase]);

  // The thanks is much shorter than the form, so the page shrinks when it arrives. Before the browser
  // paints, bring the card into view (rather than showing the footer and scrolling back up to it),
  // then move focus to the thanks without a second scroll. The page marks the card with data-form-card.
  useLayoutEffect(() => {
    if (phase !== 'sent') return;
    const box = wrapRef.current?.closest<HTMLElement>('[data-form-card]') ?? wrapRef.current;
    if (box) {
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const top = box.getBoundingClientRect().top;
      if (top < offset || top > window.innerHeight * 0.6) {
        window.scrollTo({ top: window.scrollY + top - offset, behavior: 'instant' });
      }
    }
    doneRef.current?.focus({ preventScroll: true });
  }, [phase]);

  // Required fields are flagged after a first send; a malformed address as soon as the field is left.
  const errors = validate(values);
  const err: Errors = {};
  for (const f of ORDER) {
    if (errors[f] && (attempted || (touched[f] && values[f].trim() !== ''))) err[f] = errors[f];
  }

  const focusField = (f: Field) => document.getElementById(id(f))?.focus();

  const change = (f: Field) => (e: { target: { value: string } }) => {
    const next = { ...values, [f]: e.target.value };
    setValues(next);
    if (phase === 'idle' && attempted && Object.keys(validate(next)).length === 0) setStatus('');
  };

  const leave = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  // On a phone keyboard, Enter in a single-line field moves on instead of sending half a request.
  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
    e.preventDefault();
    const f = e.currentTarget.name as Field;
    focusField(ORDER[ORDER.indexOf(f) + 1] ?? 'message');
  };

  const chooseTopic = (next: Topic) => {
    setTopic(next);
    setValues((v) => {
      if (next === 'check' && !v.message.trim()) return { ...v, message: CHECK_PREFILL };
      if (next === 'call' && v.message.trim() === CHECK_PREFILL) return { ...v, message: '' };
      return v;
    });
  };

  const fail = (text: string) => {
    setPhase('failed');
    setStatus(text);
    setNotice(text);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phase === 'sending') return;
    setAttempted(true);
    const found = validate(values);
    const invalid = ORDER.filter((f) => found[f]);
    if (invalid.length) {
      const text = invalid.length === 1 ? (found[invalid[0]] ?? '') : 'Please check the highlighted fields.';
      setPhase('idle');
      setStatus(text);
      setNotice(text);
      focusField(invalid[0]);
      return;
    }

    setPhase('sending');
    setStatus('Sending your request.');
    const topicLine = topic === 'check' ? `Topic: Website check (${checkPrice})` : 'Topic: A 20-minute call';
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          organization: values.organization.trim(),
          message: `${topicLine}\n\n${values.message.trim()}`,
          company: trapRef.current?.value ?? '',
        }),
        signal: controller.signal,
      });
      const data: unknown = await res.json().catch(() => null);
      const body = typeof data === 'object' && data !== null ? (data as { success?: unknown; error?: unknown }) : {};
      if (res.ok && body.success) {
        setPhase('sent');
        setStatus('Request sent.');
        return;
      }
      // The endpoint's own wording is kept for a field problem or a rate limit; anything else gets the fallback.
      const reason = typeof body.error === 'string' ? body.error : '';
      fail(
        (res.status === 400 || res.status === 429) && reason
          ? reason
          : `Your request was not sent. Please try again, or write to me at ${email}.`
      );
    } catch {
      fail(`Your request could not be sent. Please check your connection and try again, or write to me at ${email}.`);
    } finally {
      window.clearTimeout(timer);
    }
  };

  const sending = phase === 'sending';
  const showNotice = phase === 'failed' || (phase === 'idle' && attempted && Object.keys(errors).length > 0);
  const describedBy = (f: Field, hint = false) =>
    [hint ? id(`${f}-hint`) : '', err[f] ? id(`${f}-error`) : ''].filter(Boolean).join(' ') || undefined;
  const fieldError = (f: Field) => (
    <FieldError id={id(`${f}-error`)} text={err[f] ?? messageFor(f, values)} show={Boolean(err[f])} />
  );

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {phase === 'sent' ? (
        <div className={styles.done}>
          <span className={styles.doneIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h2 ref={doneRef} tabIndex={-1} className={styles.doneTitle}>
            Thanks. I will reply within one business day.
          </h2>
          <p className={styles.doneText}>
            My reply will come from <span className={styles.address}>{email}</span>.
          </p>
          <Link href="/work" className={styles.doneLink}>
            See the work while you wait
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={sending || undefined}>
          <fieldset className={styles.topics}>
            <legend className={styles.legend}>What would you like?</legend>
            <div className={styles.topicGrid}>
              <label className={styles.topic}>
                <input
                  type="radio"
                  name="topic"
                  value="call"
                  className={styles.radio}
                  checked={topic === 'call'}
                  onChange={() => chooseTopic('call')}
                />
                <span className={styles.topicText}>
                  <span className={styles.topicName}>A 20-minute call</span>
                  <span className={styles.topicLine}>Talk through what is not working.</span>
                </span>
              </label>
              <label className={styles.topic}>
                <input
                  type="radio"
                  name="topic"
                  value="check"
                  className={styles.radio}
                  checked={topic === 'check'}
                  onChange={() => chooseTopic('check')}
                  aria-describedby={id('check-note')}
                />
                <span className={styles.topicText}>
                  <span className={styles.topicName}>
                    Website check <span className={styles.price}>{checkPrice}</span>
                  </span>
                  <span className={styles.topicLine}>Your whole path from search to booked, checked.</span>
                </span>
              </label>
            </div>
            {/* Always present, so it opens and closes smoothly and describes the check option to screen readers */}
            <Reveal show={topic === 'check'}>
              <p id={id('check-note')} className={styles.checkNote}>
                {checkNote}
              </p>
            </Reveal>
          </fieldset>

          <div className={styles.pair}>
            <div className={styles.field}>
              <label htmlFor={id('name')} className={styles.label}>
                Name
              </label>
              <div className={styles.control}>
                <input
                  id={id('name')}
                  name="name"
                  type="text"
                  className={styles.input}
                  autoComplete="name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  required
                  maxLength={LIMIT.name}
                  value={values.name}
                  onChange={change('name')}
                  onBlur={leave('name')}
                  onKeyDown={onEnter}
                  aria-invalid={err.name ? true : undefined}
                  aria-describedby={describedBy('name')}
                />
                {fieldError('name')}
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor={id('email')} className={styles.label}>
                Email
              </label>
              <div className={styles.control}>
                <input
                  id={id('email')}
                  name="email"
                  type="email"
                  inputMode="email"
                  className={styles.input}
                  autoComplete="email"
                  autoCapitalize="off"
                  spellCheck={false}
                  enterKeyHint="next"
                  required
                  maxLength={LIMIT.email}
                  value={values.email}
                  onChange={change('email')}
                  onBlur={leave('email')}
                  onKeyDown={onEnter}
                  aria-invalid={err.email ? true : undefined}
                  aria-describedby={describedBy('email')}
                />
                {fieldError('email')}
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor={id('organization')} className={styles.label}>
              Practice or firm <span className={styles.optional}>Optional</span>
            </label>
            <input
              id={id('organization')}
              name="organization"
              type="text"
              className={styles.input}
              autoComplete="organization"
              enterKeyHint="next"
              maxLength={LIMIT.organization}
              value={values.organization}
              onChange={change('organization')}
              onKeyDown={onEnter}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={id('message')} className={styles.label}>
              What is going on?
            </label>
            <p id={id('message-hint')} className={styles.hint}>
              Your site address and what is not working is plenty.
            </p>
            <div className={styles.control}>
              <textarea
                id={id('message')}
                name="message"
                className={`${styles.input} ${styles.textarea}`}
                rows={6}
                required
                maxLength={LIMIT.message}
                value={values.message}
                onChange={change('message')}
                onBlur={leave('message')}
                aria-invalid={err.message ? true : undefined}
                aria-describedby={describedBy('message', true)}
              />
              {fieldError('message')}
            </div>
          </div>

          {/* A trap for bots: hidden from people and screen readers, and named so browsers never autofill it. */}
          <div className={styles.trap} aria-hidden="true">
            <label htmlFor={id('trap')}>Leave this field empty</label>
            <input ref={trapRef} id={id('trap')} name="hp_extra" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>

          <div className={styles.foot}>
            {/* aria-disabled rather than disabled, so keyboard focus stays on the button while it sends.
                Both labels share one cell, so the button keeps its size when one replaces the other. */}
            <button type="submit" className={styles.submit} aria-disabled={sending || undefined} data-sending={sending || undefined}>
              <span className={styles.submitLabel} aria-hidden={sending || undefined}>
                <span>{topic === 'check' ? 'Request the check' : 'Send request'}</span>
                <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className={styles.submitBusy} aria-hidden={sending ? undefined : true}>
                <span className={styles.spinner} aria-hidden="true" />
                <span>Sending</span>
              </span>
            </button>
            <p className={styles.reply}>
              <span className={styles.replyDot} aria-hidden="true" />
              Replies within one business day
            </p>
          </div>
        </form>
      )}
      {phase === 'sent' ? null : (
        // What went wrong, in view under the form. The live region below reads the same words aloud.
        <Reveal show={showNotice}>
          <p ref={noticeRef} className={styles.status} aria-hidden="true">
            {notice}
          </p>
        </Reveal>
      )}
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
    </div>
  );
}

/**
 * A note that comes and goes under a control: the space opens and the words arrive once there is
 * room; closing is quicker and the words leave first. Instant with reduced motion.
 */
function Reveal({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <div className={styles.reveal} data-show={show || undefined} aria-hidden={show ? undefined : true}>
      <div className={styles.revealClip}>{children}</div>
    </div>
  );
}

function FieldError({ id, text, show }: { id: string; text: string; show: boolean }) {
  return (
    <Reveal show={show}>
      <p id={id} className={styles.error}>
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 4.6v4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11.2" r="0.95" fill="currentColor" />
        </svg>
        <span>{text}</span>
      </p>
    </Reveal>
  );
}
