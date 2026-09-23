import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, LayoutGrid, Focus } from 'lucide-react';
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

  // Compact, technical filter categories matching specifications
  const filters = ['ALL', 'SOC', 'NETWORK', 'DFIR', 'PENTESTING', 'LINUX', 'WEB'];

  // URL / Deep link support
  useEffect(() => {
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

      const url = new URL(window.location.href);
      if (url.searchParams.get('project') !== activeProject.id) {
        url.searchParams.set('project', activeProject.id);
        window.history.pushState({ projectId: activeProject.id }, '', url.toString());
      }

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
        },
      });
    } else {
      document.title = 'Cybersecurity Portfolio Projects';

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
        } else if (selectedFilter === 'NETWORK') {
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
        } else if (selectedFilter === 'WEB') {
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
      {/* Navigation Bar */}
      <Navbar
        activeFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
        {/* Section Heading: Restrained, confident typography */}
        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-2 font-sans">
            Security Projects
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Technical documentation and lab environments covering detection engineering, packet analysis, threat hunting, and infrastructure hardening.
          </p>
        </section>

        {/* Technical Filter & Search Controls */}
        <section
          aria-label="Project filtering and search options"
          className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-4 p-3 rounded-[8px] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xs"
        >
          {/* Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex items-center gap-1 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                role="tab"
                aria-selected={selectedFilter === filter}
                aria-controls="projects-grid"
                onClick={() => setSelectedFilter(filter)}
                className={`px-2.5 py-1 rounded-[4px] font-mono text-[12px] font-medium tracking-[0.5px] uppercase whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${
                  selectedFilter === filter
                    ? 'bg-[var(--bg-inner)] text-[var(--accent)] border border-[var(--border-color)]'
                    : 'bg-transparent text-[var(--text-muted)] border border-transparent hover:text-[var(--text-primary)]'
                }`}
              >
                [ {filter} ]
              </button>
            ))}
          </div>

          {/* Right controls: Compact Search, Theme Switcher & View Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Input: Technical, clean 1px border */}
            <div className="relative w-full sm:w-64">
              <Search
                className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search security projects..."
                aria-label="Search security projects by title, category, technology, or description"
                className="w-full pl-8 pr-7 py-1.5 rounded-[5px] bg-[var(--bg-inner)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
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
                className="flex items-center p-0.5 rounded-[5px] bg-[var(--bg-inner)] border border-[var(--border-color)] shrink-0"
                role="group"
                aria-label="Layout view switcher"
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${
                    viewMode === 'grid'
                      ? 'bg-[var(--bg-card)] text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Grid View (3 columns desktop)"
                  aria-label="Grid View"
                  aria-pressed={viewMode === 'grid'}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('spotlight')}
                  className={`p-1.5 rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${
                    viewMode === 'spotlight'
                      ? 'bg-[var(--bg-card)] text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Single Card Specimen View"
                  aria-label="Spotlight Specimen View"
                  aria-pressed={viewMode === 'spotlight'}
                >
                  <Focus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Small Technical Project Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="font-mono text-[11px] uppercase text-[var(--text-muted)] tracking-wider">
            <span className="text-[var(--text-primary)] font-semibold">{filteredProjects.length}</span>{' '}
            {filteredProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
          </div>
          {(selectedFilter !== 'ALL' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedFilter('ALL');
                setSearchQuery('');
              }}
              className="text-[11px] font-mono text-[var(--accent-btn)] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-btn)]"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* View Mode: Spotlight Mode */}
        {viewMode === 'spotlight' ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-center mb-6">
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Component Specimen · Reference Geometry (590px × 505px)
              </span>
            </div>
            <ProjectCard
              project={filteredProjects[0] || projects[0]}
              onOpenDetails={handleOpenDetails}
            />
          </div>
        ) : (
          /* View Mode: Responsive Grid (3 columns desktop, 2 tablet, 1 mobile) */
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

        {/* Clean Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 px-6 rounded-[8px] bg-[var(--bg-card)] border border-[var(--border-color)] max-w-sm mx-auto my-8">
            <div className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider uppercase mb-1">
              NO PROJECTS FOUND
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Try adjusting the filter or search term.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('ALL');
                setSearchQuery('');
              }}
              className="inline-flex items-center px-3 py-1.5 rounded-[4px] bg-transparent border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </main>

      {/* Clean Engineering Footer */}
      <footer className="w-full border-t border-[var(--border-subtle)] py-5 text-center text-xs font-mono text-[var(--text-muted)]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Security Engineering Portfolio · Defensive Labs & Telemetry</span>
          <span>Technical Documentation Archive</span>
        </div>
      </footer>

      {/* Technical Project Detail Drawer */}
      <ProjectDetailDrawer
        project={activeProject}
        isOpen={activeProject !== null}
        onClose={handleCloseDetails}
        triggerRef={triggerRef}
      />
    </div>
  );
}
