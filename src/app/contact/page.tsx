'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6">
              Get in touch
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              Whether you have a project in mind, want to discuss a potential collaboration,
              or just want to connect, I&apos;d be happy to hear from you.
            </p>

            {/* Contact Methods */}
            <div className="space-y-6">
              <a
                href="mailto:kareem.hassanein@gmail.com"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow transition-shadow">
                  <Mail className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">kareem.hassanein@gmail.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/kareemhassanein"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow transition-shadow">
                  <Linkedin className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">LinkedIn</p>
                  <p className="text-gray-900 font-medium">linkedin.com/in/kareemhassanein</p>
                </div>
              </a>

              <a
                href="https://github.com/GenerousPharaoh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow transition-shadow">
                  <Github className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">GitHub</p>
                  <p className="text-gray-900 font-medium">github.com/GenerousPharaoh</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900 font-medium">Hamilton / Burlington, Ontario</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
