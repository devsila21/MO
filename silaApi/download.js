const express = require('express')
const axios = require('axios')
const router = express.Router()

const OMEGA = 'https://omegatech-api.dixonomega.tech/api'

const omega = async (path, params = {}) => {
  const r = await axios.get(`${OMEGA}/${path}`, { params, timeout: 30000, headers: { 'User-Agent': 'SilaTech-API/1.0' } })
  return r.data
}

const ok = (res, data) => res.json({ status: true, creator: 'Sila Tech', result: data.result || data.url || data.data || data })
const err = (res, e, name) => { console.error(`[${name}]`, e.message); res.status(500).json({ status: false, creator: 'Sila Tech', message: 'Huduma haipatikani. Jaribu tena.' }) }
const need = (res, ...fields) => res.status(400).json({ status: false, creator: 'Sila Tech', message: `Inahitajika: ${fields.join(', ')}` })

// ── ALL DOWNLOADER (FB, IG, TT, YT...) ──
// /api/download/all?url=https://...
router.get('/all', async (req, res) => {
  const { url } = req.query
  if (!url) return need(res, 'url')
  try { ok(res, await omega('download/all', { url })) } catch(e) { err(res, e, 'DlAll') }
})

// ── PLAY DOWNLOADER (Audio/Video search & download) ──
// /api/download/play?query=Faded&format=mp4&quality=128k
router.get('/play', async (req, res) => {
  const { query, format = 'mp4', quality = '128k' } = req.query
  if (!query) return need(res, 'query')
  try { ok(res, await omega('download/play', { query, format, quality })) } catch(e) { err(res, e, 'DlPlay') }
})

module.exports = router
