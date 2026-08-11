'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Send } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status === 'sent') statusRef.current?.focus();
    if (status === 'error') errorRef.current?.focus();
  }, [status]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, organization, message, company }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('sent');
      setName('');
      setEmail('');
      setOrganization('');
      setMessage('');
      setCompany('');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="flex min-h-[460px] flex-col items-start justify-center outline-none"
      >
        <span className="mb-7 flex h-12 w-12 items-center justify-center border border-[#25292f]/20">
          <Check aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2 className="text-4xl font-medium tracking-[-0.045em]">Message sent.</h2>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-[#25292f]/68">Thank you. I will get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="mt-8 min-h-11 text-sm font-semibold underline underline-offset-4">
          Send another message
        </button>
      </motion.div>
    );
  }

  const inputClass =
    'w-full border border-[#25292f]/20 bg-transparent px-4 py-3.5 text-[#25292f] placeholder:text-[#25292f]/60 transition-colors duration-300 focus-visible:border-[#25292f]/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25292f]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eee8df]';
  const labelClass = 'mb-2.5 block text-xs font-semibold uppercase tracking-[0.15em] text-[#25292f]/68';

  return (
    <form onSubmit={handleSubmit} aria-busy={status === 'sending'}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" type="text" required maxLength={120} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} placeholder="you@example.com" />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="organization" className={labelClass}>Organization <span className="normal-case tracking-normal">(optional)</span></label>
        <input id="organization" name="organization" type="text" maxLength={160} autoComplete="organization" value={organization} onChange={(event) => setOrganization(event.target.value)} className={inputClass} placeholder="Clinic, company, or team" />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>Message <span aria-hidden="true">*</span></label>
        <textarea id="message" name="message" required maxLength={5000} value={message} onChange={(event) => setMessage(event.target.value)} rows={7} className={`${inputClass} min-h-40 resize-y`} placeholder="What should work better?" aria-describedby={status === 'error' ? 'form-error' : undefined} />
      </div>

      {status === 'error' && (
        <motion.p ref={errorRef} tabIndex={-1} id="form-error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-sm font-medium text-[#8f2525] outline-none">
          {errorMsg}
        </motion.p>
      )}

      <button type="submit" disabled={status === 'sending'} className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#25292f] px-7 text-sm font-semibold text-[#f3eee6] transition-colors duration-300 hover:bg-[#15181c] disabled:cursor-wait disabled:opacity-55 sm:w-auto">
        {status === 'sending' ? 'Sending…' : 'Send message'}
        <Send aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>

      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
      </div>
    </form>
  );
}

const fit = [
  'A clinical or operational workflow creates avoidable friction.',
  'A technology rollout needs stronger adoption and follow-through.',
  'A service, process, or digital journey needs clearer structure.',
  'A useful idea needs disciplined implementation to become dependable.',
];

export default function ContactPage() {
  return (
    <main className="bg-background px-6 pb-24 pt-32 text-foreground sm:px-8 md:pb-32 md:pt-40 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.section initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="lg:col-span-6">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Contact</p>
            <h1 className="max-w-3xl text-[clamp(3rem,7.5vw,7.4rem)] font-medium leading-[0.9] tracking-[-0.065em]">
              Bring me the workflow that should work better.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/72">
              Tell me what is getting in the way, who the work affects, and what a better result would look like. I read
              every message personally.
            </p>

            <div className="mt-14 max-w-xl border-t border-white/[0.11]">
              <h2 className="py-5 text-xs font-semibold uppercase tracking-[0.18em] text-accent/80">A good fit when</h2>
              <ul>
                {fit.map((item) => (
                  <li key={item} className="grid grid-cols-[1.2rem_1fr] gap-3 border-t border-white/[0.11] py-4 text-sm leading-relaxed text-foreground/72 sm:text-base">
                    <span aria-hidden="true" className="font-mono text-accent">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a href="https://www.linkedin.com/in/kareemhassanein" className="group mt-9 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/72 transition-colors hover:text-accent">
              Connect on LinkedIn
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.16, ease }} aria-labelledby="contact-form-heading" className="bg-[#eee8df] p-6 text-[#25292f] sm:p-8 md:p-10 lg:col-span-6 lg:mt-12">
            <div className="mb-8 border-b border-[#25292f]/15 pb-6">
              <h2 id="contact-form-heading" className="text-2xl font-medium tracking-[-0.035em]">Start the conversation</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#25292f]/66">Name, email, and message are required.</p>
            </div>
            <ContactForm />
          </motion.section>
        </div>
      </div>
    </main>
  );
}
