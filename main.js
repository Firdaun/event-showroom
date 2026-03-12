import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
const port = 5000

app.use(cors())
app.use(express.static('public'))

app.get('/api/ranking', async (req, res) => {
    try {
        console.log('Sedang mengambil data dari showroom')
        const response = await axios.get('https://www.showroom-live.com/api/events/41907/ranking?room_id=318118')
        res.json(response.data)
    } catch (e) {
        console.error("Gagal mengambil data:", e.message)
        res.status(500).json({ e: "Gagal mengambil data" })
    }
})

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`)
})