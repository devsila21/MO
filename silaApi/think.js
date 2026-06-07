const express = require('express')
const axios = require('axios')
const router = express.Router()

const YUPRA_BASE = 'https://api.yupra.my.id/api'

// ================================
// GET /api/ai/think
// ================================
router.get('/think', async (req, res) => {
    try {
        const { text } = req.query

        if (!text) {
            return res.status(400).json({
                status: false,
                creator: 'Sila Tech',
                message: 'Parameter "text" inahitajika. Mfano: /api/ai/think?text=swali_lako'
            })
        }

        const response = await axios.get(`${YUPRA_BASE}/ai/copilot-think`, {
            params: { text },
            timeout: 20000,
            headers: { 'User-Agent': 'SilaTech-API/1.0' }
        })

        return res.json({
            status: true,
            creator: 'Sila Tech',
            result: response.data?.result || response.data?.message || response.data
        })

    } catch (err) {
        console.error('[Think Error]', err.message)
        return res.status(500).json({
            status: false,
            creator: 'Sila Tech',
            message: 'Huduma haipatikani sasa hivi. Jaribu tena baadaye.'
        })
    }
})

module.exports = router
