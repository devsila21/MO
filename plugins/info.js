const os = require('os');

module.exports = {
    command: 'info',
    description: 'Maelezo ya bot',
    async execute({ sock, msg, from }) {
        const platform = os.platform();
        const nodeVersion = process.version;
        const memTotal = (os.totalmem() / 1024 / 1024).toFixed(0);
        const memFree = (os.freemem() / 1024 / 1024).toFixed(0);
        const memUsed = (memTotal - memFree).toFixed(0);
        const cpus = os.cpus()[0]?.model || 'Unknown';

        const text = `
☠️ *DEATH BOT - INFO* ☠️

╔══════════════════════════╗
║      💀  DEATH BOT       ║
╚══════════════════════════╝

🤖 *Bot Info*
• Name     : DEATH BOT
• Prefix   : ${global.prefix}
• Library  : Baileys (Whiskey Sockets)
• Language : JavaScript (Node.js)

💻 *Server Info*
• Platform : ${platform}
• Node.js  : ${nodeVersion}
• CPU      : ${cpus}
• RAM      : ${memUsed}MB / ${memTotal}MB

⚙️ *Features*
• 👁️ Auto View Status
• ❤️ Auto Like Status  
• ⌨️ Auto Typing
• 🔍 ViewOnce Reveal → DM Owner
• 📥 Status Downloader
• 💬 Commands System

👑 *Owner*: @${global.owner.split('@')[0]}

> _☠️ DEATH BOT - Fear the Reaper_
        `.trim();

        await sock.sendMessage(from, {
            text,
            mentions: [global.owner]
        }, { quoted: msg });
    }
};
