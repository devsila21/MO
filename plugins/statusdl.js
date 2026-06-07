module.exports = {
    command: ['sdl', 'statusdl', 'getstatus'],
    description: 'Download status kwa ku-reply',
    async execute({ sock, msg, from, sender, isOwner }) {
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted) {
            return await sock.sendMessage(from, {
                text: `☠️ *DEATH - Status Downloader*\n\n❌ Reply kwa status unayotaka kudownload!\n\nMfano: Reply status kisha andika *${global.prefix}sdl*`
            }, { quoted: msg });
        }

        const { getContentType } = require('@whiskeysockets/baileys');
        const type = getContentType(quoted);

        if (!['imageMessage', 'videoMessage', 'audioMessage'].includes(type)) {
            return await sock.sendMessage(from, {
                text: '☠️ Status hii haiwezi kudownload. Ni picha, video, au audio tu.'
            }, { quoted: msg });
        }

        try {
            const fakeMsg = {
                key: msg.message.extendedTextMessage.contextInfo.stanzaId
                    ? { ...msg.key, id: msg.message.extendedTextMessage.contextInfo.stanzaId }
                    : msg.key,
                message: quoted
            };

            const buffer = await sock.downloadMediaMessage(fakeMsg);
            const mediaType = type === 'imageMessage' ? 'image'
                : type === 'videoMessage' ? 'video'
                : 'audio';

            const caption = quoted[type]?.caption || '';

            await sock.sendMessage(from, {
                [mediaType]: buffer,
                caption: `☠️ *DEATH - Status Downloaded*\n\n📝 Caption: ${caption || 'None'}\n📅 ${new Date().toLocaleString()}`
            }, { quoted: msg });

        } catch (e) {
            await sock.sendMessage(from, {
                text: `☠️ *Error:* Imeshindwa kudownload.\n\n🔴 ${e.message}`
            }, { quoted: msg });
        }
    }
};
