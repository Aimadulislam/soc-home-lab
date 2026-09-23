import React from 'react';
import {
  Activity,
  Shield,
  Boxes,
  Terminal,
  Server,
  Network,
  Database,
  FileCode2,
  GitBranch,
  Search,
  HardDrive,
  Globe,
  Lock,
  Cpu,
  Monitor,
  CheckCircle2,
  Clock,
  Archive,
} from 'lucide-react';
import { ProjectStatus, Difficulty, Technology } from '../types/project';

/**
 * Returns the corresponding Lucide icon component for a given technology name.
 */
export const getTechIcon = (techInput: string | Technology): React.ReactNode => {
  if (typeof techInput === 'object' && techInput.icon) {
    const CustomIcon = techInput.icon;
    return <CustomIcon className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" />;
  }

  const name = typeof techInput === 'string' ? techInput : techInput.name;
  const lower = name.toLowerCase();

  // Splunk / Elastic / Databases
  if (lower.includes('splunk') || lower.includes('elastic') || lower.includes('database') || lower.includes('sql')) {
    return <Database className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // Snort / Wazuh / Suricata / Firewall / Defense
  if (
    lower.includes('snort') ||
    lower.includes('wazuh') ||
    lower.includes('suricata') ||
    lower.includes('ufw') ||
    lower.includes('shield') ||
    lower.includes('firewall') ||
    lower.includes('security')
  ) {
    return <Shield className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // VirtualBox / Containers / Docker / VMs
  if (lower.includes('virtualbox') || lower.includes('docker') || lower.includes('vm') || lower.includes('container')) {
    return <Boxes className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // Ubuntu / Kali Linux / Bash / PowerShell / Terminal / Shell
  if (
    lower.includes('ubuntu') ||
    lower.includes('kali') ||
    lower.includes('linux') ||
    lower.includes('bash') ||
    lower.includes('powershell') ||
    lower.includes('terminal')
  ) {
    return <Terminal className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // Wireshark / Zeek / TCP / Network / Protocols
  if (
    lower.includes('wireshark') ||
    lower.includes('zeek') ||
    lower.includes('network') ||
    lower.includes('tcp') ||
    lower.includes('pcap')
  ) {
    return <Network className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // Servers / Windows Server / Active Directory / Sysmon
  if (
    lower.includes('server') ||
    lower.includes('active directory') ||
    lower.includes('sysmon') ||
    lower.includes('windows')
  ) {
    return <Server className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // Python / Code / Scripting / Auditd
  if (lower.includes('python') || lower.includes('code') || lower.includes('auditd') || lower.includes('c++')) {
    return <FileCode2 className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // Git / Version Control
  if (lower.includes('git') || lower.includes('repo')) {
    return <GitBranch className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // Forensics / Search / Memory
  if (lower.includes('autopsy') || lower.includes('search') || lower.includes('triage')) {
    return <Search className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  if (lower.includes('volatility') || lower.includes('memory') || lower.includes('disk')) {
    return <HardDrive className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // Web Security / Burp Suite
  if (lower.includes('burp') || lower.includes('web') || lower.includes('http') || lower.includes('api')) {
    return <Globe className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  // Cryptography / Identity / Auth
  if (lower.includes('mimikatz') || lower.includes('crypto') || lower.includes('auth') || lower.includes('key')) {
    return <Lock className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
  }

  return <Cpu className="w-[14px] h-[14px] text-[#4FD8FF]/90 shrink-0" aria-hidden="true" />;
};

/**
 * Returns the appropriate Lucide status icon for the project status.
 */
export const getStatusIcon = (status: ProjectStatus): React.ReactNode => {
  switch (status) {
    case 'COMPLETED':
      return <CheckCircle2 className="w-[14px] h-[14px] mr-[8px] text-[#4FD8FF] shrink-0" aria-hidden="true" />;
    case 'IN PROGRESS':
      return <Activity className="w-[14px] h-[14px] mr-[8px] text-[#4FD8FF] shrink-0" aria-hidden="true" />;
    case 'PLANNED':
      return <Clock className="w-[14px] h-[14px] mr-[8px] text-[#4FD8FF] shrink-0" aria-hidden="true" />;
    case 'ARCHIVED':
      return <Archive className="w-[14px] h-[14px] mr-[8px] text-[#4FD8FF] shrink-0" aria-hidden="true" />;
    default:
      return <CheckCircle2 className="w-[14px] h-[14px] mr-[8px] text-[#4FD8FF] shrink-0" aria-hidden="true" />;
  }
};

/**
 * Difficulty visual configuration: subtle, professional, non-neon accent palette.
 */
export const getDifficultyStyle = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'BEGINNER':
      return {
        text: 'text-[#4ADE80]', // Subtle green
        border: 'border-[rgba(74,222,128,0.35)]',
        label: 'BEGINNER',
      };
    case 'INTERMEDIATE':
      return {
        text: 'text-[#60A5FA]', // Subtle blue
        border: 'border-[rgba(96,165,250,0.35)]',
        label: 'INTERMEDIATE',
      };
    case 'ADVANCED':
      return {
        text: 'text-[#F4C84A]', // Yellow / gold
        border: 'border-[rgba(244,200,74,0.35)]',
        label: 'ADVANCED',
      };
    case 'EXPERT':
      return {
        text: 'text-[#F87171]', // Subtle red
        border: 'border-[rgba(248,113,113,0.35)]',
        label: 'EXPERT',
      };
    default:
      return {
        text: 'text-[#F4C84A]',
        border: 'border-[rgba(244,200,74,0.35)]',
        label: 'ADVANCED',
      };
  }
};
