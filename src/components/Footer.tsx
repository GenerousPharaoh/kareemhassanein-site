import { Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left side */}
          <div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Kareem Hassanein
            </p>
            <p className="text-sm text-gray-500">
              Implementation & Workflow Optimization
            </p>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:kareem.hassanein@gmail.com"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://linkedin.com/in/kareemhassanein"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/GenerousPharaoh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            {new Date().getFullYear()} Kareem Hassanein
          </p>
        </div>
      </div>
    </footer>
  );
}
