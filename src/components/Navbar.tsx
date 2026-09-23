import React from 'react';
import { Shield, Github, Terminal } from 'lucide-react';

interface NavbarProps {
  activeFilter: string;
  onSelectFilter: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#070D1A]/95 backdrop-blur-md border-b border-[rgba(65,125,170,0.2)]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark / Identity */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-base sm:text-lg font-mono font-bold tracking-tight text-[#E8EEF8] hover:text-[#4FD8FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FD8FF]"
          aria-label="Security Engineering Portfolio Home"
        >
          <div className="w-8 h-8 rounded-[6px] bg-[rgba(13,25,46,0.9)] border border-[rgba(65,125,170,0.35)] flex items-center justify-center text-[#4FD8FF]">
            <Shield className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="font-mono tracking-wider text-sm sm:text-base">SEC.ENG // PORTFOLIO</span>
          <span className="text-[#4FD8FF] text-[11px] font-mono font-normal hidden sm:inline px-1.5 py-0.5 rounded-[4px] bg-[#4FD8FF]/10 border border-[rgba(65,125,170,0.3)] uppercase">
            SOC / Blue Team
          </span>
        </a>

        {/* Zone 2: Section Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-[#8BA0C0]">
          <a
            href="#projects"
            className="hover:text-[#4FD8FF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4FD8FF]"
          >
            PROJECTS
          </a>
          <a
            href="#architecture"
            className="hover:text-[#4FD8FF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4FD8FF]"
          >
            ARCHITECTURE
          </a>
          <a
            href="#contact"
            className="hover:text-[#4FD8FF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4FD8FF]"
          >
            CONTACT
          </a>
        </nav>

        {/* Zone 3: Primary Action Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] bg-transparent border border-[rgba(65,125,170,0.4)] font-mono text-xs font-semibold text-[#55D8FF] hover:border-[#55D8FF] hover:bg-[rgba(85,216,255,0.06)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55D8FF]"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[6px] bg-[rgba(13,25,46,0.8)] border border-[rgba(65,125,170,0.4)] font-mono text-xs font-semibold text-[#E8EEF8] hover:border-[#4FD8FF] hover:text-[#4FD8FF] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FD8FF]"
          >
            <Terminal className="w-3.5 h-3.5 text-[#4FD8FF]" aria-hidden="true" />
            <span>Connect</span>
          </a>
        </div>
      </div>
    </header>
  );
};
