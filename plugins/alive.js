module.exports = {
    command: ['alive', 'online'],
    description: 'Angalia kama bot ipo online',
    async execute({ sock, msg, from }) {
        const text = `
☠️ *DEATH BOT - ALIVE* ☠️

╔══════════════════════╗
║  💀 DEATH IS ALIVE!  ║
╚══════════════════════╝

🤖 Bot: DEATH BOT
🟢 Status: Online & Active
⚡ Auto Typing: ✅
👁️ Auto View Status: ✅
❤️ Auto Like Status: ✅
🔒 ViewOnce Reveal: ✅
📥 Status Download: ✅

> _Powered by DEATH BOT_
        `.trim();

        await sock.sendMessage(from, { text }, { quoted: msg });
    }
};
