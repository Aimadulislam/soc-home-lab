import React, { useState, useMemo } from 'react';
import {
  Shield,
  Activity,
  Server,
  Terminal,
  Filter,
  CheckCircle2,
  FolderGit2,
  Lock,
  Layers,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Focus,
  ExternalLink,
} from 'lucide-react';
import { projects } from './data/projects';
import { Project, ProjectLevel } from './types/project';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { Navbar } from './components/Navbar';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'spotlight'>('grid');

  // Categories list
  const categories = ['ALL', 'HOME LAB', 'SOC LAB', 'NETWORK SECURITY', 'LINUX SECURITY', 'THREAT HUNTING'];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = selectedCategory === 'ALL' || p.category.toUpperCase() === selectedCategory;
      const matchLevel = selectedLevel === 'ALL' || p.level === selectedLevel;
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchLevel && matchSearch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="min-h-screen cyber-grid-bg text-[#E8EEF8] flex flex-col font-sans">
      {/* 3-Zone Navigation Bar */}
      <Navbar activeFilter={selectedCategory} onSelectFilter={setSelectedCategory} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16">
        {/* Section Heading & Subtitle */}
        <section id="projects" className="text-center sm:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#0c182e]/80 border border-[rgba(65,125,170,0.3)] text-[#4FD8FF] font-mono text-xs font-semibold tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FD8FF]" />
            <span>Defensive Operations & Detection Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#E8EEF8] mb-3">
            Security Projects
          </h1>

          <p className="text-base sm:text-lg text-[#7185A7] max-w-3xl leading-relaxed">
            Hands-on labs, security research, network analysis, and defensive security projects.
          </p>
        </section>

        {/* Technical Filter & View Controls */}
        <section
          aria-label="Project filtering and search options"
          className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 p-3 sm:p-4 rounded-[12px] bg-[#091121]/90 border border-[rgba(65,125,170,0.22)] backdrop-blur-md"
        >
          {/* Category Filter Pills (Functional Buttons) */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                aria-controls="projects-grid"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-[6px] font-mono text-xs font-semibold tracking-[0.5px] uppercase whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FD8FF] ${
                  selectedCategory === cat
                    ? 'bg-[rgba(13,25,46,0.9)] text-[#4FD8FF] border border-[#4FD8FF]/60'
                    : 'bg-transparent text-[#8BA0C0] border border-transparent hover:border-[rgba(65,125,170,0.3)] hover:text-[#E8EEF8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right controls: Search & View Mode */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7185A7]" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, tags, logs..."
                aria-label="Search security projects by title, tool, or description"
                className="w-full pl-9 pr-8 py-1.5 rounded-[6px] bg-[#070D1A] border border-[rgba(65,125,170,0.3)] text-xs font-mono text-[#E8EEF8] placeholder-[#576A88] focus:outline-none focus:border-[#4FD8FF] focus-visible:ring-2 focus-visible:ring-[#4FD8FF]/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#7185A7] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4FD8FF]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-[6px] bg-[#070D1A] border border-[rgba(65,125,170,0.25)] shrink-0" role="group" aria-label="Layout view switcher">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FD8FF] ${
                  viewMode === 'grid'
                    ? 'bg-[#4FD8FF]/20 text-[#4FD8FF]'
                    : 'text-[#7185A7] hover:text-[#E8EEF8]'
                }`}
                title="Responsive Grid (3 columns desktop, 2 columns tablet, 1 column mobile)"
                aria-label="Responsive Grid View"
                aria-pressed={viewMode === 'grid'}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('spotlight')}
                className={`p-1.5 rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4FD8FF] ${
                  viewMode === 'spotlight'
                    ? 'bg-[#4FD8FF]/20 text-[#4FD8FF]'
                    : 'text-[#7185A7] hover:text-[#E8EEF8]'
                }`}
                title="Single Card Spotlight View (590px Target Focus)"
                aria-label="Spotlight View"
                aria-pressed={viewMode === 'spotlight'}
              >
                <Focus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* View Mode: Spotlight Mode (Displays single card centered with exact 590px dimension reference) */}
        {viewMode === 'spotlight' ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-center mb-6">
              <span className="text-xs font-mono text-[#4FD8FF] uppercase tracking-wider">
                Precision Component Specimen · 590px × 505px Target
              </span>
              <p className="text-sm text-[#7185A7] mt-1">
                Visual fidelity verification against the reference layout and typography scale.
              </p>
            </div>
            {/* The First Primary Project Card */}
            <ProjectCard
              project={filteredProjects[0] || projects[0]}
              onOpenDetails={(p) => setActiveProject(p)}
            />
          </div>
        ) : (
          /* View Mode: Responsive Grid (3 columns desktop, 2 columns tablet, 1 column mobile) */
          <div
            id="projects-grid"
            role="region"
            aria-label="Security Projects Collection"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 justify-items-center"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 px-4 rounded-[18px] bg-[#091121] border border-[rgba(65,125,170,0.25)]">
            <Shield className="w-12 h-12 mx-auto text-[#7185A7] mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#E8EEF8] mb-1">No security projects found</h3>
            <p className="text-sm text-[#7185A7] mb-4">
              Try adjusting your search query or reset your category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedLevel('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-[6px] bg-transparent border border-[#55D8FF] text-[#55D8FF] font-mono text-xs font-semibold hover:bg-[#55D8FF]/10 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Lab Architecture & Methodology Section */}
        <section id="architecture" className="mt-20 pt-12 border-t border-[rgba(65,125,170,0.2)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Lab Infrastructure Philosophy */}
            <div className="p-6 rounded-[14px] bg-[#091121] border border-[rgba(65,125,170,0.22)]">
              <div className="w-9 h-9 rounded-lg bg-[#4FD8FF]/10 border border-[#4FD8FF]/30 flex items-center justify-center text-[#4FD8FF] mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#E8EEF8] mb-2 font-sans">
                Air-Gapped Virtualization
              </h3>
              <p className="text-sm text-[#7185A7] leading-relaxed">
                All attack simulations and malware triage are isolated within host-only and internal
                virtual networks. Promiscuous taps mirror raw packet streams directly to IDS engines
                without external exposure.
              </p>
            </div>

            {/* Column 2: Detection Engineering */}
            <div className="p-6 rounded-[14px] bg-[#091121] border border-[rgba(65,125,170,0.22)]">
              <div className="w-9 h-9 rounded-lg bg-[#4FD8FF]/10 border border-[#4FD8FF]/30 flex items-center justify-center text-[#4FD8FF] mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#E8EEF8] mb-2 font-sans">
                Detection As Code (DaC)
              </h3>
              <p className="text-sm text-[#7185A7] leading-relaxed">
                Custom Snort rules, Wazuh decoders, and Splunk SPL queries are version-controlled in
                Git. Every detection is tested against automated benign background noise to maintain
                low false-positive ratios.
              </p>
            </div>

            {/* Column 3: MITRE ATT&CK Alignment */}
            <div className="p-6 rounded-[14px] bg-[#091121] border border-[rgba(65,125,170,0.22)]">
              <div className="w-9 h-9 rounded-lg bg-[#4FD8FF]/10 border border-[#4FD8FF]/30 flex items-center justify-center text-[#4FD8FF] mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#E8EEF8] mb-2 font-sans">
                Adversary Emulation
              </h3>
              <p className="text-sm text-[#7185A7] leading-relaxed">
                Labs map explicitly to MITRE ATT&CK enterprise tactics—including Credential Access,
                Defense Evasion, Command & Control beaconing, and Lateral Movement through Active Directory.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & Footer Section */}
        <section id="contact" className="mt-16 p-8 rounded-[18px] bg-[#091121] border border-[rgba(65,125,170,0.25)] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-[#E8EEF8] mb-1">
              Interested in collaborating or discussing defensive engineering?
            </h3>
            <p className="text-sm text-[#7185A7]">
              Open for SOC Analyst, Threat Detection Engineer, and Blue Team positions.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:contact@cyberengineer.io"
              className="px-5 py-2.5 rounded-[6px] bg-[#4FD8FF]/15 border border-[#4FD8FF]/40 text-[#4FD8FF] font-mono text-xs font-semibold tracking-wider hover:bg-[#4FD8FF]/25 hover:border-[#4FD8FF] transition-all"
            >
              Get In Touch
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-[6px] bg-transparent border border-[rgba(65,125,170,0.4)] text-[#8BA0C0] font-mono text-xs font-semibold tracking-wider hover:text-white hover:border-[#4FD8FF] transition-all"
            >
              GitHub Org
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[rgba(65,125,170,0.15)] py-6 text-center text-xs font-mono text-[#576A88]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} Cybersecurity Portfolio · Blue Team & SOC Architecture</span>
          <div className="flex items-center gap-4 text-[#7185A7]">
            <span>MITRE ATT&CK&reg; Aligned</span>
            <span>·</span>
            <span>CIS Benchmark L2</span>
            <span>·</span>
            <span>IDS / SIEM Pipeline</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modal for in-depth lab inspection */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
