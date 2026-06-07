const express = require('express')
const axios = require('axios')
const router = express.Router()

const YUPRA = 'https://api.yupra.my.id/api'
const OMEGA = 'https://omegatech-api.dixonomega.tech/api'

const yupra = async (path, params = {}) => {
  const r = await axios.get(`${YUPRA}/${path}`, { params, timeout: 15000, headers: { 'User-Agent': 'SilaTech-API/1.0' } })
  return r.data
}

const omega = async (path, params = {}) => {
  const r = await axios.get(`${OMEGA}/${path}`, { params, timeout: 25000, headers: { 'User-Agent': 'SilaTech-API/1.0' } })
  return r.data
}

const ok = (res, data) => res.json({ status: true, creator: 'Sila Tech', result: data.result || data.response || data.url || data.image || data.message || data })
const err = (res, e, name) => { console.error(`[${name}]`, e.message); res.status(500).json({ status: false, creator: 'Sila Tech', message: 'Huduma haipatikani. Jaribu tena.' }) }
const need = (res, ...fields) => res.status(400).json({ status: false, creator: 'Sila Tech', message: `Inahitajika: ${fields.join(', ')}` })

// ── GPT ──
router.get('/gpt', async (req, res) => {
  const { text } = req.query
  if (!text) return need(res, 'text')
  try { ok(res, await yupra('ai/gpt5', { text })) } catch(e) { err(res, e, 'GPT') }
})

// ── CHAT ──
router.get('/chat', async (req, res) => {
  const { text } = req.query
  if (!text) return need(res, 'text')
  try { ok(res, await yupra('ai/chat', { text })) } catch(e) { err(res, e, 'Chat') }
})

// ── THINK ──
router.get('/think', async (req, res) => {
  const { text } = req.query
  if (!text) return need(res, 'text')
  try { ok(res, await yupra('ai/copilot-think', { text })) } catch(e) { err(res, e, 'Think') }
})

// ── IMAGINE ──
router.get('/imagine', async (req, res) => {
  const q = req.query.text || req.query.prompt
  if (!q) return need(res, 'text')
  try { ok(res, await yupra('ai/imagine', { text: q })) } catch(e) { err(res, e, 'Imagine') }
})

// ── SONU3 ──
router.get('/sonu3', async (req, res) => {
  const q = req.query.text || req.query.prompt
  if (!q) return need(res, 'text')
  try { ok(res, await omega('ai/sonu3', { action: 'full', prompt: q })) } catch(e) { err(res, e, 'Sonu3') }
})

// ── FLUX ──
router.get('/flux', async (req, res) => {
  const q = req.query.text || req.query.prompt
  if (!q) return need(res, 'text')
  try { ok(res, await omega('ai/flux', { prompt: q })) } catch(e) { err(res, e, 'Flux') }
})

// ── AI GEN IMAGE ──
// /api/ai/gen-image?prompt=Cat&model=cyberpunk&ratio=square&resolution=768x768&numImages=1
router.get('/gen-image', async (req, res) => {
  const { prompt, model = 'cyberpunk', ratio = 'square', resolution = '768x768', numImages = 1 } = req.query
  if (!prompt) return need(res, 'prompt')
  try { ok(res, await omega('ai/Ai-gen-image', { prompt, model, ratio, resolution, numImages })) } catch(e) { err(res, e, 'GenImage') }
})

// ── ALL AI (list) ──
router.get('/all', async (req, res) => {
  try { ok(res, await omega('ai/All-Ai', {})) } catch(e) { err(res, e, 'AllAi') }
})

// ── AI VIDEO ──
// /api/ai/video?prompt=...&imageUrl=...
router.get('/video', async (req, res) => {
  const { prompt, imageUrl } = req.query
  if (!prompt) return need(res, 'prompt')
  try { ok(res, await omega('ai/Ai-video', { prompt, imageUrl })) } catch(e) { err(res, e, 'AiVideo') }
})

// ── BELLA ──
// /api/ai/bella?text=Hi&dark=true&professor=true&romantic=true
router.get('/bella', async (req, res) => {
  const { text, dark, professor, romantic } = req.query
  if (!text) return need(res, 'text')
  try { ok(res, await omega('ai/Bella', { text, dark, professor, romantic })) } catch(e) { err(res, e, 'Bella') }
})

// ── QWEN / CLAUDE HAIKU ──
// /api/ai/qwen?message=Hi&model=qwen
router.get('/qwen', async (req, res) => {
  const { message, model = 'qwen' } = req.query
  if (!message) return need(res, 'message')
  try { ok(res, await omega('ai/Qwen-Claude-Haiku', { message, model })) } catch(e) { err(res, e, 'Qwen') }
})

// ── GPT-4 MINI ──
router.get('/gpt4mini', async (req, res) => {
  const { message } = req.query
  if (!message) return need(res, 'message')
  try { ok(res, await omega('ai/Gpt-4-mini', { message })) } catch(e) { err(res, e, 'Gpt4Mini') }
})

// ── ISLAM AI ──
router.get('/islam', async (req, res) => {
  const { message, clearSession = 'true' } = req.query
  if (!message) return need(res, 'message')
  try { ok(res, await omega('ai/islam-ai', { message, clearSession })) } catch(e) { err(res, e, 'IslamAi') }
})

// ── CLAUDE ──
router.get('/claude', async (req, res) => {
  const { text } = req.query
  if (!text) return need(res, 'text')
  try { ok(res, await omega('ai/Claude', { text })) } catch(e) { err(res, e, 'Claude') }
})

// ── CLAUDE PRO ──
router.get('/claude-pro', async (req, res) => {
  const { text } = req.query
  if (!text) return need(res, 'text')
  try { ok(res, await omega('ai/Claude-pro', { text })) } catch(e) { err(res, e, 'ClaudePro') }
})

// ── DEEPSEEK ──
// /api/ai/deepseek?message=Hi&model=v32
router.get('/deepseek', async (req, res) => {
  const { message, model = 'v32' } = req.query
  if (!message) return need(res, 'message')
  try { ok(res, await omega('ai/Deepseek', { message, model })) } catch(e) { err(res, e, 'Deepseek') }
})

// ── EASEMATE ──
router.get('/easemate', async (req, res) => {
  const { question } = req.query
  if (!question) return need(res, 'question')
  try { ok(res, await omega('ai/Easemate', { question })) } catch(e) { err(res, e, 'Easemate') }
})

// ── GEMINI TTS ──
router.get('/tts', async (req, res) => {
  const { text } = req.query
  if (!text) return need(res, 'text')
  try { ok(res, await omega('ai/Gemini-tts', { text })) } catch(e) { err(res, e, 'GeminiTTS') }
})

// ── LLAMA CODER ──
// /api/ai/llamacoder?action=create&prompt=...&quality=high
router.get('/llamacoder', async (req, res) => {
  const { prompt, action = 'create', quality = 'high' } = req.query
  if (!prompt) return need(res, 'prompt')
  try { ok(res, await omega('ai/llamacoder', { action, prompt, quality })) } catch(e) { err(res, e, 'LlamaCoder') }
})

// ── MAGIC STUDIO ──
router.get('/magicstudio', async (req, res) => {
  const { prompt } = req.query
  if (!prompt) return need(res, 'prompt')
  try { ok(res, await omega('ai/magicstudio', { prompt })) } catch(e) { err(res, e, 'MagicStudio') }
})

// ── NANO BANANA PRO ──
router.get('/nano', async (req, res) => {
  const { prompt } = req.query
  if (!prompt) return need(res, 'prompt')
  try { ok(res, await omega('ai/nano-banana-pro', { prompt })) } catch(e) { err(res, e, 'Nano') }
})

// ── PERPLEXITY AI ──
router.get('/perplexity', async (req, res) => {
  const { prompt } = req.query
  if (!prompt) return need(res, 'prompt')
  try { ok(res, await omega('ai/perplexity-ai', { prompt })) } catch(e) { err(res, e, 'Perplexity') }
})

// ── TEXT2NSFW ──
router.get('/text2nsfw', async (req, res) => {
  const { q } = req.query
  if (!q) return need(res, 'q')
  try { ok(res, await omega('ai/text2nsfw', { q })) } catch(e) { err(res, e, 'Text2Nsfw') }
})

// ── VENICE UNCENSORED ──
router.get('/venice', async (req, res) => {
  const { message } = req.query
  if (!message) return need(res, 'message')
  try { ok(res, await omega('ai/venice-uncensored', { message })) } catch(e) { err(res, e, 'Venice') }
})

// ── AI RESEARCH ──
router.get('/research', async (req, res) => {
  const { message } = req.query
  if (!message) return need(res, 'message')
  try { ok(res, await omega('ai/Ai-research', { message })) } catch(e) { err(res, e, 'AiResearch') }
})

module.exports = router
