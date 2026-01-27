'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Linkedin, ArrowUpRight, Send, Check } from 'lucide-react';
import MaskedReveal from '@/components/MaskedReveal';
import ParallaxImage from '@/components/ParallaxImage';
import { useRef, useEffect, useState } from 'react';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kareemhassanein', icon: <Linkedin className="w-5 h-5" /> },
];

function ContactLink({ link }: { link: typeof socialLinks[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightOpacity = useSpring(0, { stiffness: 100, damping: 30 });
  const spotlightX = useSpring(0, { stiffness: 150, damping: 25 });
  const spotlightY = useSpring(0, { stiffness: 150, damping: 25 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        spotlightOpacity.set(0.15);
        scale.set(1.02);
      }}
      onMouseLeave={() => {
        spotlightOpacity.set(0);
        scale.set(1);
      }}
      style={{ scale }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-accent/20 transition-all duration-500"
    >
      <motion.div
        className="absolute pointer-events-none z-0 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)`,
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: spotlightOpacity,
        }}
      />
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 flex items-center justify-between p-8 md:p-10"
      >
        <div className="flex items-center gap-8 md:gap-10">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-500 text-foreground/70 group-hover:text-accent">
            {link.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-medium tracking-tight opacity-80 group-hover:opacity-100 transition-all duration-500 leading-none mb-1">{link.label}</span>
            <span className="text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-70 group-hover:text-accent transition-all duration-500 font-medium">Link</span>
          </div>
        </div>
        <ArrowUpRight className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 text-accent" />
      </a>
    </motion.div>
  );
}

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
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div>
        <label htmlFor="message" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground mb-3">
          Message
        </label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
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

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group flex items-center gap-3 text-base font-medium tracking-tight bg-foreground text-background px-8 py-4 rounded-full hover:bg-accent hover:text-background transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
        <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
      </button>
    </form>
  );
}

export default function Contact() {
  const heroRef = useRef(null);

  // Hero parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const springConfig = { stiffness: 100, damping: 30 };
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), springConfig);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 30]), springConfig);

  // Initial entrance animations
  const labelOpacity = useSpring(0, springConfig);
  const labelY = useSpring(20, springConfig);
  const headingOpacity = useSpring(0, springConfig);
  const headingY = useSpring(40, springConfig);
  const descOpacity = useSpring(0, springConfig);
  const descY = useSpring(30, springConfig);

  useEffect(() => {
    // Staggered entrance
    setTimeout(() => {
      labelOpacity.set(0.4);
      labelY.set(0);
    }, 100);
    setTimeout(() => {
      headingOpacity.set(1);
      headingY.set(0);
    }, 300);
    setTimeout(() => {
      descOpacity.set(1);
      descY.set(0);
    }, 500);
  }, [labelOpacity, labelY, headingOpacity, headingY, descOpacity, descY]);

  return (
    <main ref={heroRef} className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-background">

      {/* Subtle ambient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background to-background" />

      <motion.div
        style={{ y: textY }}
        className="section-container relative z-10 w-full pt-48 pb-24 flex-grow flex items-center will-change-transform"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 lg:gap-32 items-start w-full">
          <div>
            {/* Contact illustration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 w-48 md:w-56 opacity-80"
            >
              <img
                src="/images/contact.png"
                alt="Contact"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>

            <motion.span
              style={{ opacity: labelOpacity, y: labelY }}
              className="block text-[10px] font-bold tracking-[0.6em] text-accent/60 uppercase mb-8"
            >
              Contact
            </motion.span>

            <motion.h1
              style={{ opacity: headingOpacity, y: headingY }}
              className="text-6xl md:text-[100px] lg:text-[120px] font-medium tracking-tighter mb-16 leading-[0.85]"
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
              className="h-[1px] w-24 bg-accent/30 mb-8 origin-left"
            />

            <motion.p
              style={{ opacity: descOpacity, y: descY }}
              className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12 italic max-w-xl"
            >
              Have a workflow that needs fixing? A system that nobody uses? Let&apos;s figure it out.
            </motion.p>
          </div>

          <div className="space-y-8 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 my-2">
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 font-medium">or</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {socialLinks.map((link, i) => (
                <ContactLink key={link.label} link={link} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Premium Anchor Footer */}
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
