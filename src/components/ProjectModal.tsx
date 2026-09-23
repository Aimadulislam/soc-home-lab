import React, { useEffect, useState } from 'react';
import {
  X,
  Github,
  Shield,
  Server,
  Terminal,
  Activity,
  Check,
  Copy,
} from 'lucide-react';
import { Project } from '../types/project';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const difficultyDisplay = project.difficulty || project.level || 'ADVANCED';

  const handleCopy = () => {
    if (project.architectureDetails?.sampleSnippet) {
      navigator.clipboard.writeText(project.architectureDetails.sampleSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#040812]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-[18px] bg-[#091121] border border-[rgba(65,125,170,0.35)] shadow-[0_24px_64px_rgba(0,0,0,0.85)] p-6 sm:p-8 text-left my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#7185A7] hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FD8FF]"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-[4px] bg-[#070D1A] border border-[rgba(244,200,74,0.35)] text-[#F4C84A] font-mono text-xs font-bold tracking-[1px] uppercase">
            {difficultyDisplay}
          </span>
          <span className="px-3 py-1 rounded-[6px] bg-[rgba(13,25,46,0.7)] border border-[rgba(65,125,170,0.35)] text-[#4FD8FF] font-mono text-xs font-semibold tracking-[1px]">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-[6px] bg-[rgba(13,25,46,0.7)] border border-[rgba(65,125,170,0.35)] text-[#4FD8FF] font-mono text-xs font-semibold tracking-[1px]">
            {project.status}
          </span>
        </div>

        <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-[#E8EEF8] mb-3">
          {project.title}
        </h2>

        <p className="text-[#7185A7] text-base sm:text-lg leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Technical Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-[5px] bg-[rgba(30,39,57,0.65)] border border-[rgba(90,110,145,0.22)] font-mono text-xs text-[#B9C3D3]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Architecture Details */}
        {project.architectureDetails && (
          <div className="space-y-6 pt-4 border-t border-[rgba(100,120,150,0.22)]">
            {/* Architecture Overview */}
            <div>
              <div className="flex items-center gap-2 text-sm font-mono font-semibold text-[#4FD8FF] uppercase tracking-wider mb-2">
                <Server className="w-4 h-4" />
                <span>Lab Architecture & Subnet Topology</span>
              </div>
              <p className="text-sm text-[#A0B0CB] leading-relaxed mb-3">
                {project.architectureDetails.summary}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.architectureDetails.nodes.map((node, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#070D1A]/80 border border-[rgba(65,125,170,0.2)] text-xs font-mono text-[#C5D2E5]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4FD8FF]" />
                    <span>{node}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MITRE ATT&CK Mappings */}
            <div>
              <div className="flex items-center gap-2 text-sm font-mono font-semibold text-[#4FD8FF] uppercase tracking-wider mb-2">
                <Shield className="w-4 h-4" />
                <span>MITRE ATT&CK Tactics Validated</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.architectureDetails.mitreTactics.map((tactic, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-md bg-[rgba(244,200,74,0.08)] border border-[rgba(244,200,74,0.25)] text-[#F4C84A] font-mono text-xs"
                  >
                    {tactic}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Deliverables */}
            <div>
              <div className="flex items-center gap-2 text-sm font-mono font-semibold text-[#4FD8FF] uppercase tracking-wider mb-2">
                <Activity className="w-4 h-4" />
                <span>Key Engineering Highlights</span>
              </div>
              <ul className="space-y-2">
                {project.architectureDetails.keyCapabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#A0B0CB]">
                    <span className="text-[#4FD8FF] mt-1">▹</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample Detection Rule / Snippet */}
            {project.architectureDetails.sampleSnippet && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#7185A7] uppercase tracking-wider">
                    <Terminal className="w-3.5 h-3.5 text-[#4FD8FF]" />
                    <span>{project.architectureDetails.sampleSnippetTitle || 'Detection Rule / Config'}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#070D1A] border border-[rgba(65,125,170,0.3)] text-xs font-mono text-[#4FD8FF] hover:border-[#4FD8FF] transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-lg bg-[#050A14] border border-[rgba(65,125,170,0.25)] text-xs font-mono text-[#8DE2FF] overflow-x-auto leading-relaxed">
                  <code>{project.architectureDetails.sampleSnippet}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-[rgba(100,120,150,0.22)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-[#7185A7]">
            Repository verified for reproducible deployment
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-[6px] font-mono text-sm text-[#7185A7] hover:text-[#E8EEF8] transition-colors"
            >
              Close
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-[6px] bg-transparent border border-[rgba(53,133,174,0.5)] font-mono text-sm font-semibold text-[#55D8FF] hover:border-[#55D8FF] hover:bg-[rgba(85,216,255,0.08)] transition-all"
            >
              <Github className="w-4 h-4 mr-2" />
              <span>View Repository</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
