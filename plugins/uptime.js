module.exports = {
    command: 'uptime',
    description: 'Angalia muda bot imekuwa online',
    async execute({ sock, msg, from }) {
        const uptime = Date.now() - global.startTime;
        const seconds = Math.floor((uptime / 1000) % 60);
        const minutes = Math.floor((uptime / (1000 * 60)) % 60);
        const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));

        const text = `
☠️ *DEATH BOT - UPTIME*

📅 Days   : ${days}d
⏰ Hours  : ${hours}h
⏱️ Minutes: ${minutes}m
⏲️ Seconds: ${seconds}s

🟢 Bot ipo hai tangu: ${new Date(global.startTime).toLocaleString()}
        `.trim();

        await sock.sendMessage(from, { text }, { quoted: msg });
    }
};
