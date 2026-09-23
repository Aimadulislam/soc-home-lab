import React from 'react';
import { Folder, Github, ExternalLink } from 'lucide-react';
import { Project } from '../types/project';
import { getTechIcon, getStatusIcon, getDifficultyStyle } from '../utils/techIcons';

export interface ProjectCardProps {
  project: Project;
  onOpenDetails?: (project: Project) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails, className = '' }) => {
  const difficulty = project.difficulty || project.level || 'ADVANCED';
  const difficultyStyle = getDifficultyStyle(difficulty);

  const handleCardClick = (e: React.MouseEvent) => {
    // Only open details if user didn't click an anchor tag or interactive button
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    if (onOpenDetails) {
      onOpenDetails(project);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement;
      if (!target.closest('a') && !target.closest('button')) {
        e.preventDefault();
        onOpenDetails?.(project);
      }
    }
  };

  return (
    <article
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col sm:flex-row w-full max-w-[590px] sm:h-[505px] p-[20px] rounded-[18px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[var(--shadow-card)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-card-hover)] focus-within:border-[var(--border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60 gap-[20px] text-left cursor-pointer ${className}`}
      aria-label={`Project: ${project.title}. Open technical investigation report.`}
    >
      {/* LEFT: Project Image Thumbnail (Width: 120px, Height: 270px on desktop) */}
      <div
        className="relative w-full sm:w-[120px] h-[180px] sm:h-[270px] shrink-0 self-start rounded-[12px] overflow-hidden bg-[var(--bg-inner)] border border-[var(--border-subtle)]"
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetails?.(project);
        }}
      >
        <img
          src={project.image}
          alt={`Infrastructure view for ${project.title}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.04] transition-all duration-250 ease-out group-hover:scale-[1.02] group-hover:brightness-[0.92]"
        />

        {/* Dark subtle overlay */}
        <div className="absolute inset-0 bg-[#070D1A]/35 pointer-events-none" />

        {/* DYNAMIC DIFFICULTY BADGE: Top-left corner inside the image */}
        <div className="absolute top-[10px] left-[10px] z-10 pointer-events-none">
          <span
            className={`inline-flex items-center px-[8px] py-[2px] rounded-[4px] bg-[#070D1A] border font-mono text-[12px] font-bold tracking-[1px] uppercase shadow-xs ${difficultyStyle.text} ${difficultyStyle.border}`}
            title={`Difficulty Level: ${difficultyStyle.label}`}
            aria-label={`Difficulty level: ${difficultyStyle.label}`}
          >
            {difficultyStyle.label}
          </span>
        </div>
      </div>

      {/* RIGHT: Project Information */}
      <div className="flex-1 flex flex-col justify-between min-w-0 h-full">
        {/* Top & Middle Content */}
        <div>
          {/* TOP STATUS BADGES */}
          <div className="flex items-center gap-[10px] mb-[14px]">
            {/* Category Badge */}
            <div className="inline-flex items-center h-[38px] px-[14px] py-[10px] rounded-[6px] bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--accent)] font-mono text-[12px] font-semibold tracking-[1px] uppercase transition-colors group-hover:border-[var(--border-hover)]">
              <Folder className="w-[14px] h-[14px] mr-[8px] text-[var(--accent)] shrink-0" aria-hidden="true" />
              <span>{project.category}</span>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center h-[38px] px-[14px] py-[10px] rounded-[6px] bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--accent)] font-mono text-[12px] font-semibold tracking-[1px] uppercase transition-colors group-hover:border-[var(--border-hover)]">
              {getStatusIcon(project.status)}
              <span>{project.status}</span>
            </div>
          </div>

          {/* PROJECT TITLE */}
          <h3
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails?.(project);
            }}
            className="font-sans text-[24px] font-bold leading-[1.35] text-[var(--text-primary)] group-hover:text-[var(--accent)] mb-[12px] transition-colors duration-200"
          >
            {project.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="font-sans text-[17px] sm:text-[18px] leading-[1.75] text-[var(--text-muted)] mb-[16px] line-clamp-3 sm:line-clamp-none">
            {project.description}
          </p>

          {/* TECHNOLOGY TAGS */}
          <div className="flex flex-wrap gap-[8px]" aria-label="Technologies used">
            {project.technologies.map((tech) => {
              const techName = typeof tech === 'string' ? tech : tech.name;
              return (
                <span
                  key={techName}
                  className="inline-flex items-center gap-[6px] px-[11px] py-[7px] rounded-[5px] bg-[var(--badge-bg)] border border-[var(--badge-border)] font-mono text-[14px] font-semibold text-[var(--badge-text)] transition-colors duration-200 group-hover:border-[var(--border-hover)] group-hover:text-[var(--badge-text-hover)]"
                >
                  {getTechIcon(tech)}
                  <span>{techName}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* BOTTOM SECTION: Divider & Code Button */}
        <div className="mt-auto">
          {/* THIN HORIZONTAL DIVIDER */}
          <div
            className="mt-[24px] mb-[16px] border-t border-[var(--border-subtle)] w-full"
            aria-hidden="true"
          />

          {/* ACTION BUTTON (Matching Reference Layout) */}
          {project.projectUrl ? (
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Code Button */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center h-[54px] rounded-[6px] bg-transparent border border-[var(--accent-btn)]/50 font-mono text-[15px] font-semibold tracking-[0.5px] text-[var(--accent-btn)] transition-all duration-200 hover:border-[var(--accent-btn)] hover:bg-[var(--accent)]/10 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-btn)]"
                aria-label={`View code on GitHub for ${project.title}`}
              >
                <Github className="w-[18px] h-[18px] mr-[8px] text-[var(--accent-btn)] shrink-0" aria-hidden="true" />
                <span>Code</span>
              </a>

              {/* View Project Button */}
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center h-[54px] rounded-[6px] bg-[var(--bg-card-subtle)] border border-[var(--border-color)] font-mono text-[15px] font-semibold tracking-[0.5px] text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label={`View project details for ${project.title}`}
              >
                <ExternalLink className="w-[16px] h-[16px] mr-[8px] text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span>View Project</span>
              </a>
            </div>
          ) : (
            /* Reference single full-width Code Button */
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center w-full h-[54px] rounded-[6px] bg-transparent border border-[var(--accent-btn)]/50 font-mono text-[15px] font-semibold tracking-[0.5px] text-[var(--accent-btn)] transition-all duration-200 hover:border-[var(--accent-btn)] hover:bg-[var(--accent)]/10 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-btn)]"
              aria-label={`View code on GitHub for ${project.title}`}
            >
              <Github className="w-[18px] h-[18px] mr-[8px] text-[var(--accent-btn)] shrink-0" aria-hidden="true" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
