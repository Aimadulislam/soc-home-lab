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
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-page)] border-b border-[var(--border-color)]">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-14 flex items-center justify-between">
        {/* Wordmark / Identity */}
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label="Security Engineering Portfolio Home"
        >
          <div className="w-7 h-7 rounded-[4px] bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent)]">
            <Shield className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
          <span className="font-sans font-medium text-sm">Security Engineering</span>
          <span className="text-[var(--text-muted)] text-[11px] font-mono ml-1 hidden sm:inline">
            / Labs
          </span>
        </a>

        {/* Action Links & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher Toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} showLabel={false} />

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-transparent border border-[var(--border-color)] font-mono text-xs font-semibold text-[var(--accent-btn)] hover:border-[var(--accent-btn)] hover:bg-[var(--accent)]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-btn)]"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
