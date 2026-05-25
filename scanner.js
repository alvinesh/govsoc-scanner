const axios = require('axios');
const chalk = require('chalk');

// Capture the IP address typed in the terminal
const targetIP = process.argv[2];

// 1. Guard Clause: Make sure the user actually provided an IP
if (!targetIP) {
    console.log(chalk.red.bold('\n⚠️  GovSOC Error: No target IP provided.'));
    console.log(chalk.yellow('Usage: node scanner.js <IP_ADDRESS>\n'));
    process.exit(1);
}

console.log(chalk.cyan(`\n🔍 Initiating OSINT Scan for target: ${chalk.bold(targetIP)}...\n`));

// 2. The Core Function
async function runThreatScan() {
    try {
        // Ping the free IP-API database
        const response = await axios.get(`http://ip-api.com/json/${targetIP}?fields=status,message,country,regionName,city,isp,org,as,query`);
        const data = response.data;

        // If the IP is invalid or local (like 127.0.0.1)
        if (data.status === 'fail') {
            console.log(chalk.red.bold(`❌ Scan Failed: ${data.message}`));
            return;
        }

        // 3. Print the Intelligence Report to the terminal
        console.log(chalk.bgBlue.white.bold(' === GOVSOC THREAT INTELLIGENCE REPORT === '));
        console.log(chalk.green('Location:   ') + `${data.city}, ${data.regionName}, ${data.country}`);
        console.log(chalk.green('ISP:        ') + data.isp);
        console.log(chalk.green('Org:        ') + data.org);
        console.log(chalk.green('ASN:        ') + data.as);
        
        // A simple logic check: If the ISP is a known hosting provider (often used by VPNs/Proxies/Bots)
        const suspiciousISPs = ['DigitalOcean', 'Amazon', 'OVH', 'Choopa', 'Linode'];
        const isSuspicious = suspiciousISPs.some(isp => data.isp.includes(isp));

        console.log('\n' + chalk.yellow.bold('--- RISK ANALYSIS ---'));
        if (isSuspicious) {
            console.log(chalk.red('⚠️  WARNING: Traffic originates from a datacenter/cloud provider.'));
            console.log(chalk.red('This is highly indicative of a VPN, Proxy, or automated botnet.'));
        } else {
            console.log(chalk.green('✅ Standard residential or commercial ISP. Low immediate risk.'));
        }
        console.log('\n');

    } catch (error) {
        console.log(chalk.red('⚠️  Failed to connect to OSINT databases.'));
        console.error(error.message);
    }
}

// 4. Execute the scan
runThreatScan();