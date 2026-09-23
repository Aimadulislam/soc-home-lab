import { Project } from '../types/project';

import img1 from '../assets/images/soc_server_rack_1790131087238.jpg';
import img2 from '../assets/images/wazuh_soc_datacenter_1790131101151.jpg';
import img3 from '../assets/images/network_switch_hardware_1790131113071.jpg';
import img4 from '../assets/images/hardened_server_cluster_1790131126736.jpg';

export const projects: Project[] = [
  {
    id: 'homelab-soc-splunk-snort',
    title: 'Home Lab SOC Setup with Splunk & Snort',
    category: 'HOME LAB',
    status: 'COMPLETED',
    difficulty: 'ADVANCED',
    level: 'ADVANCED',
    description:
      'Configured a complete virtual SOC environment using VirtualBox, Snort IDS, Splunk Enterprise, and Kali Linux to detect and analyze adversary intrusions in real time.',
    technologies: ['Splunk', 'Snort IDS', 'VirtualBox', 'Ubuntu Server', 'Kali Linux'],
    image: img1,
    githubUrl: 'https://github.com/sec-engineer/homelab-soc-splunk-snort',
    architectureDetails: {
      summary: 'Virtual SOC network topology with dedicated attacker, victim, sensor, and SIEM management subnets.',
      nodes: ['Kali Attacker (192.168.56.20)', 'Snort IDS Sensor / TAP (192.168.56.10)', 'Splunk Heavy Forwarder', 'Ubuntu Target / Apache (192.168.56.30)'],
      mitreTactics: ['TA0001 Initial Access', 'TA0007 Discovery (Nmap Port Scans)', 'TA0011 Command & Control'],
      keyCapabilities: [
        'Configured promiscuous mode bridged interface inside VirtualBox',
        'Authored custom Snort signatures detecting SYN flood & directory traversal',
        'Forwarded alert logs via Syslog into Splunk Enterprise indexer',
        'Built real-time SOC Analyst triage dashboard with severity heatmaps',
      ],
      sampleSnippetTitle: 'snort.rules (Custom Detection Signature)',
      sampleSnippet: `alert tcp $EXTERNAL_NET any -> $HOME_NET 80 (
  msg:"[SOC-DETECTION] Potential Directory Traversal /etc/passwd";
  flow:to_server,established;
  content:"/etc/passwd"; nocase;
  classtype:web-application-attack;
  sid:1000042; rev:1;
)`,
    },
  },
  {
    id: 'soc-monitoring-wazuh',
    title: 'SOC Monitoring Lab with Wazuh',
    category: 'SOC LAB',
    status: 'COMPLETED',
    difficulty: 'ADVANCED',
    level: 'ADVANCED',
    description:
      'Deployed a Wazuh SIEM/XDR cluster monitoring Windows Server and Ubuntu endpoints. Ingested Sysmon event logs, authored custom XML decoders/rules, and automated active-response containment workflows.',
    technologies: ['Wazuh', 'Ubuntu', 'Windows', 'Elastic', 'Sysmon'],
    image: img2,
    githubUrl: 'https://github.com/sec-engineer/wazuh-soc-monitoring',
    architectureDetails: {
      summary: 'Centralized Wazuh Manager + Indexer receiving encrypted agent telemetry across Windows Domain & Linux servers.',
      nodes: ['Wazuh Manager 4.7', 'Elasticsearch Cluster', 'Windows AD DC + Sysmon', 'Ubuntu Nginx Web Server'],
      mitreTactics: ['TA0002 Execution', 'TA0003 Persistence', 'TA0005 Defense Evasion'],
      keyCapabilities: [
        'Deployed Sysmon modular configuration for high-fidelity process tracking',
        'Authored Wazuh XML decoders for custom application access logs',
        'Programmed automated firewall containment on brute force detection',
        'Configured vulnerability assessment and FIM (File Integrity Monitoring)',
      ],
      sampleSnippetTitle: 'local_rules.xml (Wazuh Custom Brute Force Rule)',
      sampleSnippet: `<group name="windows,authentication_failed,">
  <rule id="100105" level="10" frequency="5" timeframe="60">
    <if_matched_sid>60106</if_matched_sid>
    <description>SOC Alert: Multiple Windows RDP logon failures from single IP</description>
    <mitre>
      <id>T1110.001</id>
    </mitre>
  </rule>
</group>`,
    },
  },
  {
    id: 'wireshark-network-analysis',
    title: 'Wireshark Network Incident Analysis',
    category: 'NETWORK SECURITY',
    status: 'COMPLETED',
    difficulty: 'INTERMEDIATE',
    level: 'INTERMEDIATE',
    description:
      'Dissected suspicious multi-gigabyte PCAP captures to reconstruct malware command-and-control (C2) beaconing, DNS exfiltration tunnels, and credential theft vectors using Wireshark and Zeek NSM.',
    technologies: ['Wireshark', 'TCP/IP', 'PCAP', 'Zeek', 'Linux'],
    image: img3,
    githubUrl: 'https://github.com/sec-engineer/wireshark-network-analysis',
    architectureDetails: {
      summary: 'Deep packet inspection workflow decoding complex protocol tunnels, TLS handshakes, and DNS payloads.',
      nodes: ['Zeek Network Security Monitor', 'Wireshark 4.2 Dissector', 'Tshark CLI Automated Profiler', 'CyberChef Payload Decoder'],
      mitreTactics: ['TA0010 Exfiltration (DNS Tunneling)', 'TA0011 Command & Control', 'TA0006 Credential Access'],
      keyCapabilities: [
        'Extracted embedded EXE binaries from unencrypted HTTP streams',
        'Detected base64-encoded subdomains indicating iodine DNS exfiltration',
        'Analyzed TCP window sizing & jitter to identify Cobalt Strike beacon intervals',
        'Formulated IoCs (Indicators of Compromise) for firewall blocklists',
      ],
      sampleSnippetTitle: 'Wireshark Display Filter String',
      sampleSnippet: `dns.qry.name.len > 45 and dns.flags.response == 0 and not dns.qry.name contains "arpa"
tcp.flags.syn == 1 and tcp.flags.ack == 0 and tcp.window_size <= 1024`,
    },
  },
  {
    id: 'linux-security-hardening',
    title: 'Linux Security Hardening Lab',
    category: 'LINUX SECURITY',
    status: 'COMPLETED',
    difficulty: 'INTERMEDIATE',
    level: 'INTERMEDIATE',
    description:
      'Automated CIS Benchmark Level 2 hardening across Ubuntu production servers using modular Bash scripting. Enforced kernel sysctl parameters, Auditd logging rules, and stateful UFW ingress filtering.',
    technologies: ['Ubuntu', 'Linux', 'Bash', 'Auditd', 'UFW'],
    image: img4,
    githubUrl: 'https://github.com/sec-engineer/linux-security-hardening',
    architectureDetails: {
      summary: 'Production-ready automated hardening engine aligning systems with CIS Benchmark L2 and DISA-STIG.',
      nodes: ['Ubuntu 22.04 LTS Kernel 5.15', 'Linux Audit Daemon (Auditd)', 'AppArmor Enforced Profiles', 'UFW / Iptables Firewall'],
      mitreTactics: ['TA0004 Privilege Escalation', 'TA0005 Defense Evasion', 'TA0008 Lateral Movement'],
      keyCapabilities: [
        'Hardened sysctl network stack: disabled IP forwarding, ICMP redirects & source routing',
        'Configured immutable Auditd rules tracking /etc/shadow, passwd & sudoers execution',
        'Restricted SSH to Ed25519 public keys only, custom non-standard port & AllowUsers',
        'Automated daily unattended security updates with integrity validation',
      ],
      sampleSnippetTitle: 'audit.rules (Kernel Syscall Auditing)',
      sampleSnippet: `-w /etc/shadow -p wa -k identity_modification
-w /etc/sudoers -p wa -k sudoers_change
-a always,exit -F arch=b64 -S execve -C uid!=euid -F euid=0 -k privilege_escalation`,
    },
  },
  {
    id: 'active-directory-threat-hunting',
    title: 'Active Directory Threat Hunting Lab',
    category: 'THREAT HUNTING',
    status: 'COMPLETED',
    difficulty: 'ADVANCED',
    level: 'ADVANCED',
    description:
      'Constructed an isolated forest domain to simulate Kerberoasting, AS-REP roasting, and Golden Ticket attacks. Mapped lateral movement paths in BloodHound and built detection rules in Splunk.',
    technologies: ['Active Directory', 'BloodHound', 'Mimikatz', 'PowerShell', 'Splunk'],
    image: img1,
    githubUrl: 'https://github.com/sec-engineer/ad-threat-hunting-lab',
    architectureDetails: {
      summary: 'Full Active Directory attack & defense simulation environment with Windows Server 2022 domain controllers and workstations.',
      nodes: ['CORP.LOCAL Domain Controller', 'Admin Workstation (BloodHound Collector)', 'Compromised Endpoint', 'Splunk SIEM Forwarder'],
      mitreTactics: ['TA0006 Credential Access (T1558)', 'TA0008 Lateral Movement', 'TA0004 Privilege Escalation'],
      keyCapabilities: [
        'Audited vulnerable Service Principal Names (SPNs) prone to RC4 Kerberoasting',
        'Exported graph analytics with SharpHound to discover unconstrained delegation paths',
        'Configured Event ID 4769 ticket encryption downgrade alerting in Splunk',
        'Enforced Protected Users security group and Tiered Administrative Model',
      ],
      sampleSnippetTitle: 'Splunk Search Query (SPL - Kerberoast Detection)',
      sampleSnippet: `index=wineventlog EventCode=4769 Ticket_Encryption_Type=0x17 Service_Name!="*$"
| stats count by src_ip, TargetUserName, Service_Name
| where count > 3`,
    },
  },
  {
    id: 'suricata-threat-intel-pipeline',
    title: 'Suricata Network IDS & Threat Intel Pipeline',
    category: 'NETWORK SECURITY',
    status: 'COMPLETED',
    difficulty: 'INTERMEDIATE',
    level: 'INTERMEDIATE',
    description:
      'Engineered a high-throughput network intrusion detection pipeline using Suricata IDS with automated threat intel feeds from MISP, normalized into Elasticsearch with custom Grok patterns.',
    technologies: ['Suricata', 'MISP', 'ELK Stack', 'Docker', 'Python'],
    image: img3,
    githubUrl: 'https://github.com/sec-engineer/suricata-threat-intel-pipeline',
    architectureDetails: {
      summary: 'Automated threat ingestion converting STIX/TAXII indicator feeds into real-time Suricata signature rulesets.',
      nodes: ['Suricata Multi-Threaded Engine', 'MISP Threat Sharing Platform', 'Logstash Normalizer', 'Elasticsearch / Kibana Dashboards'],
      mitreTactics: ['TA0011 Command and Control', 'TA0001 Initial Access', 'TA0010 Exfiltration'],
      keyCapabilities: [
        'Automated hourly pulls of malicious C2 IPs and file hashes via Python script',
        'Compiled dynamic Suricata dataset rules without service restart interruption',
        'Streamed eve.json event logs via Logstash pipeline with GeoIP enrichment',
        'Tuned rule false positives reducing analyst alert fatigue by 64%',
      ],
      sampleSnippetTitle: 'intel_updater.py (MISP to Suricata Generator)',
      sampleSnippet: `import requests, json

def build_suricata_dataset(misp_url, auth_key):
    headers = {"Authorization": auth_key, "Accept": "application/json"}
    resp = requests.get(f"{misp_url}/attributes/restSearch/type:ip-dst", headers=headers)
    ips = [attr['value'] for attr in resp.json()['response']['Attribute']]
    with open('/etc/suricata/rules/misp_c2_ips.rules', 'w') as f:
        for ip in ips:
            f.write(f'drop ip $HOME_NET any -> {ip} any (msg:"[MISP] C2 Hit"; sid:2000000;)\\n')`,
    },
  },
];
