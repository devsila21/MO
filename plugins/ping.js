module.exports = {
    command: 'ping',
    description: 'Pima muda wa majibu ya bot',
    async execute({ sock, msg, from }) {
        const start = Date.now();
        await sock.sendMessage(from, { text: '☠️ Pinging...' }, { quoted: msg });
        const end = Date.now();
        await sock.sendMessage(from, {
            text: `☠️ *DEATH BOT - PING*\n\n🏓 Pong!\n⚡ Speed: ${end - start}ms\n🟢 Status: Online`
        }, { quoted: msg });
    }
};
