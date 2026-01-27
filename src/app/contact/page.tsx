'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Linkedin, ArrowUpRight, Send, Check } from 'lucide-react';
import MaskedReveal from '@/components/MaskedReveal';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setStatus('error');
        return;
      }

      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-accent/20 bg-accent/[0.03] p-10 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-5 h-5 text-accent" />
        </div>
        <p className="text-xl font-medium tracking-tight mb-2">Message sent.</p>
        <p className="text-sm text-muted-foreground">I will get back to you shortly.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm text-accent/70 hover:text-accent transition-colors duration-300"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-colors duration-500"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-colors duration-500"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-colors duration-500 resize-none"
          placeholder="What can I help with?"
        />
      </div>

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-400/80"
        >
          {errorMsg}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group flex items-center gap-3 text-sm font-medium tracking-tight bg-foreground text-background px-7 py-3.5 rounded-full hover:bg-accent hover:text-background transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
        <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
      </button>
    </form>
  );
}

export default function Contact() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const springConfig = { stiffness: 100, damping: 30 };
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 30]), springConfig);

  const labelOpacity = useSpring(0, springConfig);
  const labelY = useSpring(20, springConfig);
  const headingOpacity = useSpring(0, springConfig);
  const headingY = useSpring(40, springConfig);
  const descOpacity = useSpring(0, springConfig);
  const descY = useSpring(30, springConfig);

  useEffect(() => {
    setTimeout(() => { labelOpacity.set(0.4); labelY.set(0); }, 100);
    setTimeout(() => { headingOpacity.set(1); headingY.set(0); }, 300);
    setTimeout(() => { descOpacity.set(1); descY.set(0); }, 500);
  }, [labelOpacity, labelY, headingOpacity, headingY, descOpacity, descY]);

  return (
    <main ref={heroRef} className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-background">

      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <motion.div
        style={{ y: textY }}
        className="section-container relative z-10 w-full pt-32 md:pt-36 pb-16 flex-grow flex items-center will-change-transform"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start w-full">
          {/* Left Column - Heading + Illustration */}
          <div>
            <motion.span
              style={{ opacity: labelOpacity, y: labelY }}
              className="block text-[10px] font-bold tracking-[0.6em] text-accent/60 uppercase mb-5"
            >
              Contact
            </motion.span>

            <motion.h1
              style={{ opacity: headingOpacity, y: headingY }}
              className="text-5xl md:text-[80px] lg:text-[100px] font-medium tracking-tighter mb-7 leading-[0.85]"
            >
              Get in <br />
              <span className="opacity-60 italic font-light font-serif">
                <MaskedReveal delay={0.4} className="py-2">touch.</MaskedReveal>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-[1px] w-24 bg-accent/30 mb-6 origin-left"
            />

            <motion.p
              style={{ opacity: descOpacity, y: descY }}
              className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed italic max-w-xl mb-8"
            >
              Have a workflow that needs fixing? A system that nobody uses? Let&apos;s figure it out.
            </motion.p>

            {/* Illustration - below description, natural flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block max-w-sm"
            >
              <Image
                src="/images/contact.png"
                alt="Contact"
                width={500}
                height={350}
                className="w-full h-auto rounded-2xl opacity-90"
              />
            </motion.div>
          </div>

          {/* Right Column - Form + LinkedIn */}
          <div className="lg:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 md:p-7"
            >
              <ContactForm />
            </motion.div>

            {/* LinkedIn - subtle below form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4 flex items-center justify-center gap-3"
            >
              <div className="h-[1px] flex-1 bg-white/5" />
              <a
                href="https://www.linkedin.com/in/kareemhassanein"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-sm text-muted-foreground/60 hover:text-accent transition-colors duration-500 px-4"
              >
                <Linkedin size={16} className="opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} className="opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
              <div className="h-[1px] flex-1 bg-white/5" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-white/[0.02] backdrop-blur-2xl">
        <div className="section-container flex flex-col md:flex-row justify-between items-end py-8 gap-6">
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-medium tracking-widest text-accent/50 uppercase">Kareem Hassanein</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col items-end gap-2 text-[10px] uppercase tracking-[0.3em] font-medium text-muted-foreground/70 pb-2"
          >
            <div className="flex gap-8">
              <span>Burlington, ON</span>
              <span>Available remotely</span>
            </div>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />
            <span>&copy; 2026 &middot; All Rights Reserved</span>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
