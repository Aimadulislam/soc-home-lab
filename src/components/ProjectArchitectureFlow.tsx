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
  // Fallback nodes if project does not specify custom flow
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
        return <Skull className="w-3.5 h-3.5 text-[#F87171]" />;
      case 'network':
        return <Network className="w-3.5 h-3.5 text-[#60A5FA]" />;
      case 'sensor':
        return <Shield className="w-3.5 h-3.5 text-[#4FD8FF]" />;
      case 'target':
        return <Server className="w-3.5 h-3.5 text-[#A78BFA]" />;
      case 'siem':
        return <Database className="w-3.5 h-3.5 text-[#38BDF8]" />;
      case 'analyst':
        return <UserCheck className="w-3.5 h-3.5 text-[#34D399]" />;
      default:
        return <Server className="w-3.5 h-3.5 text-[#4FD8FF]" />;
    }
  };

  const getNodeBorder = (role?: string) => {
    switch (role) {
      case 'attacker':
        return 'border-[#F87171]/40 hover:border-[#F87171]/80';
      case 'analyst':
        return 'border-[#34D399]/40 hover:border-[#34D399]/80';
      default:
        return 'border-[var(--border-subtle)] hover:border-[var(--border-hover)]';
    }
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center py-2 ${className}`}
      aria-label="Lab Architecture Topology Diagram"
    >
      <div className="w-full flex flex-col items-center">
        {flowNodes.map((node, index) => {
          const isLast = index === flowNodes.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Architecture Node */}
              <div
                className={`w-full flex items-center justify-between p-3 rounded-[8px] bg-[var(--bg-inner)] border ${getNodeBorder(
                  node.role
                )} transition-all duration-150 shadow-xs`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-[4px] bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
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

                <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-subtle)] shrink-0 ml-2">
                  {node.role || 'node'}
                </span>
              </div>

              {/* Connecting Pipe & Arrow */}
              {!isLast && (
                <div
                  className="flex flex-col items-center my-1 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="w-[1px] h-3 bg-[var(--border-color)]" />
                  <ChevronDown className="w-3.5 h-3.5 -my-1 text-[var(--accent)] stroke-[2.2]" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
