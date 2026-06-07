# ☠️ DEATH BOT - WhatsApp Bot

```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║    ██████╗ ███████╗ █████╗ ████████╗██╗  ██╗         ║
║    ██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║  ██║         ║
║    ██║  ██║█████╗  ███████║   ██║   ███████║         ║
║    ██║  ██║██╔══╝  ██╔══██║   ██║   ██╔══██║         ║
║    ██████╔╝███████╗██║  ██║   ██║   ██║  ██║         ║
║    ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝         ║
║                    B O T                             ║
║           Powered by Baileys (Whiskey Sockets)       ║
╚══════════════════════════════════════════════════════╝
```

## 🔥 Features

| Feature | Hali |
|---------|------|
| 👁️ Auto View Status | ✅ Inafanya kazi |
| ❤️ Auto Like Status | ✅ Inafanya kazi |
| ⌨️ Auto Typing | ✅ Inafanya kazi |
| 🔍 ViewOnce → DM Owner | ✅ Inafanya kazi |
| 📥 Status Auto Download | ✅ Inafanya kazi |
| 📋 Commands System | ✅ Inafanya kazi |

---

## 📦 Mahitaji (Requirements)

- **Node.js** v18+ → https://nodejs.org
- **Git** → https://git-scm.com
- Simu au PC yenye WhatsApp

---

## 🚀 Jinsi ya Kuanzisha (Setup)

### Hatua ya 1 — Download na Install

```bash
# Clone au copy folder ya DEATH-BOT kwenye PC yako
cd DEATH-BOT

# Install packages zote
npm install
```

### Hatua ya 2 — Weka Nambari yako

Fungua faili **`index.js`** mstari huu wa juu:

```js
global.owner = process.env.OWNER_NUMBER || 'YOUR_NUMBER@s.whatsapp.net';
```

Badilisha `YOUR_NUMBER` na nambari yako ya WhatsApp:

```js
global.owner = '254712345678@s.whatsapp.net'; // Mfano wa Kenya
```

> ⚠️ **Muhimu**: Weka nambari bila `+` au `-`. Mfano: `254712345678` siyo `+254 712 345 678`

### Hatua ya 3 — Anzisha Bot

```bash
npm start
```

### Hatua ya 4 — Scan QR Code

- QR code itaonekana kwenye terminal
- Fungua WhatsApp yako → **Linked Devices** → **Link a Device**
- Scan QR code

Bot itaanza na utatumwa ujumbe: **"☠️ DEATH BOT IMEANZA!"**

---

## 📋 Commands Zote

| Command | Maelezo |
|---------|---------|
| `.ping` | Pima muda wa majibu ya bot |
| `.alive` | Angalia kama bot ipo online |
| `.uptime` | Muda bot imekuwa ikifanya kazi |
| `.info` | Maelezo kamili ya bot na server |
| `.menu` | Orodha ya commands zote |
| `.sdl` | Download status (Reply status kisha tuma command) |

---

## ⚙️ Features Explained

### 👁️ Auto View Status
Bot inasoma status za contacts wako wote automatically bila kufanya chochote.

### ❤️ Auto Like Status
Baada ya kuona status, bot inapenda (❤️) status hiyo automatically.

### ⌨️ Auto Typing
Kila wakati mtu anapotuma ujumbe, bot inaonyesha "typing..." kabla ya kujibu - inaonekana kama mtu wa kweli.

### 🔍 ViewOnce Reveal → Owner DM
**Hii ni feature muhimu sana!**
- Mtu akitumia ViewOnce message (picha/video inayoweza kuonekana mara moja tu)
- Bot inakopi na kuituma **DM kwa owner** kabla haijaisha
- Inaonyesha: Nani alituma, kutoka group gani, na wakati gani

### 📥 Status Auto Download
- Bot inasave picha na video za status za contacts wako
- Zinakuja DM kwenye nambari ya owner automatically

---

## 📁 Muundo wa Faili

```
DEATH-BOT/
├── index.js              ← Faili kuu (main)
├── package.json          ← Dependencies
├── .env.example          ← Config template
├── auth_info/            ← Session (itaundwa baada ya scan)
└── plugins/
    ├── ping.js           ← .ping command
    ├── alive.js          ← .alive command
    ├── uptime.js         ← .uptime command
    ├── info.js           ← .info command
    ├── menu.js           ← .menu command
    └── statusdl.js       ← .sdl command
```

---

## 🔧 Kuongeza Command Mpya

Unda faili jipya ndani ya `plugins/` folder:

```js
// plugins/hello.js
module.exports = {
    command: 'hello',           // Au: ['hello', 'hi', 'habari']
    description: 'Salamu',
    async execute({ sock, msg, from, sender, args, isOwner }) {
        await sock.sendMessage(from, {
            text: '☠️ Habari! Mimi ni DEATH BOT!'
        }, { quoted: msg });
    }
};
```

Sasa `.hello` itafanya kazi automatically — **hakuna haja ya kugusa index.js**!

---

## 🐛 Matatizo ya Kawaida

| Tatizo | Suluhisho |
|--------|-----------|
| QR code haitokei | Futa `auth_info/` folder kisha `npm start` tena |
| Bot haifanyi kazi | Angalia Node.js version: `node --version` (lazima v18+) |
| ViewOnce haifanyi kazi | Hakikisha nambari ya owner imeandikwa vizuri |
| `npm install` error | Jaribu `npm install --legacy-peer-deps` |

---

## 💻 Run 24/7 (Server/VPS)

### Kwa kutumia PM2:
```bash
npm install -g pm2
pm2 start index.js --name "DEATH-BOT"
pm2 save
pm2 startup
```

### Kwa kutumia screen (Linux):
```bash
screen -S death
npm start
# Ctrl+A lisha D kuacha bila kuzima
```

---

## ⚠️ Muhimu

- Tumia bot hii kwa matumizi yako mwenyewe tu
- Usitumie kwa spam au kutuma ujumbe bila ruhusa
- WhatsApp inaweza kuban akaunti zinazotumia bots vibaya

---

*☠️ DEATH BOT — Fear the Reaper*
