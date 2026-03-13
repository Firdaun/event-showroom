import express, { type Request, type Response } from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import axios from 'axios'

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express()
const port = 5000

app.use(cors())
app.use(express.static(path.join(dirname,'../public')))

app.get('/api/ranking', async (_: Request, res: Response) => {
    try {
        console.log('Sedang mengambil data dari showroom')
        const response = await axios.get('https://www.showroom-live.com/api/events/41907/ranking?room_id=318118')
        res.json(response.data)
    } catch (e: unknown) {
        console.error("Gagal mengambil data:", (e as Error).message)
        res.status(500).json({ e: "Gagal mengambil data" })
    }
})

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`)
})