import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Folder,
  Github,
  Share2,
  Check,
  Server,
  Activity,
  Target,
  Terminal,
  ShieldCheck,
  Code2,
  Copy,
} from 'lucide-react';
import { Project } from '../types/project';
import { getTechIcon, getStatusIcon, getDifficultyStyle } from '../utils/techIcons';
import { ProjectArchitectureFlow } from './ProjectArchitectureFlow';

interface ProjectDetailDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const ProjectDetailDrawer: React.FC<ProjectDetailDrawerProps> = ({
  project,
  isOpen,
  onClose,
  triggerRef,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  // Keyboard accessibility (ESC to close) and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Save currently focused element to restore upon close
    lastActiveElementRef.current = (document.activeElement as HTMLElement) || triggerRef?.current;

    // Lock body scrolling safely
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      // Simple focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);

      // Return focus to trigger element
      if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
        lastActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!project) return null;

  const difficulty = project.difficulty || project.level || 'ADVANCED';
  const difficultyStyle = getDifficultyStyle(difficulty);

  // Social Sharing & Copy link handler
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?project=${project.id}`;
    const shareData = {
      title: `${project.title} | Cybersecurity Project`,
      text: project.overview || project.description,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Manual fallback
    }
  };

  const handleCopySnippet = () => {
    if (project.architectureDetails?.sampleSnippet) {
      navigator.clipboard.writeText(project.architectureDetails.sampleSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-project-title"
      aria-describedby="drawer-project-desc"
      className={`fixed inset-0 z-50 transition-opacity duration-250 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background Overlay (Darkened page behind drawer) */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#040812]/80 transition-opacity duration-250"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Container */}
      <aside
        ref={drawerRef}
        className={`absolute top-0 right-0 h-full w-full sm:w-[540px] md:w-[600px] lg:w-[620px] max-w-full bg-[var(--bg-card)] border-l border-[var(--border-color)] shadow-[0_12px_40px_rgba(0,0,0,0.65)] flex flex-col justify-between transition-transform duration-250 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* DRAWER HEADER (Sticky) */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {/* Badges row: Category, Status, Difficulty */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="inline-flex items-center px-2.5 py-1 rounded-[5px] bg-[var(--bg-inner)] border border-[var(--border-subtle)] font-mono text-[11px] font-semibold text-[var(--accent)] tracking-[0.5px] uppercase">
                <Folder className="w-3 h-3 mr-1.5 text-[var(--accent)]" aria-hidden="true" />
                <span>{project.category}</span>
              </span>

              <span className="inline-flex items-center px-2.5 py-1 rounded-[5px] bg-[var(--bg-inner)] border border-[var(--border-subtle)] font-mono text-[11px] font-semibold text-[var(--accent)] tracking-[0.5px] uppercase">
                {getStatusIcon(project.status)}
                <span>{project.status}</span>
              </span>

              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-[4px] bg-[var(--bg-inner)] border font-mono text-[11px] font-bold tracking-[0.5px] uppercase ${difficultyStyle.text} ${difficultyStyle.border}`}
                title={`Difficulty: ${difficultyStyle.label}`}
              >
                {difficultyStyle.label}
              </span>
            </div>

            {/* Project Title */}
            <h2
              id="drawer-project-title"
              className="font-sans text-xl sm:text-2xl font-bold leading-snug text-[var(--text-primary)]"
            >
              {project.title}
            </h2>
          </div>

          {/* Actions: Share & Close */}
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            {/* Share / Copy URL Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-[6px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-inner)] border border-transparent hover:border-[var(--border-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              title="Share or copy project URL"
              aria-label="Share or copy link to this project"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            {/* Accessible Live Region for Copy Feedback */}
            <div aria-live="polite" className="sr-only">
              {copiedLink ? 'Project link copied to clipboard' : ''}
            </div>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 rounded-[6px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-inner)] border border-transparent hover:border-[var(--border-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Close project documentation drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DRAWER SCROLLABLE CONTENT */}
        <div
          id="drawer-project-desc"
          className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-left focus:outline-none"
          tabIndex={-1}
        >
          {/* Link Copied Notification */}
          {copiedLink && (
            <div
              role="status"
              className="flex items-center justify-between px-3 py-2 rounded-[6px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold tracking-wider uppercase"
            >
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>LINK COPIED TO CLIPBOARD</span>
              </div>
              <span className="text-[10px] text-emerald-400/80">DIRECT URL</span>
            </div>
          )}

          {/* SECTION 1: PROJECT OVERVIEW */}
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>PROJECT OVERVIEW</span>
            </div>
            <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[var(--text-muted)]">
              {project.overview || project.description}
            </p>
          </div>

          <div className="border-t border-[var(--border-subtle)]" />

          {/* SECTION 2: OBJECTIVES */}
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px] uppercase">
              <Target className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>OBJECTIVES</span>
            </div>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              {(
                project.objectives || [
                  'Build an isolated virtual SOC environment for defensive testing',
                  'Deploy Snort IDS for promiscuous packet inspection',
                  'Configure Splunk for centralized log ingestion and alerting',
                  'Generate security events and simulated web attacks',
                  'Analyze alerts and isolate suspicious anomalous traffic',
                  'Practice tiered incident investigation workflows',
                ]
              ).map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[var(--accent)] mt-0.5">▸</span>
                  <span className="leading-snug">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[var(--border-subtle)]" />

          {/* SECTION 3: LAB ARCHITECTURE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px] uppercase">
                <Server className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>LAB ARCHITECTURE</span>
              </div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Isolated Topology
              </span>
            </div>

            {/* Architecture Node Diagram */}
            <ProjectArchitectureFlow nodes={project.architectureFlow} />
          </div>

          <div className="border-t border-[var(--border-subtle)]" />

          {/* SECTION 4: ENVIRONMENT */}
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px] uppercase">
              <Activity className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>ENVIRONMENT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(
                project.environment || [
                  { label: 'Hypervisor', value: 'VirtualBox' },
                  { label: 'Attacker', value: 'Kali Linux' },
                  { label: 'Server', value: 'Ubuntu Server' },
                  { label: 'IDS', value: 'Snort' },
                  { label: 'SIEM', value: 'Splunk Enterprise' },
                  { label: 'Network', value: 'Isolated Virtual Lab' },
                ]
              ).map((env, i) => (
                <div
                  key={i}
                  className="flex flex-col p-2.5 rounded-[6px] bg-[var(--bg-inner)] border border-[var(--border-subtle)]"
                >
                  <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] tracking-wider uppercase">
                    {env.label}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[var(--text-primary)] mt-0.5 truncate">
                    {env.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border-subtle)]" />

          {/* SECTION 5: TECHNOLOGY STACK */}
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px] uppercase">
              <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>TECHNOLOGY STACK</span>
            </div>

            <div className="flex flex-wrap gap-2" aria-label="Technologies used">
              {project.technologies.map((tech) => {
                const techName = typeof tech === 'string' ? tech : tech.name;
                return (
                  <span
                    key={techName}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[5px] bg-[var(--badge-bg)] border border-[var(--badge-border)] font-mono text-xs font-semibold text-[var(--badge-text)]"
                  >
                    {getTechIcon(tech)}
                    <span>{techName}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="border-t border-[var(--border-subtle)]" />

          {/* SECTION 6: SECURITY ACTIVITIES */}
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px] uppercase">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>SECURITY ACTIVITIES</span>
            </div>

            <div className="space-y-1.5">
              {(
                project.activities || [
                  'Network traffic monitoring',
                  'IDS rule testing',
                  'Security event generation',
                  'Log ingestion',
                  'Alert analysis',
                  'Incident investigation',
                  'SOC workflow testing',
                ]
              ).map((act, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] bg-[var(--bg-inner)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border-subtle)]" />

          {/* SECTION 7: RESULTS */}
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] font-bold text-[var(--text-muted)] tracking-[1.5px] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>RESULTS</span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-[var(--text-muted)] bg-[var(--bg-inner)] p-3 rounded-[6px] border border-[var(--border-subtle)]">
              {project.results ||
                'Successfully created an isolated virtual SOC environment capable of generating, collecting, and analyzing security events through Snort and Splunk.'}
            </p>
          </div>

          {/* OPTIONAL DETECTION SNIPPET */}
          {project.architectureDetails?.sampleSnippet && (
            <div>
              <div className="border-t border-[var(--border-subtle)] my-6" />
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{project.architectureDetails.sampleSnippetTitle || 'Detection Signature'}</span>
                </div>
                <button
                  onClick={handleCopySnippet}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[var(--bg-inner)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                >
                  {copiedSnippet ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-[6px] bg-[var(--bg-inner)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent)] overflow-x-auto leading-relaxed">
                <code>{project.architectureDetails.sampleSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* DRAWER FOOTER: SOURCE CODE ACTION */}
        <div className="sticky bottom-0 z-20 px-6 py-4 bg-[var(--bg-card)] border-t border-[var(--border-subtle)]">
          <div className="mb-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            <span>SOURCE CODE</span>
            <span className="text-[10px] text-[var(--text-muted)]/80">Verified Repository</span>
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full h-[52px] rounded-[6px] bg-transparent border border-[var(--accent-btn)]/50 font-mono text-[15px] font-semibold tracking-[0.5px] text-[var(--accent-btn)] transition-all duration-200 hover:border-[var(--accent-btn)] hover:bg-[var(--accent)]/10 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-btn)]"
            aria-label={`View source code on GitHub for ${project.title}`}
          >
            <Github className="w-[18px] h-[18px] mr-2 text-[var(--accent-btn)] shrink-0" aria-hidden="true" />
            <span>VIEW SOURCE CODE</span>
          </a>
        </div>
      </aside>
    </div>
  );
};
