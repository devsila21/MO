const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, jidDecode, proto, getContentType } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const chalk = require('chalk');

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

global.owner = process.env.OWNER_NUMBER || 'YOUR_NUMBER@s.whatsapp.net'; // e.g. 254712345678@s.whatsapp.net
global.botName = 'DEATH';
global.prefix = '.';
global.startTime = Date.now();

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ['DEATH-BOT', 'Chrome', '1.0.0'],
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id);
                return msg?.message || undefined;
            }
            return { conversation: 'DEATH BOT' };
        }
    });

    store?.bind(sock.ev);

    // ─── CONNECTION ───────────────────────────────────────────────────────────
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)
                ? lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut
                : true;
            console.log(chalk.red('[DEATH] Disconnected. Reconnecting:', shouldReconnect));
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log(chalk.green('[DEATH] ☠️  Bot imeunganishwa kikamilifu!'));
            sock.sendMessage(global.owner, { text: `☠️ *DEATH BOT IMEANZA!*\n\n⏰ Wakati: ${new Date().toLocaleString()}\n🔗 Version: ${version.join('.')}` });
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // ─── MESSAGES ─────────────────────────────────────────────────────────────
    sock.ev.on('messages.upsert', async (m) => {
        try {
            const msg = m.messages[0];
            if (!msg.message) return;

            const from = msg.key.remoteJid;
            const sender = msg.key.participant || msg.key.remoteJid;
            const isOwner = sender.replace(/[^0-9]/g, '') === global.owner.replace(/[^0-9]/g, '');
            const type = getContentType(msg.message);
            const body = type === 'conversation' ? msg.message.conversation
                : type === 'extendedTextMessage' ? msg.message.extendedTextMessage.text
                : type === 'imageMessage' ? msg.message.imageMessage.caption
                : type === 'videoMessage' ? msg.message.videoMessage.caption
                : '';

            // ── AUTO TYPING ───────────────────────────────────────────────────
            await sock.sendPresenceUpdate('composing', from);
            setTimeout(() => sock.sendPresenceUpdate('paused', from), 1500);

            // ── VIEW ONCE FORWARDER ────────────────────────────────────────────
            const viewOnceTypes = ['viewOnceMessage', 'viewOnceMessageV2', 'viewOnceMessageV2Extension'];
            const isViewOnce = viewOnceTypes.includes(type);

            if (isViewOnce) {
                const voMsg = msg.message[type];
                const voType = getContentType(voMsg.message);
                const voContent = voMsg.message[voType];

                console.log(chalk.yellow(`[DEATH] ViewOnce detected from ${sender}`));

                try {
                    const buffer = await sock.downloadMediaMessage(msg);
                    const mediaType = voType === 'imageMessage' ? 'image' : 'video';
                    await sock.sendMessage(global.owner, {
                        [mediaType]: buffer,
                        caption: `☠️ *DEATH - ViewOnce Intercepted!*\n\n👤 From: @${sender.split('@')[0]}\n📍 Chat: ${from}\n📅 Time: ${new Date().toLocaleString()}`,
                        mentions: [sender]
                    });
                    console.log(chalk.green('[DEATH] ViewOnce forwarded to owner!'));
                } catch (e) {
                    console.error('[DEATH] ViewOnce error:', e.message);
                    await sock.sendMessage(global.owner, {
                        text: `☠️ *DEATH - ViewOnce Alert!*\n\n👤 From: @${sender.split('@')[0]}\n⚠️ Could not download media.\n📅 ${new Date().toLocaleString()}`,
                        mentions: [sender]
                    });
                }
            }

            // ── COMMANDS ──────────────────────────────────────────────────────
            if (!body.startsWith(global.prefix)) return;

            const args = body.slice(global.prefix.length).trim().split(/\s+/);
            const command = args.shift().toLowerCase();

            const pluginFiles = fs.readdirSync('./plugins').filter(f => f.endsWith('.js'));
            for (const file of pluginFiles) {
                const plugin = require(`./plugins/${file}`);
                if (plugin.command === command || (Array.isArray(plugin.command) && plugin.command.includes(command))) {
                    await plugin.execute({ sock, msg, from, sender, args, isOwner, body });
                    break;
                }
            }
        } catch (e) {
            console.error('[DEATH] Message error:', e.message);
        }
    });

    // ─── STATUS AUTO VIEW & LIKE ──────────────────────────────────────────────
    sock.ev.on('messages.upsert', async (m) => {
        try {
            for (const msg of m.messages) {
                if (msg.key.remoteJid === 'status@broadcast') {
                    // Auto view
                    await sock.readMessages([msg.key]);
                    console.log(chalk.cyan(`[DEATH] Status viewed: ${msg.key.participant}`));

                    // Auto react/like with ❤️
                    await sock.sendMessage('status@broadcast', {
                        react: { text: '❤️', key: msg.key }
                    }, { statusJidList: [msg.key.participant] });
                    console.log(chalk.magenta(`[DEATH] Status liked: ${msg.key.participant}`));

                    // STATUS DOWNLOAD (images/videos only, forwarded to owner)
                    const type = getContentType(msg.message);
                    if (type === 'imageMessage' || type === 'videoMessage') {
                        try {
                            const buffer = await sock.downloadMediaMessage(msg);
                            const mediaType = type === 'imageMessage' ? 'image' : 'video';
                            const caption = msg.message[type]?.caption || '';
                            await sock.sendMessage(global.owner, {
                                [mediaType]: buffer,
                                caption: `☠️ *DEATH - Status Downloaded*\n\n👤 From: @${msg.key.participant?.split('@')[0]}\n📝 Caption: ${caption || 'None'}\n📅 ${new Date().toLocaleString()}`,
                            });
                        } catch (e) {
                            // silent
                        }
                    }
                }
            }
        } catch (e) {
            // silent
        }
    });

    return sock;
}

startBot().catch(console.error);
