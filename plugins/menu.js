module.exports = {
    command: ['menu', 'help', 'list'],
    description: 'Orodha ya commands zote',
    async execute({ sock, msg, from }) {
        const text = `
☠️ *DEATH BOT - MENU* ☠️

╔══════════════════════════╗
║  💀  D E A T H  B O T   ║
╚══════════════════════════╝

⚙️ *Auto Features (Zinafanya kazi zenyewe)*
┌──────────────────────────
│ 👁️ Auto View Status
│ ❤️ Auto Like Status  
│ ⌨️ Auto Typing
│ 🔍 ViewOnce → DM Owner
│ 📥 Status Auto Download
└──────────────────────────

📋 *Commands (Prefix: ${global.prefix})*

🔧 *General*
┌──────────────────────────
│ ${global.prefix}ping     - Pima muda wa majibu
│ ${global.prefix}alive    - Angalia bot ipo online
│ ${global.prefix}uptime   - Muda bot imekuwa online
│ ${global.prefix}info     - Maelezo ya bot
│ ${global.prefix}menu     - Orodha hii ya commands
└──────────────────────────

📥 *Downloader*
┌──────────────────────────
│ ${global.prefix}sdl      - Download status (Reply status)
└──────────────────────────

> ☠️ _DEATH BOT - Fear the Reaper_
> 👑 _Owner: @${global.owner.split('@')[0]}_
        `.trim();

        await sock.sendMessage(from, {
            text,
            mentions: [global.owner]
        }, { quoted: msg });
    }
};
