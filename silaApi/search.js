const express = require('express')
const axios = require('axios')
const router = express.Router()

const OMEGA = 'https://omegatech-api.dixonomega.tech/api'

const omega = async (path, params = {}) => {
  const r = await axios.get(`${OMEGA}/${path}`, { params, timeout: 20000, headers: { 'User-Agent': 'SilaTech-API/1.0' } })
  return r.data
}

const ok = (res, data) => res.json({ status: true, creator: 'Sila Tech', result: data.result || data.data || data })
const err = (res, e, name) => { console.error(`[${name}]`, e.message); res.status(500).json({ status: false, creator: 'Sila Tech', message: 'Huduma haipatikani. Jaribu tena.' }) }
const need = (res, ...fields) => res.status(400).json({ status: false, creator: 'Sila Tech', message: `Inahitajika: ${fields.join(', ')}` })

// ── BILIBILI ──
router.get('/bili', async (req, res) => {
  const { q } = req.query
  if (!q) return need(res, 'q')
  try { ok(res, await omega('Search/bili', { q })) } catch(e) { err(res, e, 'Bili') }
})

// ── IMDB ──
router.get('/imdb', async (req, res) => {
  const { query } = req.query
  if (!query) return need(res, 'query')
  try { ok(res, await omega('Search/IMDB', { query })) } catch(e) { err(res, e, 'IMDB') }
})

// ── PINTEREST ──
// /api/search/pinterest?query=Cat&scope=pins
router.get('/pinterest', async (req, res) => {
  const { query, scope = 'pins' } = req.query
  if (!query) return need(res, 'query')
  try { ok(res, await omega('Search/pinterest', { query, scope })) } catch(e) { err(res, e, 'Pinterest') }
})

// ── SOUNDCLOUD ──
router.get('/soundcloud', async (req, res) => {
  const { query } = req.query
  if (!query) return need(res, 'query')
  try { ok(res, await omega('Search/soundcloud', { query })) } catch(e) { err(res, e, 'SoundCloud') }
})

// ── SPOTIFY ──
// /api/search/spotify?query=Cat&type=tracks&preview=true
router.get('/spotify', async (req, res) => {
  const { query, type = 'tracks', preview = 'true' } = req.query
  if (!query) return need(res, 'query')
  try { ok(res, await omega('Search/Spotify', { query, type, preview })) } catch(e) { err(res, e, 'Spotify') }
})

module.exports = router
