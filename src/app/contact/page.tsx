'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Linkedin, ArrowUpRight, Send, Check } from 'lucide-react';
import MaskedReveal from '@/components/MaskedReveal';
import ParallaxImage from '@/components/ParallaxImage';
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
        className="rounded-2xl border border-accent/20 bg-accent/[0.03] p-10 md:p-14 text-center"
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground mb-3">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-colors duration-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground mb-3">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-colors duration-500"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground mb-3">
          Message
        </label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-colors duration-500 resize-none"
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

      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group flex items-center gap-3 text-base font-medium tracking-tight bg-foreground text-background px-8 py-4 rounded-full hover:bg-accent hover:text-background transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending...' : 'Send message'}
          <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
        </button>

        <a
          href="https://www.linkedin.com/in/kareemhassanein"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors duration-500"
        >
          <Linkedin size={18} className="opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="hidden md:inline">Connect on LinkedIn</span>
          <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
        </a>
      </div>
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
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), springConfig);
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

      {/* Atmospheric Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 will-change-transform">
        <ParallaxImage
          src="/images/bridging_soft.png"
          alt="Connection"
          className="w-full h-full opacity-40"
          fadedVertical={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/80" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full pt-40 md:pt-48 pb-20 flex-grow will-change-transform"
      >
        {/* Centered Heading */}
        <div className="max-w-3xl mx-auto text-center px-6 mb-16 md:mb-20">
          <motion.span
            style={{ opacity: labelOpacity, y: labelY }}
            className="block text-[10px] font-bold tracking-[0.6em] text-accent/60 uppercase mb-8"
          >
            Contact
          </motion.span>

          <motion.h1
            style={{ opacity: headingOpacity, y: headingY }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 leading-[0.85]"
          >
            Get in{" "}
            <span className="opacity-60 italic font-light font-serif">
              <MaskedReveal delay={0.4} className="py-2">touch.</MaskedReveal>
            </span>
          </motion.h1>

          <motion.p
            style={{ opacity: descOpacity, y: descY }}
            className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed italic max-w-xl mx-auto"
          >
            Have a workflow that needs fixing? A system that nobody uses? Let&apos;s figure it out.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto px-6"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10">
            <ContactForm />
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-white/[0.02] backdrop-blur-2xl">
        <div className="section-container flex flex-col md:flex-row justify-between items-end py-12 gap-8">
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
