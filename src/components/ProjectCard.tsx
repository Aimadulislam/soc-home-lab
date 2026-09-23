import React from 'react';
import {
  Folder,
  CheckCircle2,
  Github,
  Cpu,
  Server,
  Terminal,
  Database,
  Network,
  Shield,
  FileCode2,
  Activity,
  Boxes,
} from 'lucide-react';
import { Project } from '../types/project';

export interface ProjectCardProps {
  project: Project;
  onOpenDetails?: (project: Project) => void;
  className?: string;
}

// Map technology names to relevant professional technical icons
const getTechIcon = (tech: string) => {
  const lower = tech.toLowerCase();
  if (lower.includes('splunk') || lower.includes('elastic') || lower.includes('zeek')) {
    return <Activity className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }
  if (lower.includes('snort') || lower.includes('suricata') || lower.includes('ufw') || lower.includes('shield')) {
    return <Shield className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }
  if (lower.includes('virtualbox') || lower.includes('docker') || lower.includes('vm')) {
    return <Boxes className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }
  if (lower.includes('linux') || lower.includes('kali') || lower.includes('bash') || lower.includes('terminal')) {
    return <Terminal className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }
  if (lower.includes('server') || lower.includes('wazuh') || lower.includes('sysmon') || lower.includes('windows')) {
    return <Server className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }
  if (lower.includes('wireshark') || lower.includes('network') || lower.includes('tcp') || lower.includes('pcap')) {
    return <Network className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }
  if (lower.includes('database') || lower.includes('sql') || lower.includes('misp')) {
    return <Database className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }
  if (lower.includes('audit') || lower.includes('code') || lower.includes('python')) {
    return <FileCode2 className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }
  return <Cpu className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails, className = '' }) => {
  const difficultyDisplay = project.difficulty || project.level || 'ADVANCED';

  return (
    <article
      tabIndex={0}
      className={`group relative flex flex-col sm:flex-row w-full max-w-[590px] sm:h-[505px] p-[20px] rounded-[18px] bg-[#091121] border border-[rgba(65,125,170,0.25)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-250 ease-out hover:-translate-y-[2px] hover:border-[rgba(85,216,255,0.45)] hover:shadow-[0_16px_36px_rgba(4,9,20,0.7)] focus-within:border-[rgba(85,216,255,0.45)] focus-within:ring-1 focus-within:ring-[rgba(85,216,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55D8FF]/70 gap-[20px] text-left ${className}`}
      aria-label={`Project: ${project.title}`}
    >
      {/* LEFT: Project Image / Thumbnail (Width: 120px, Height: 270px on desktop) */}
      <div className="relative w-full sm:w-[120px] h-[180px] sm:h-[270px] shrink-0 self-start rounded-[12px] overflow-hidden bg-[#070D1A] border border-[rgba(65,125,170,0.2)]">
        {/* Background Image */}
        <img
          src={project.image}
          alt={`Infrastructure setup for ${project.title}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.06]"
        />

        {/* Dark subtle transparent overlay */}
        <div className="absolute inset-0 bg-[#070D1A]/35 pointer-events-none" />

        {/* LEVEL / DIFFICULTY BADGE: Top-left corner over the image */}
        <div className="absolute top-[10px] left-[10px] z-10">
          <span
            className="inline-flex items-center px-[8px] py-[2px] rounded-[4px] bg-[#070D1A] border border-[rgba(244,200,74,0.3)] text-[#F4C84A] font-mono text-[12px] font-bold tracking-[1px] uppercase shadow-xs"
            title={`Difficulty: ${difficultyDisplay}`}
            aria-label={`Difficulty: ${difficultyDisplay}`}
          >
            {difficultyDisplay}
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
            <div className="inline-flex items-center h-[38px] px-[14px] py-[10px] rounded-[6px] bg-[rgba(13,25,46,0.7)] border border-[rgba(65,125,170,0.35)] text-[#4FD8FF] font-mono text-[12px] font-semibold tracking-[1px] uppercase">
              <Folder className="w-[14px] h-[14px] mr-[8px] text-[#4FD8FF] shrink-0" aria-hidden="true" />
              <span>{project.category}</span>
            </div>

            {/* Status Badge */}
            <div className="inline-flex items-center h-[38px] px-[14px] py-[10px] rounded-[6px] bg-[rgba(13,25,46,0.7)] border border-[rgba(65,125,170,0.35)] text-[#4FD8FF] font-mono text-[12px] font-semibold tracking-[1px] uppercase">
              <CheckCircle2 className="w-[14px] h-[14px] mr-[8px] text-[#4FD8FF] shrink-0" aria-hidden="true" />
              <span>{project.status}</span>
            </div>
          </div>

          {/* PROJECT TITLE */}
          <h3
            onClick={() => onOpenDetails?.(project)}
            onKeyDown={(e) => {
              if (onOpenDetails && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onOpenDetails(project);
              }
            }}
            tabIndex={onOpenDetails ? 0 : undefined}
            role={onOpenDetails ? 'button' : undefined}
            aria-label={onOpenDetails ? `Open architectural details for ${project.title}` : undefined}
            className={`font-sans text-[24px] font-bold leading-[1.35] text-[#E8EEF8] mb-[12px] ${
              onOpenDetails ? 'cursor-pointer hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#55D8FF] rounded-[2px]' : ''
            }`}
          >
            {project.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="font-sans text-[17px] sm:text-[18px] leading-[1.75] text-[#7185A7] mb-[16px]">
            {project.description}
          </p>

          {/* TECHNOLOGY TAGS */}
          <div className="flex flex-wrap gap-[8px]" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-[6px] px-[11px] py-[7px] rounded-[5px] bg-[rgba(30,39,57,0.65)] border border-[rgba(90,110,145,0.22)] font-mono text-[14px] font-semibold text-[#B9C3D3] transition-colors hover:border-[rgba(120,150,190,0.45)] hover:text-[#E8EEF8]"
              >
                {getTechIcon(tech)}
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: Divider & Code Button */}
        <div className="mt-auto">
          {/* THIN HORIZONTAL DIVIDER */}
          <div
            className="mt-[26px] mb-[16px] border-t border-[rgba(100,120,150,0.22)] w-full"
            aria-hidden="true"
          />

          {/* CODE BUTTON */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full h-[54px] rounded-[6px] bg-transparent border border-[rgba(53,133,174,0.5)] font-mono text-[16px] font-semibold tracking-[1px] text-[#55D8FF] transition-all duration-200 hover:border-[#55D8FF] hover:text-[#7DE2FF] hover:bg-[rgba(85,216,255,0.06)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55D8FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#091121]"
            aria-label={`View code on GitHub for ${project.title}`}
          >
            <Github className="w-[18px] h-[18px] mr-[10px] text-[#55D8FF] shrink-0" aria-hidden="true" />
            <span>Code</span>
          </a>
        </div>
      </div>
    </article>
  );
};
