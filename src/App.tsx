import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Shield,
  Activity,
  Server,
  Search,
  LayoutGrid,
  Focus,
} from 'lucide-react';
import { projects } from './data/projects';
import { Project } from './types/project';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetailDrawer } from './components/ProjectDetailDrawer';
import { Navbar } from './components/Navbar';
import { useTheme } from './hooks/useTheme';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'spotlight'>('grid');
  const triggerRef = useRef<HTMLElement | null>(null);

  // Defined project filters: ALL, SOC, NETWORK SECURITY, DFIR, PENTESTING, LINUX, WEB SECURITY
  const filters = [
    'ALL',
    'SOC',
    'NETWORK SECURITY',
    'DFIR',
    'PENTESTING',
    'LINUX',
    'WEB SECURITY',
  ];

  // URL / Deep link support
  useEffect(() => {
    // Check initial query parameter or hash
    const params = new URLSearchParams(window.location.search);
    const initialId = params.get('project') || params.get('id');

    if (initialId) {
      const match = projects.find((p) => p.id.toLowerCase() === initialId.toLowerCase());
      if (match) {
        setActiveProject(match);
      }
    } else if (window.location.hash) {
      const hashId = window.location.hash.replace('#project=', '').replace('#', '');
      const match = projects.find((p) => p.id.toLowerCase() === hashId.toLowerCase());
      if (match) {
        setActiveProject(match);
      }
    }

    // Handle browser Back/Forward navigation
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentId = currentParams.get('project') || currentParams.get('id');
      if (currentId) {
        const found = projects.find((p) => p.id.toLowerCase() === currentId.toLowerCase());
        setActiveProject(found || null);
      } else {
        setActiveProject(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync active project with URL and dynamic SEO metadata
  useEffect(() => {
    if (activeProject) {
      document.title = `${activeProject.title} | Cybersecurity Project`;

      // Update URL query string
      const url = new URL(window.location.href);
      if (url.searchParams.get('project') !== activeProject.id) {
        url.searchParams.set('project', activeProject.id);
        window.history.pushState({ projectId: activeProject.id }, '', url.toString());
      }

      // JSON-LD structured data for SEO
      let scriptTag = document.getElementById('project-json-ld');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'project-json-ld';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: activeProject.title,
        description: activeProject.overview || activeProject.description,
        genre: activeProject.category,
        keywords: activeProject.technologies
          .map((t) => (typeof t === 'string' ? t : t.name))
          .join(', '),
        author: {
          '@type': 'Person',
          name: 'Security Engineer',
          jobTitle: 'SOC Detection Engineer',
        },
      });
    } else {
      document.title = 'Cybersecurity Portfolio Projects';

      // Remove query param if present
      const url = new URL(window.location.href);
      if (url.searchParams.has('project') || url.searchParams.has('id')) {
        url.searchParams.delete('project');
        url.searchParams.delete('id');
        window.history.replaceState({}, '', url.toString());
      }

      const scriptTag = document.getElementById('project-json-ld');
      if (scriptTag) {
        scriptTag.remove();
      }
    }
  }, [activeProject]);

  // Robust project filter and search engine
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Filter matching
      let matchFilter = false;
      if (selectedFilter === 'ALL') {
        matchFilter = true;
      } else {
        const cat = p.category.toUpperCase();
        const techNames = p.technologies.map((t) =>
          (typeof t === 'string' ? t : t.name).toUpperCase()
        );

        if (selectedFilter === 'SOC') {
          matchFilter =
            cat.includes('SOC') ||
            cat.includes('HOME LAB') ||
            cat.includes('THREAT HUNTING') ||
            techNames.some(
              (t) =>
                t.includes('SPLUNK') ||
                t.includes('WAZUH') ||
                t.includes('SNORT') ||
                t.includes('ELASTIC')
            );
        } else if (selectedFilter === 'NETWORK SECURITY') {
          matchFilter =
            cat.includes('NETWORK') ||
            techNames.some(
              (t) =>
                t.includes('WIRESHARK') ||
                t.includes('SURICATA') ||
                t.includes('ZEEK') ||
                t.includes('PCAP')
            );
        } else if (selectedFilter === 'DFIR') {
          matchFilter =
            cat.includes('DFIR') ||
            cat.includes('FORENSICS') ||
            techNames.some(
              (t) =>
                t.includes('VOLATILITY') ||
                t.includes('AUTOPSY') ||
                t.includes('FTK')
            );
        } else if (selectedFilter === 'PENTESTING') {
          matchFilter =
            cat.includes('PENETRATION') ||
            cat.includes('PENTEST') ||
            cat.includes('THREAT') ||
            techNames.some(
              (t) =>
                t.includes('BURP') ||
                t.includes('KALI') ||
                t.includes('MIMIKATZ') ||
                t.includes('BLOODHOUND')
            );
        } else if (selectedFilter === 'LINUX') {
          matchFilter =
            cat.includes('LINUX') ||
            techNames.some(
              (t) =>
                t.includes('LINUX') ||
                t.includes('UBUNTU') ||
                t.includes('BASH') ||
                t.includes('AUDITD') ||
                t.includes('UFW')
            );
        } else if (selectedFilter === 'WEB SECURITY') {
          matchFilter =
            cat.includes('WEB') ||
            techNames.some(
              (t) =>
                t.includes('BURP') ||
                t.includes('OWASP') ||
                t.includes('ZAP') ||
                t.includes('JWT') ||
                t.includes('APACHE')
            );
        } else {
          matchFilter = cat.includes(selectedFilter);
        }
      }

      // Search matching across title, category, technology, description, and overview
      let matchSearch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = p.title.toLowerCase().includes(query);
        const inCategory = p.category.toLowerCase().includes(query);
        const inDesc = p.description.toLowerCase().includes(query);
        const inOverview = p.overview ? p.overview.toLowerCase().includes(query) : false;
        const inTechs = p.technologies.some((t) => {
          const name = typeof t === 'string' ? t : t.name;
          return name.toLowerCase().includes(query);
        });
        matchSearch = inTitle || inCategory || inDesc || inOverview || inTechs;
      }

      return matchFilter && matchSearch;
    });
  }, [selectedFilter, searchQuery]);

  const handleOpenDetails = (project: Project) => {
    setActiveProject(project);
  };

  const handleCloseDetails = () => {
    setActiveProject(null);
  };

  return (
    <div className="min-h-screen cyber-grid-bg text-[var(--text-primary)] flex flex-col font-sans transition-colors duration-200">
      {/* 3-Zone Navigation Bar */}
      <Navbar
        activeFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-16">
        {/* Section Heading & Subtitle */}
        <section id="projects" className="text-center sm:text-left mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[var(--bg-card-subtle)] border border-[var(--border-color)] text-[var(--accent)] font-mono text-xs font-semibold tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>Defensive Operations & Detection Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Security Projects
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">
            Hands-on labs, security research, network analysis, and defensive security projects.
          </p>
        </section>

        {/* Technical Filter, Compact Search & Theme Switcher Controls */}
        <section
          aria-label="Project filtering and search options"
          className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-4 p-3 sm:p-4 rounded-[12px] bg-[var(--bg-card)]/90 border border-[var(--border-color)] backdrop-blur-md shadow-xs"
        >
          {/* Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                role="tab"
                aria-selected={selectedFilter === filter}
                aria-controls="projects-grid"
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-[6px] font-mono text-xs font-semibold tracking-[0.5px] uppercase whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  selectedFilter === filter
                    ? 'bg-[var(--bg-card-subtle)] text-[var(--accent)] border border-[var(--accent)]/60 shadow-xs'
                    : 'bg-transparent text-[var(--text-muted)] border border-transparent hover:border-[var(--border-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                [ {filter} ]
              </button>
            ))}
          </div>

          {/* Right controls: Compact Search, Theme Switcher & View Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input: Compact, dark bg, thin border, cyan focus */}
            <div className="relative w-full sm:w-72">
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search security projects..."
                aria-label="Search security projects by title, category, technology, or description"
                className="w-full pl-9 pr-8 py-1.5 rounded-[6px] bg-[var(--bg-inner)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              {/* Theme Toggle in Project Section: [ Sun ] or [ Moon ] */}
              <ThemeToggle theme={theme} onToggle={toggleTheme} showLabel={true} />

              {/* Layout View Toggle */}
              <div
                className="flex items-center p-1 rounded-[6px] bg-[var(--bg-inner)] border border-[var(--border-color)] shrink-0"
                role="group"
                aria-label="Layout view switcher"
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    viewMode === 'grid'
                      ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Responsive Grid View (3 columns desktop)"
                  aria-label="Responsive Grid View"
                  aria-pressed={viewMode === 'grid'}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('spotlight')}
                  className={`p-1.5 rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    viewMode === 'spotlight'
                      ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Single Card Spotlight Specimen View"
                  aria-label="Spotlight View"
                  aria-pressed={viewMode === 'spotlight'}
                >
                  <Focus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Small Technical Project Counter (Feels like metadata, JetBrains Mono, small, uppercase) */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="font-mono text-[12px] uppercase text-[var(--text-muted)] tracking-[1.5px]">
            <span className="text-[var(--accent)] font-semibold">{filteredProjects.length}</span>{' '}
            {filteredProjects.length === 1 ? 'SECURITY PROJECT' : 'SECURITY PROJECTS'}
          </div>
          {(selectedFilter !== 'ALL' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedFilter('ALL');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-[var(--accent-btn)] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-btn)]"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* View Mode: Spotlight Mode */}
        {viewMode === 'spotlight' ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-center mb-6">
              <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">
                Precision Component Specimen · 590px × 505px Target
              </span>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Visual fidelity verification against the reference layout and typography scale.
              </p>
            </div>
            {/* The First Primary Project Card */}
            <ProjectCard
              project={filteredProjects[0] || projects[0]}
              onOpenDetails={handleOpenDetails}
            />
          </div>
        ) : (
          /* View Mode: Responsive Grid */
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
                onOpenDetails={handleOpenDetails}
              />
            ))}
          </div>
        )}

        {/* Minimal Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-14 px-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border-color)] max-w-md mx-auto my-8">
            <div className="font-mono text-sm font-bold text-[var(--text-primary)] tracking-widest uppercase mb-1">
              NO PROJECTS FOUND
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-5">
              Try another search or category.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('ALL');
                setSearchQuery('');
              }}
              className="inline-flex items-center px-4 py-2 rounded-[6px] bg-transparent border border-[var(--accent-btn)] text-[var(--accent-btn)] font-mono text-xs font-semibold tracking-wider hover:bg-[var(--accent)]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-btn)]"
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {/* Lab Architecture & Methodology Section */}
        <section id="architecture" className="mt-20 pt-12 border-t border-[var(--border-subtle)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Lab Infrastructure Philosophy */}
            <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border-color)]">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 font-sans">
                Air-Gapped Virtualization
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                All attack simulations and malware triage are isolated within host-only and internal
                virtual networks. Promiscuous taps mirror raw packet streams directly to IDS engines
                without external exposure.
              </p>
            </div>

            {/* Column 2: Detection Engineering */}
            <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border-color)]">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 font-sans">
                Detection As Code (DaC)
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Custom Snort rules, Wazuh decoders, and Splunk SPL queries are version-controlled in
                Git. Every detection is tested against automated benign background noise to maintain
                low false-positive ratios.
              </p>
            </div>

            {/* Column 3: MITRE ATT&CK Alignment */}
            <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border-color)]">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 font-sans">
                Adversary Emulation
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Labs map explicitly to MITRE ATT&CK enterprise tactics—including Credential Access,
                Defense Evasion, Command & Control beaconing, and Lateral Movement through Active Directory.
              </p>
            </div>
          </div>
        </section>

        {/* SOC Contact & Verification Callout */}
        <section
          id="contact"
          className="mt-16 p-8 rounded-[18px] bg-[var(--bg-card)] border border-[var(--border-color)] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-1">
              Ready for Detection Engineering & SOC Operations
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xl">
              Available for Blue Team, Security Operations Center (SOC) Tier II/III, Threat Hunting, and Security Engineering positions.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:contact@security-engineer.io"
              className="px-5 py-3 rounded-[6px] bg-[var(--bg-card-subtle)] border border-[var(--accent-btn)] text-[var(--accent-btn)] font-mono text-sm font-semibold hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-btn)]"
            >
              Transmit PGP Inquiries
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[var(--border-subtle)] py-6 text-center text-xs font-mono text-[var(--text-muted)]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} Cybersecurity Portfolio · Blue Team & SOC Architecture</span>
          <div className="flex items-center gap-4">
            <span>MITRE ATT&CK&reg; Aligned</span>
            <span>·</span>
            <span>CIS Benchmark Verified</span>
          </div>
        </div>
      </footer>

      {/* Deep Investigation Project Detail Drawer */}
      <ProjectDetailDrawer
        project={activeProject}
        isOpen={activeProject !== null}
        onClose={handleCloseDetails}
        triggerRef={triggerRef}
      />
    </div>
  );
}
