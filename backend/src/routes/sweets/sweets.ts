import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// スイーツ一覧（全件）を返すルーター
router.get('/', (req: Request, res: Response) => {
    try {
        const filePath = path.join(__dirname, '../../mocks/sweets.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        const sweetsData = JSON.parse(data);
        res.json(sweetsData);
    } catch (error) {
        console.error('スイーツデータの読み込みに失敗しました:', error);
        res.status(500).json({ error: 'データの読み込みに失敗しました' });
    }
});

export default router;