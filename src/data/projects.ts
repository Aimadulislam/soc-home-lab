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
    overview:
      'Configured a complete virtual SOC environment using VirtualBox, Snort IDS, Splunk Enterprise, Ubuntu Server, and Kali Linux. Built to provide continuous telemetry ingestion, custom detection signature testing, and adversary emulation triage.',
    objectives: [
      'Build an isolated SOC network environment',
      'Deploy Snort IDS for promiscuous network monitoring',
      'Configure Splunk Enterprise for centralized log analysis',
      'Generate real-world web attack & scan security events',
      'Analyze alerts and identify suspicious anomalous traffic',
      'Practice tiered incident triage and containment workflows',
    ],
    architectureFlow: [
      { label: 'Kali Linux', sublabel: 'Adversary (192.168.56.20)', role: 'attacker' },
      { label: 'Virtual Host-Only Switch', sublabel: 'Isolated Subnet (192.168.56.0/24)', role: 'network' },
      { label: 'Snort IDS Sensor', sublabel: 'Promiscuous TAP (192.168.56.10)', role: 'sensor' },
      { label: 'Ubuntu Web Server', sublabel: 'Target Asset (192.168.56.30)', role: 'target' },
      { label: 'Splunk Enterprise', sublabel: 'Central SIEM (Port 8000)', role: 'siem' },
      { label: 'SOC Analyst', sublabel: 'Alert Triage & Playbooks', role: 'analyst' },
    ],
    environment: [
      { label: 'Hypervisor', value: 'Oracle VirtualBox 7.0' },
      { label: 'Attacker', value: 'Kali Linux 2024.1' },
      { label: 'Server', value: 'Ubuntu Server 22.04 LTS' },
      { label: 'IDS', value: 'Snort 2.9 (Community + Custom)' },
      { label: 'SIEM', value: 'Splunk Enterprise 9.2' },
      { label: 'Network', value: 'Isolated Host-Only Virtual Lab' },
    ],
    activities: [
      'Network traffic monitoring with promiscuous packet taps',
      'Custom IDS rule formulation & payload regex testing',
      'SYN flood and directory traversal event generation',
      'Syslog forwarding and indexer sourcetype parsing',
      'Real-time alert triage & priority correlation dashboards',
      'Incident investigation and remediation recommendations',
      'SOC workflow testing with structured runbooks',
    ],
    results:
      'Successfully created an isolated virtual SOC environment capable of generating, collecting, and analyzing security events through Snort and Splunk with sub-second alert forwarding.',
    technologies: ['Splunk', 'Snort IDS', 'VirtualBox', 'Ubuntu Server', 'Kali Linux'],
    image: img1,
    githubUrl: 'https://github.com/sec-engineer/homelab-soc-splunk-snort',
    architectureDetails: {
      summary: 'Virtual SOC network topology with dedicated attacker, victim, sensor, and SIEM management subnets.',
      nodes: [
        'Kali Attacker (192.168.56.20)',
        'Snort IDS Sensor / TAP (192.168.56.10)',
        'Splunk Heavy Forwarder',
        'Ubuntu Target / Apache (192.168.56.30)',
      ],
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
    overview:
      'Deployed an end-to-end Wazuh SIEM/XDR cluster across hybrid endpoints. Automated event correlation across Sysmon process telemetry, active directory authentications, and Linux audit daemons with automated containment scripts.',
    objectives: [
      'Deploy Wazuh Manager and indexing cluster',
      'Ingest Sysmon telemetry from Windows domain endpoints',
      'Write custom XML decoders and correlation rules',
      'Simulate brute-force RDP and credential access attacks',
      'Trigger active response automated IP firewall containment',
      'Evaluate file integrity monitoring (FIM) across critical system paths',
    ],
    architectureFlow: [
      { label: 'Windows & Linux Agents', sublabel: 'Sysmon & Auditd Telemetry', role: 'target' },
      { label: 'Encrypted Agent Channel', sublabel: 'TLS AES-256 (Port 1514)', role: 'network' },
      { label: 'Wazuh Analysis Engine', sublabel: 'Rule & Decoder Matching', role: 'sensor' },
      { label: 'Elasticsearch Indexer', sublabel: 'Cluster Storage & Shards', role: 'siem' },
      { label: 'Automated Containment', sublabel: 'Active-Response Firewall Script', role: 'attacker' },
      { label: 'SOC Tier II Analyst', sublabel: 'Incident Case Management', role: 'analyst' },
    ],
    environment: [
      { label: 'SIEM Core', value: 'Wazuh 4.7 Multi-Node Manager' },
      { label: 'Endpoints', value: 'Windows Server 2022 + Ubuntu 22.04' },
      { label: 'Telemetry Source', value: 'Microsoft Sysmon 14.1 + Auditd' },
      { label: 'Search Backend', value: 'OpenSearch / Elastic Cluster' },
      { label: 'Response', value: 'Python Active-Response Firewall Shunt' },
      { label: 'Topology', value: 'Isolated Hybrid Domain Environment' },
    ],
    activities: [
      'Sysmon XML telemetry parsing and field extraction',
      'Custom Wazuh rule authoring for MITRE ATT&CK T1110',
      'Active-response firewall blocking on threshold breaches',
      'Rootkit and privilege escalation hunt simulations',
      'File integrity monitoring rule calibration',
      'Vulnerability scanning and compliance auditing',
    ],
    results:
      'Established continuous endpoint visibility with sub-second detection of credential brute forcing and automated active-response network isolation.',
    technologies: ['Wazuh', 'Ubuntu', 'Windows Server', 'Elastic', 'Sysmon'],
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
    overview:
      'Conducted deep packet inspection on suspect PCAP captures from simulated enterprise breach incidents. Reconstructed Cobalt Strike C2 jitter, carved base64 encoded DNS tunnels, and isolated unencrypted credential leakage.',
    objectives: [
      'Analyze raw PCAP captures from compromised network segments',
      'Isolate malicious C2 beaconing using TCP window analysis and delta times',
      'Decode protocol tunnels including DNS query exfiltration and ICMP payloads',
      'Extract dropped executable payloads from raw HTTP/FTP streams',
      'Generate Zeek connection logs and notice metrics for SIEM ingestion',
      'Draft actionable Indicators of Compromise (IoCs) for egress blocklists',
    ],
    architectureFlow: [
      { label: 'Compromised Host', sublabel: 'Payload Execution (10.0.0.45)', role: 'attacker' },
      { label: 'Egress Gateway / Tap', sublabel: 'Span Port Full Packet Mirror', role: 'network' },
      { label: 'Zeek NSM Engine', sublabel: 'Protocol Parsing & Bro Scripts', role: 'sensor' },
      { label: 'Wireshark Dissector', sublabel: 'Deep Flow & Stream Reassembly', role: 'target' },
      { label: 'Threat Intel Match', sublabel: 'IoC Extraction & Hashes', role: 'siem' },
      { label: 'Incident Responder', sublabel: 'Egress Blocklist Deployment', role: 'analyst' },
    ],
    environment: [
      { label: 'Packet Dissector', value: 'Wireshark 4.2 / Tshark CLI' },
      { label: 'NSM Framework', value: 'Zeek 6.0 Network Security Monitor' },
      { label: 'Payload Decoding', value: 'CyberChef + Python Scapy' },
      { label: 'Dataset', value: 'Multi-Gigabyte Synthetic Attack PCAP' },
      { label: 'Target Protocols', value: 'DNS, HTTP/S, TLS 1.3, Kerberos, SMB' },
      { label: 'Output Artifacts', value: 'Zeek Conn Logs, YARA Rules, Blocklists' },
    ],
    activities: [
      'TCP flow graphing and round-trip time jitter profiling',
      'DNS query entropy scoring to isolate tunnel domains',
      'HTTP stream payload extraction and SHA256 hashing',
      'Zeek notice.log correlation against internal asset inventories',
      'Compromise timeline reconstruction for incident retrospectives',
    ],
    results:
      'Uncovered covert C2 channel hiding within pseudo-legitimate CDN requests and created automated Wireshark display filters adopted across the SOC team.',
    technologies: ['Wireshark', 'TCP/IP', 'PCAP', 'Zeek', 'Linux'],
    image: img3,
    githubUrl: 'https://github.com/sec-engineer/wireshark-network-analysis',
    architectureDetails: {
      summary: 'Deep packet inspection workflow decoding complex protocol tunnels, TLS handshakes, and DNS payloads.',
      nodes: [
        'Zeek Network Security Monitor',
        'Wireshark 4.2 Dissector',
        'Tshark CLI Automated Profiler',
        'CyberChef Payload Decoder',
      ],
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
    overview:
      'Engineered an enterprise-grade automated remediation suite enforcing CIS Benchmark Level 2 controls across Ubuntu server fleets. Hardened kernel parameters, locked down user authentication, and deployed immutable Auditd syscall rules.',
    objectives: [
      'Automate CIS Benchmark Level 2 server remediation',
      'Harden Linux kernel via sysctl network & memory protections',
      'Enforce strict SSH key-only policies with custom porting',
      'Configure immutable auditd rules for sensitive syscall tracking',
      'Deploy stateful UFW ingress filtering with rate limiting',
      'Establish automated file integrity and rootkit scanning',
    ],
    architectureFlow: [
      { label: 'Automated Hardening Script', sublabel: 'Bash CIS L2 Compliance Suite', role: 'attacker' },
      { label: 'Kernel Sysctl Layer', sublabel: 'Disable IP Forward & Spoofing', role: 'network' },
      { label: 'Linux Audit Daemon', sublabel: 'Immutable Auditd Syscall Rules', role: 'sensor' },
      { label: 'Stateful UFW Firewall', sublabel: 'Default Deny + Ingress Rate Limit', role: 'target' },
      { label: 'Central Syslog Shipper', sublabel: 'Forward to Log Server', role: 'siem' },
      { label: 'Compliance Auditor', sublabel: 'Automated Lynis Audit Scoring', role: 'analyst' },
    ],
    environment: [
      { label: 'Operating System', value: 'Ubuntu Server 22.04 LTS (Kernel 5.15)' },
      { label: 'Scripting', value: 'Modular POSIX-compliant Bash' },
      { label: 'Auditing Framework', value: 'Auditd with custom syscall rules' },
      { label: 'Firewall Engine', value: 'UFW / Iptables stateful filter' },
      { label: 'Compliance Target', value: 'CIS Ubuntu 22.04 Benchmark v1.0.0 L2' },
      { label: 'Validation Tool', value: 'Lynis Enterprise Compliance Scanner' },
    ],
    activities: [
      'Kernel parameter lockdown (ICMP redirects, ASLR, SYN cookies)',
      'Immutable auditd rule generation for /etc/shadow and sudo execution',
      'SSH hardening: disabling root login, protocol 1, and password auth',
      'Filesystem permission auditing (SUID/SGID discovery and removal)',
      'Automated Lynis audit scoring before and after hardening',
    ],
    results:
      'Automated CIS Benchmark Level 2 server hardening, validating kernel parameter lockdown, SSH authentication restrictions, and immutable auditd syscall tracking.',
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
    status: 'IN PROGRESS',
    difficulty: 'EXPERT',
    level: 'EXPERT',
    description:
      'Constructed an isolated forest domain to simulate Kerberoasting, AS-REP roasting, and Golden Ticket attacks. Mapped lateral movement paths in BloodHound and built detection rules in Splunk.',
    overview:
      'Constructed a multi-tier Active Directory enterprise environment to simulate advanced persistent threat (APT) credential attacks and lateral movement techniques. Engineered high-fidelity detection signatures in Splunk utilizing Windows Security Event IDs.',
    objectives: [
      'Deploy Windows Server 2022 Forest with realistic enterprise OUs',
      'Simulate Kerberoasting against RC4-encrypted service accounts',
      'Execute BloodHound graph analytics to map unconstrained delegation paths',
      'Collect and ingest Event ID 4769 and 4624 into Splunk SIEM',
      'Develop detection queries with low false-positive rates',
      'Enforce Tiered Administrative Model and Protected Users group',
    ],
    architectureFlow: [
      { label: 'Adversary Workstation', sublabel: 'Rubeus & Mimikatz Toolkit', role: 'attacker' },
      { label: 'Domain Controller', sublabel: 'CORP.LOCAL KDC (Kerberos)', role: 'network' },
      { label: 'Tier 1 Target Host', sublabel: 'Vulnerable Service Account SPN', role: 'target' },
      { label: 'Splunk Universal Forwarder', sublabel: 'Windows Event Log Channel', role: 'sensor' },
      { label: 'Splunk Detection Engine', sublabel: 'SPL TGS Request Rate Rule', role: 'siem' },
      { label: 'Threat Hunter', sublabel: 'Lateral Path Remediation', role: 'analyst' },
    ],
    environment: [
      { label: 'Domain Controller', value: 'Windows Server 2022 Datacenter' },
      { label: 'Attack Simulator', value: 'Kali Linux + Impacket + Rubeus' },
      { label: 'Analysis Tools', value: 'BloodHound 4.3 + SharpHound Collector' },
      { label: 'Log Pipeline', value: 'Splunk UF + Microsoft Security Events' },
      { label: 'Audited Events', value: 'Security IDs 4768, 4769, 4771, 4624' },
      { label: 'Domain Forest', value: 'CORP.LOCAL (Functional Level 2016)' },
    ],
    activities: [
      'SPN account enumeration and Kerberos TGS request analysis',
      'BloodHound graph traversal for shortest paths to Domain Admin',
      'Splunk SPL detection authoring for RC4 downgrade anomalies',
      'Honey-token service account creation for early tripwire alerts',
      'Privileged Access Workstation (PAW) architecture design',
    ],
    results:
      'Identified vulnerable Kerberos service accounts, mapped delegation attack paths in BloodHound, and deployed Splunk alert queries for Event ID 4769 ticket encryption downgrades.',
    technologies: ['Active Directory', 'BloodHound', 'Mimikatz', 'PowerShell', 'Splunk'],
    image: img1,
    githubUrl: 'https://github.com/sec-engineer/ad-threat-hunting-lab',
    architectureDetails: {
      summary: 'Full Active Directory attack & defense simulation environment with Windows Server 2022 domain controllers and workstations.',
      nodes: [
        'CORP.LOCAL Domain Controller',
        'Admin Workstation (BloodHound Collector)',
        'Compromised Endpoint',
        'Splunk SIEM Forwarder',
      ],
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
    overview:
      'Engineered a high-throughput network intrusion detection pipeline using Suricata IDS with automated threat intel feeds from MISP, normalized into Elasticsearch with custom Grok patterns.',
    objectives: [
      'Deploy multi-threaded Suricata IDS engine with AF_PACKET taps',
      'Automate hourly threat intel pulls from MISP STIX/TAXII endpoints',
      'Generate dynamic Suricata dataset rules without restart downtime',
      'Normalize eve.json events using Logstash pipelines with GeoIP enrichment',
      'Build analyst dashboards displaying active C2 communication alerts',
      'Tune false positive signatures to maintain analyst focus',
    ],
    architectureFlow: [
      { label: 'External Internet Feed', sublabel: 'MISP Threat Exchange', role: 'attacker' },
      { label: 'Python Automation Worker', sublabel: 'STIX Ingestion & Rule Compiler', role: 'sensor' },
      { label: 'Suricata IDS Engine', sublabel: 'AF_PACKET Multi-threaded Tap', role: 'network' },
      { label: 'Logstash Pipeline', sublabel: 'Grok Normalization & GeoIP', role: 'target' },
      { label: 'Elasticsearch & Kibana', sublabel: 'Real-Time Threat Heatmaps', role: 'siem' },
      { label: 'SOC Escalation Team', sublabel: 'Automated Egress Blocking', role: 'analyst' },
    ],
    environment: [
      { label: 'Detection Engine', value: 'Suricata 7.0 Multi-Threaded' },
      { label: 'Intel Platform', value: 'MISP 2.4 Open Source Threat Sharing' },
      { label: 'Normalization', value: 'Logstash with custom Grok patterns' },
      { label: 'Storage & UI', value: 'Elasticsearch 8 + Kibana dashboards' },
      { label: 'Automation', value: 'Python 3.11 with PyMISP' },
      { label: 'Deployment', value: 'Docker Compose Containerized Stack' },
    ],
    activities: [
      'Automated malicious IP and hash harvesting from threat sharing communities',
      'Dynamic rule reloading using Suricata unix socket command API',
      'Logstash pipeline design parsing DNS, TLS, and HTTP event types',
      'GeoIP enrichment mapping adversary infrastructure origin points',
      'Rule suppression testing eliminating internal monitoring tool noise',
    ],
    results:
      'Configured automated ingestion of MISP indicator feeds into Suricata rulesets, detecting simulated outbound C2 beacons and streaming normalized events to Elasticsearch.',
    technologies: ['Suricata', 'MISP', 'Docker', 'Python', 'Linux'],
    image: img3,
    githubUrl: 'https://github.com/sec-engineer/suricata-threat-intel-pipeline',
    architectureDetails: {
      summary: 'Automated threat ingestion converting STIX/TAXII indicator feeds into real-time Suricata signature rulesets.',
      nodes: [
        'Suricata Multi-Threaded Engine',
        'MISP Threat Sharing Platform',
        'Logstash Normalizer',
        'Elasticsearch / Kibana Dashboards',
      ],
      mitreTactics: ['TA0011 Command and Control', 'TA0001 Initial Access', 'TA0010 Exfiltration'],
      keyCapabilities: [
        'Automated hourly pulls of malicious C2 IPs and file hashes via Python script',
        'Compiled dynamic Suricata dataset rules without service restart interruption',
        'Streamed eve.json event logs via Logstash pipeline with GeoIP enrichment',
        'Tuned rule signatures and suppressed false-positive alerts on internal subnet scans',
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
  {
    id: 'memory-forensics-dfir',
    title: 'Memory Forensics & DFIR Incident Triage',
    category: 'DFIR',
    status: 'COMPLETED',
    difficulty: 'ADVANCED',
    level: 'ADVANCED',
    description:
      'Analyzed raw RAM dumps from a compromised domain controller using Volatility 3 and Autopsy. Identified injected process hollowing, dumped Cobalt Strike beacons, and carved malicious registry hives.',
    overview:
      'Conducted deep incident response memory forensics on a triage image collected from an active domain controller breach. Dissected unlinked executable code, carved Cobalt Strike beacons from memory pages, and mapped adversary persistence.',
    objectives: [
      'Triage raw physical memory dump with Volatility 3',
      'Detect stealthy process injection (Process Hollowing / Reflective DLLs)',
      'Extract encrypted and plaintext Cobalt Strike C2 configurations',
      'Correlate in-memory network sockets against external adversary IPs',
      'Carve compromised registry hives for persistence run-keys',
      'Compile authoritative DFIR timeline for stakeholder reporting',
    ],
    architectureFlow: [
      { label: 'Compromised DC Memory', sublabel: '64GB Raw RAM Acquisition', role: 'target' },
      { label: 'Volatility 3 Engine', sublabel: 'Kernel Pool & VAD Parsing', role: 'sensor' },
      { label: 'Malfind & PsList', sublabel: 'PAGE_EXECUTE_READWRITE Scan', role: 'attacker' },
      { label: 'Configuration Extractor', sublabel: 'Decrypted Cobalt Strike Watermark', role: 'network' },
      { label: 'Timeline Reconstructor', sublabel: 'Autopsy Artifact Correlation', role: 'siem' },
      { label: 'Lead DFIR Examiner', sublabel: 'Root Cause & Breach Report', role: 'analyst' },
    ],
    environment: [
      { label: 'Forensic Tool', value: 'Volatility 3 v2.5 + Custom Plugins' },
      { label: 'Artifact Platform', value: 'Autopsy 4.19 Digital Forensics' },
      { label: 'YARA Scanner', value: 'YARA v4.3 with THOR rule feeds' },
      { label: 'Sample Image', value: '64GB Raw Dump (Windows Server 2019)' },
      { label: 'Decompiler', value: 'NSA Ghidra 10.4' },
      { label: 'Investigation Scope', value: 'Post-Exploitation Persistence Triage' },
    ],
    activities: [
      'PsScan vs PsList discrepancy analysis to identify unlinked processes',
      'VAD allocation inspection identifying hollowed svchost.exe processes',
      'C2 configuration extraction revealing sleep masks and jitter rates',
      'Memory string extraction for injected PowerShell base64 commands',
      'Compilation of remediation IOC package for enterprise containment',
    ],
    results:
      'Discovered in-memory stealth rootkit that evaded traditional antivirus scanners, extracted adversary C2 server addresses, and generated remediation signatures.',
    technologies: ['Volatility', 'Autopsy', 'Python', 'Linux', 'Git'],
    image: img2,
    githubUrl: 'https://github.com/sec-engineer/memory-forensics-dfir',
    projectUrl: 'https://github.com/sec-engineer/memory-forensics-dfir#case-findings',
    architectureDetails: {
      summary: 'Host memory triage workflow identifying in-memory rootkits, unlinked DLLs, and injected shellcode threads.',
      nodes: [
        'Volatility 3 Framework',
        'Autopsy 4.19 Digital Forensics Platform',
        'YARA Memory Scanner',
        'Ghidra Decompiler',
      ],
      mitreTactics: ['TA0005 Defense Evasion (Process Hollowing)', 'TA0006 Credential Access', 'TA0003 Persistence'],
      keyCapabilities: [
        'Identified anomalous VAD allocation with PAGE_EXECUTE_READWRITE permissions',
        'Extracted orphaned svchost.exe processes hidden from tasklist',
        'Extracted and decrypted Cobalt Strike Malleable C2 configuration profiles',
        'Reconstructed complete adversary incident timeline for IR executive briefing',
      ],
      sampleSnippetTitle: 'volatility_triage.sh',
      sampleSnippet: `python3 vol.py -f memdump.raw windows.pslist
python3 vol.py -f memdump.raw windows.malfind --dump
python3 vol.py -f memdump.raw windows.netscan | grep ESTABLISHED`,
    },
  },
  {
    id: 'web-app-pentest-lab',
    title: 'Web Application Penetration Testing Lab',
    category: 'PENETRATION TESTING',
    status: 'COMPLETED',
    difficulty: 'BEGINNER',
    level: 'BEGINNER',
    description:
      'Constructed a vulnerability testing bench targeting OWASP Top 10 flaws. Simulated SQL injections, SSRF cloud metadata queries, and JWT authentication bypasses using Burp Suite and custom Python exploits.',
    overview:
      'Constructed an isolated vulnerability testing bench targeting OWASP Top 10 flaws in containerized microservices. Evaluated attack vectors including blind SQL injections, SSRF against cloud IMDS, and forged JWT tokens.',
    objectives: [
      'Deploy containerized target applications with intentional OWASP flaws',
      'Simulate blind boolean-based and time-based SQL injection exploits',
      'Test server-side request forgery (SSRF) against internal metadata APIs',
      'Examine JWT cryptographic verification flaws and "none" alg bypasses',
      'Document findings using CVSS 3.1 vulnerability scoring',
      'Provide developer-friendly code remediation pull requests',
    ],
    architectureFlow: [
      { label: 'Security Tester', sublabel: 'Burp Suite Professional Proxy', role: 'attacker' },
      { label: 'Container Bridge', sublabel: 'Docker Network Isolation', role: 'network' },
      { label: 'API Gateway', sublabel: 'Reverse Proxy & JWT Validator', role: 'target' },
      { label: 'PostgreSQL Database', sublabel: 'Vulnerable Query Parameter', role: 'sensor' },
      { label: 'Cloud Metadata Mock', sublabel: '169.254.169.254 Endpoint', role: 'siem' },
      { label: 'AppSec Engineer', sublabel: 'Remediation PR & ORM Migration', role: 'analyst' },
    ],
    environment: [
      { label: 'Interceptor', value: 'Burp Suite Professional 2024.1' },
      { label: 'Scripting', value: 'Python 3.11 with Requests & PyJWT' },
      { label: 'Target App', value: 'Node.js Express + PostgreSQL' },
      { label: 'Container Host', value: 'Docker & Docker Compose' },
      { label: 'Standards', value: 'OWASP Top 10 2021 & ASVS 4.0' },
      { label: 'Report Format', value: 'CVSS 3.1 Detailed Technical Brief' },
    ],
    activities: [
      'Automated parameter fuzzing with Burp Intruder and Turbo Intruder',
      'Blind SQL injection boolean timing exploitation with custom Python PoC',
      'SSRF exploitation targeting internal container environment variables',
      'Alg: "none" and secret brute-forcing against weak JWT tokens',
      'Patch verification proving vulnerability mitigation post-code change',
    ],
    results:
      'Identified and successfully exploited 7 distinct vulnerability chains, subsequently authoring secure coding guidelines and parameterized database wrappers.',
    technologies: ['Burp Suite', 'Python', 'Docker', 'Kali Linux', 'Linux'],
    image: img4,
    githubUrl: 'https://github.com/sec-engineer/web-app-pentest-lab',
    architectureDetails: {
      summary: 'Isolated Docker testing container network hosting deliberately vulnerable enterprise microservices.',
      nodes: [
        'Burp Suite Professional Interceptor',
        'Vulnerable Microservice (Node/Postgres)',
        'Kali Exploit Workstation',
        'Target API Gateway',
      ],
      mitreTactics: ['TA0001 Initial Access (Exploit Public-Facing Application)', 'TA0006 Credential Access', 'TA0007 Discovery'],
      keyCapabilities: [
        'Automated blind SQL injection enumeration using boolean time delays',
        'Exploited SSRF in PDF generation endpoint to query AWS IMDSv2 tokens',
        'Bypassed cryptographic signature verification via "none" algorithm header forging',
        'Authored remediation pull requests implementing parameterized ORM queries',
      ],
      sampleSnippetTitle: 'jwt_forge.py (Proof of Concept Bypass)',
      sampleSnippet: `import hmac, hashlib, base64, json

header = {"alg": "none", "typ": "JWT"}
payload = {"user": "admin", "role": "sec_operator", "admin": True}
token = base64.urlsafe_b64encode(json.dumps(header).encode()).rstrip(b'=') + b'.' + \\
        base64.urlsafe_b64encode(json.dumps(payload).encode()).rstrip(b'=') + b'.'
print(f"Bypassed Token: {token.decode()}")`,
    },
  },
  {
    id: 'siem-detection-engine',
    title: 'Enterprise SIEM Detection Engineering Pipeline',
    category: 'SOC LAB',
    status: 'PLANNED',
    difficulty: 'EXPERT',
    level: 'EXPERT',
    description:
      'Architecting a detection-as-code CI/CD pipeline translating Sigma rule definitions into production Splunk SPL and Elastic EQL queries with automated unit testing against synthetic Caldera attacks.',
    overview:
      'Designing and architecting a Detection-as-Code (DaC) CI/CD automation pipeline. Automatically translates Sigma generic rule definitions into optimized Splunk SPL queries, validated through synthetic Caldera attack replay.',
    objectives: [
      'Implement Detection-as-Code repository with GitHub Actions CI/CD',
      'Automate Sigma to Splunk SPL translation with pySigma',
      'Execute automated Caldera adversary emulation against test runners',
      'Validate alert firing within automated integration testing suite',
      'Deploy version-controlled savedsearches.conf directly to production',
      'Track rule detection efficacy and ATT&CK coverage drift',
    ],
    architectureFlow: [
      { label: 'Sigma Rule Repository', sublabel: 'YAML Detection-as-Code', role: 'attacker' },
      { label: 'GitHub Actions Runner', sublabel: 'Linter, PyTest & pySigma', role: 'network' },
      { label: 'Caldera Emulation Host', sublabel: 'Synthetic Attack Replay', role: 'sensor' },
      { label: 'Splunk Test Cluster', sublabel: 'Live Telemetry Validation', role: 'target' },
      { label: 'Production SIEM API', sublabel: 'Automated Rule Deployment', role: 'siem' },
      { label: 'Detection Engineer', sublabel: 'Coverage Metrics Review', role: 'analyst' },
    ],
    environment: [
      { label: 'CI/CD Pipeline', value: 'GitHub Actions Workflows' },
      { label: 'Rule Format', value: 'Sigma Generic Signatures v2' },
      { label: 'Target SIEM', value: 'Splunk Enterprise 9.2 + REST API' },
      { label: 'Emulation Tool', value: 'MITRE Caldera 4.2' },
      { label: 'Validation Framework', value: 'Python 3.11 with PyTest' },
      { label: 'Coverage Model', value: 'MITRE ATT&CK Enterprise Matrix v14' },
    ],
    activities: [
      'Sigma rule syntax validation and field taxonomy mapping',
      'Automated conversion to Splunk SPL and Elastic EQL',
      'Synthetic attack execution triggering telemetry pipelines',
      'False-positive background noise testing in staging sandboxes',
      'Automated metric dashboard tracking MITRE ATT&CK coverage gains',
    ],
    results:
      'Reduces rule deployment cycle from weeks to minutes while ensuring zero untested signatures reach the production SOC environment.',
    technologies: ['Splunk', 'Python', 'Git', 'Linux', 'Docker'],
    image: img1,
    githubUrl: 'https://github.com/sec-engineer/siem-detection-pipeline',
    architectureDetails: {
      summary: 'Detection engineering lifecycle management repository utilizing GitHub Actions and PyTest for automated SPL linting.',
      nodes: [
        'GitHub Actions CI/CD Runner',
        'Splunk Developer REST API',
        'Sigma Conversion Toolchain',
        'Caldera Adversary Simulator',
      ],
      mitreTactics: ['TA0005 Defense Evasion', 'TA0002 Execution', 'TA0008 Lateral Movement'],
      keyCapabilities: [
        'Automated validation of Sigma YAML syntax against MITRE ATT&CK schema v14',
        'Continuous deployment of savedsearches.conf directly into Splunk cluster',
        'Simulated attack replay verifying true-positive alerting thresholds',
        'Automated detection drift reporting on telemetry field schema updates',
      ],
      sampleSnippetTitle: 'sigma_rule.yml',
      sampleSnippet: `title: Suspicious Process Spawning via WMI
status: experimental
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    ParentImage|endswith: '\\\\WmiPrvSE.exe'
    Image|endswith:
      - '\\\\powershell.exe'
      - '\\\\cmd.exe'
  condition: selection
level: high`,
    },
  },
];
