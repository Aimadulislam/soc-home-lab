import React from 'react';
import { ArchitectureNode } from '../types/project';
import {
  Skull,
  Network,
  Shield,
  Server,
  Database,
  UserCheck,
  ChevronDown,
} from 'lucide-react';

interface ProjectArchitectureFlowProps {
  nodes?: ArchitectureNode[];
  className?: string;
}

export const ProjectArchitectureFlow: React.FC<ProjectArchitectureFlowProps> = ({
  nodes,
  className = '',
}) => {
  const defaultNodes: ArchitectureNode[] = [
    { label: 'Kali Linux', sublabel: 'Adversary (192.168.56.20)', role: 'attacker' },
    { label: 'Virtual Network', sublabel: 'Isolated Host-Only TAP', role: 'network' },
    { label: 'Snort IDS', sublabel: 'Promiscuous Packet Inspection', role: 'sensor' },
    { label: 'Ubuntu Server', sublabel: 'Target Web Application', role: 'target' },
    { label: 'Splunk Enterprise', sublabel: 'SIEM Correlation Engine', role: 'siem' },
    { label: 'SOC Analyst', sublabel: 'Alert Triage & Playbooks', role: 'analyst' },
  ];

  const flowNodes = nodes && nodes.length > 0 ? nodes : defaultNodes;

  const getNodeIcon = (role?: string) => {
    switch (role) {
      case 'attacker':
        return <Skull className="w-3.5 h-3.5 text-[#F87171]" aria-hidden="true" />;
      case 'network':
        return <Network className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />;
      case 'sensor':
        return <Shield className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />;
      case 'target':
        return <Server className="w-3.5 h-3.5 text-[#A78BFA]" aria-hidden="true" />;
      case 'siem':
        return <Database className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />;
      case 'analyst':
        return <UserCheck className="w-3.5 h-3.5 text-[#34D399]" aria-hidden="true" />;
      default:
        return <Server className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />;
    }
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center py-1 ${className}`}
      aria-label="Lab Architecture Topology Diagram"
    >
      <div className="w-full flex flex-col items-center">
        {flowNodes.map((node, index) => {
          const isLast = index === flowNodes.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Technical Node */}
              <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-[6px] bg-[var(--bg-inner)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-5 h-5 rounded-[4px] bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                    {getNodeIcon(node.role)}
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-xs font-semibold text-[var(--text-primary)] truncate">
                      {node.label}
                    </span>
                    {node.sublabel && (
                      <span className="block font-mono text-[11px] text-[var(--text-muted)] truncate">
                        {node.sublabel}
                      </span>
                    )}
                  </div>
                </div>

                <span className="font-mono text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] shrink-0 ml-2">
                  {node.role || 'node'}
                </span>
              </div>

              {/* Connecting Vector Conduit */}
              {!isLast && (
                <div
                  className="flex flex-col items-center my-0.5 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-[1px] h-2.5 bg-[var(--border-color)]" />
                  <ChevronDown className="w-3 h-3 -my-0.5 text-[var(--border-hover)]" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
