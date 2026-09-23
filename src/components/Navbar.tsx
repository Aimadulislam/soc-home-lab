import React from 'react';
import { Shield, Github } from 'lucide-react';
import { Theme } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  activeFilter: string;
  onSelectFilter: (category: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-page)]/95 backdrop-blur-md border-b border-[var(--border-color)]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark / Identity */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-base sm:text-lg font-mono font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label="Security Engineering Portfolio Home"
        >
          <div className="w-8 h-8 rounded-[6px] bg-[var(--bg-card-subtle)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)]">
            <Shield className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="font-mono tracking-wider text-sm sm:text-base">SEC.ENG // PORTFOLIO</span>
          <span className="text-[var(--accent)] text-[11px] font-mono font-normal hidden sm:inline px-1.5 py-0.5 rounded-[4px] bg-[var(--accent)]/10 border border-[var(--border-color)] uppercase">
            SOC / Blue Team
          </span>
        </a>

        {/* Zone 2: Section Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-[var(--text-muted)]">
          <a
            href="#projects"
            className="hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          >
            PROJECTS
          </a>
          <a
            href="#architecture"
            className="hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          >
            ARCHITECTURE
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          >
            CONTACT
          </a>
        </nav>

        {/* Zone 3: Primary Action Links + Theme Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Switcher Toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} showLabel={false} />

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] bg-transparent border border-[var(--border-color)] font-mono text-xs font-semibold text-[var(--accent-btn)] hover:border-[var(--accent-btn)] hover:bg-[var(--accent)]/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-btn)]"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
