const express = require('express')
const axios = require('axios')
const router = express.Router()

const UNSPLASH_API_KEY = 'TKwNF_gHeB4Z6ieR6sV_Q8gIkQW_VFOcmiNfD0AX0uM'
const UNSPLASH_BASE = 'https://api.unsplash.com'

// ================================
// GET /api/img/search
// ================================
router.get('/search', async (req, res) => {
    try {
        const { text, query, count = 5 } = req.query
        const q = text || query

        if (!q) {
            return res.status(400).json({
                status: false,
                creator: 'Sila Tech',
                message: 'Parameter "text" inahitajika. Mfano: /api/img/search?text=nature'
            })
        }

        const response = await axios.get(`${UNSPLASH_BASE}/search/photos`, {
            params: {
                query: q,
                per_page: Math.min(Number(count), 20),
                client_id: UNSPLASH_API_KEY
            },
            timeout: 15000
        })

        const photos = response.data.results.map(photo => ({
            id: photo.id,
            description: photo.alt_description || photo.description || '',
            url: photo.urls.regular,
            thumb: photo.urls.thumb,
            full: photo.urls.full,
            photographer: photo.user.name,
            photographer_url: photo.user.links.html
        }))

        return res.json({
            status: true,
            creator: 'Sila Tech',
            total: response.data.total,
            count: photos.length,
            result: photos
        })

    } catch (err) {
        console.error('[IMG Search Error]', err.message)
        return res.status(500).json({
            status: false,
            creator: 'Sila Tech',
            message: 'Huduma haipatikani sasa hivi. Jaribu tena baadaye.'
        })
    }
})

// ================================
// GET /api/img/random
// ================================
router.get('/random', async (req, res) => {
    try {
        const { text, query } = req.query
        const q = text || query

        const params = {
            client_id: UNSPLASH_API_KEY,
            ...(q && { query: q })
        }

        const response = await axios.get(`${UNSPLASH_BASE}/photos/random`, {
            params,
            timeout: 15000
        })

        const photo = response.data

        return res.json({
            status: true,
            creator: 'Sila Tech',
            result: {
                id: photo.id,
                description: photo.alt_description || photo.description || '',
                url: photo.urls.regular,
                thumb: photo.urls.thumb,
                full: photo.urls.full,
                photographer: photo.user.name,
                photographer_url: photo.user.links.html
            }
        })

    } catch (err) {
        console.error('[IMG Random Error]', err.message)
        return res.status(500).json({
            status: false,
            creator: 'Sila Tech',
            message: 'Huduma haipatikani sasa hivi. Jaribu tena baadaye.'
        })
    }
})

module.exports = router
