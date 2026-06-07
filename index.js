const express = require('express')
const rateLimit = require('express-rate-limit')

const aiRouter       = require('./silaApi/ai')
const thinkRouter    = require('./silaApi/think')
const imgRouter      = require('./silaApi/img')
const downloadRouter = require('./silaApi/download')
const searchRouter   = require('./silaApi/search')
const toolsRouter    = require('./silaApi/tools')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Rate limit
app.use(rateLimit({
  windowMs: 60 * 1000, max: 100,
  message: { status: false, creator: 'Sila Tech', message: 'Umezidi kikomo. Jaribu baada ya dakika moja.' }
}))

// ── ROUTES ──
app.use('/api/ai',       aiRouter)
app.use('/api/ai',       thinkRouter)
app.use('/api/img',      imgRouter)
app.use('/api/download', downloadRouter)
app.use('/api/search',   searchRouter)
app.use('/api/tools',    toolsRouter)

// ── HOME ──
app.get('/', (req, res) => {
  res.json({
    status: true,
    name: 'Sila Tech API',
    version: '1.0.0',
    creator: 'Sila Tech',
    website: 'https://silatech.site',
    endpoints: {
      ai: {
        gpt:         'GET /api/ai/gpt?text=',
        chat:        'GET /api/ai/chat?text=',
        think:       'GET /api/ai/think?text=',
        imagine:     'GET /api/ai/imagine?text=',
        sonu3:       'GET /api/ai/sonu3?text=',
        flux:        'GET /api/ai/flux?text=',
        'gen-image': 'GET /api/ai/gen-image?prompt=&model=cyberpunk&ratio=square&resolution=768x768&numImages=1',
        all:         'GET /api/ai/all',
        video:       'GET /api/ai/video?prompt=&imageUrl=',
        bella:       'GET /api/ai/bella?text=&dark=true&professor=true&romantic=true',
        qwen:        'GET /api/ai/qwen?message=&model=qwen',
        gpt4mini:    'GET /api/ai/gpt4mini?message=',
        islam:       'GET /api/ai/islam?message=',
        claude:      'GET /api/ai/claude?text=',
        'claude-pro':'GET /api/ai/claude-pro?text=',
        deepseek:    'GET /api/ai/deepseek?message=&model=v32',
        easemate:    'GET /api/ai/easemate?question=',
        tts:         'GET /api/ai/tts?text=',
        llamacoder:  'GET /api/ai/llamacoder?prompt=&action=create&quality=high',
        magicstudio: 'GET /api/ai/magicstudio?prompt=',
        nano:        'GET /api/ai/nano?prompt=',
        perplexity:  'GET /api/ai/perplexity?prompt=',
        text2nsfw:   'GET /api/ai/text2nsfw?q=',
        venice:      'GET /api/ai/venice?message=',
        research:    'GET /api/ai/research?message='
      },
      img: {
        search: 'GET /api/img/search?text=&count=5',
        random: 'GET /api/img/random?text='
      },
      download: {
        all:  'GET /api/download/all?url=',
        play: 'GET /api/download/play?query=&format=mp4&quality=128k'
      },
      search: {
        bili:       'GET /api/search/bili?q=',
        imdb:       'GET /api/search/imdb?query=',
        pinterest:  'GET /api/search/pinterest?query=&scope=pins',
        soundcloud: 'GET /api/search/soundcloud?query=',
        spotify:    'GET /api/search/spotify?query=&type=tracks&preview=true'
      },
      tools: {
        convert: 'GET /api/tools/convert?fileUrl=&from=jpeg&to=png',
        ocr:     'GET /api/tools/ocr?imageUrl=',
        remini:  'GET /api/tools/remini?url='
      }
    }
  })
})

// 404
app.use((req, res) => {
  res.status(404).json({ status: false, creator: 'Sila Tech', message: `Endpoint "${req.path}" haipatikani.`, docs: 'https://api.silatech.site' })
})

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════╗
  ║       SILA TECH API v1.0         ║
  ║  Running on port: ${PORT}           ║
  ║  https://api.silatech.site       ║
  ╚══════════════════════════════════╝
  `)
})
