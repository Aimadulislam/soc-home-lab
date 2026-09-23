import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
  showLabel = true,
}) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] bg-[var(--bg-inner)] border border-[var(--border-color)] font-mono text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${className}`}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to light cybersecurity theme' : 'Switch to dark cybersecurity theme'}
    >
      {isDark ? (
        <>
          <Moon className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
          {showLabel && <span>[ Moon ]</span>}
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />
          {showLabel && <span>[ Sun ]</span>}
        </>
      )}
    </button>
  );
};
