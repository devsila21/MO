const express = require('express')
const axios = require('axios')
const router = express.Router()

const OMEGA = 'https://omegatech-api.dixonomega.tech/api'

const omega = async (path, params = {}) => {
  const r = await axios.get(`${OMEGA}/${path}`, { params, timeout: 25000, headers: { 'User-Agent': 'SilaTech-API/1.0' } })
  return r.data
}

const ok = (res, data) => res.json({ status: true, creator: 'Sila Tech', result: data.result || data.url || data.text || data.data || data })
const err = (res, e, name) => { console.error(`[${name}]`, e.message); res.status(500).json({ status: false, creator: 'Sila Tech', message: 'Huduma haipatikani. Jaribu tena.' }) }
const need = (res, ...fields) => res.status(400).json({ status: false, creator: 'Sila Tech', message: `Inahitajika: ${fields.join(', ')}` })

// ── IMAGE CONVERTER ──
// /api/tools/convert?fileUrl=...&from=jpeg&to=png
router.get('/convert', async (req, res) => {
  const { fileUrl, from, to } = req.query
  if (!fileUrl || !from || !to) return need(res, 'fileUrl, from, to')
  try { ok(res, await omega('tools/Image-converter', { fileUrl, from, to })) } catch(e) { err(res, e, 'ImgConvert') }
})

// ── OCR ──
// /api/tools/ocr?imageUrl=...
router.get('/ocr', async (req, res) => {
  const { imageUrl } = req.query
  if (!imageUrl) return need(res, 'imageUrl')
  try { ok(res, await omega('tools/Ocr', { imageUrl })) } catch(e) { err(res, e, 'OCR') }
})

// ── REMINI (Photo Enhancer) ──
// /api/tools/remini?url=...
router.get('/remini', async (req, res) => {
  const { url } = req.query
  if (!url) return need(res, 'url')
  try { ok(res, await omega('tools/remini', { url })) } catch(e) { err(res, e, 'Remini') }
})

module.exports = router
