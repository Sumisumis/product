import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const normalizeText = (text: string | undefined): string => {
    if (!text) return '';
    return text
        .toLowerCase() // アルファベットを小文字に統一
        .replace(/[\u30a1-\u30f6]/g, (match) => {
            // カタカナをひらがなに変換するマジックコード
            const chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
};

// req を _req に変更して未使用エラーを回避
router.get('/', (_req: Request, res: Response) => {
    try {
        const filePath = path.join(__dirname, '../../mocks/stores.json');

        const rawData = fs.readFileSync(filePath, 'utf-8');
        const storeData = JSON.parse(rawData);

        //クエリパラメータ ?q=を取得
        const keyword = _req.query.q as string;

        if (keyword && keyword.trim() !== '') {
            const normalizedKeyword = normalizeText(keyword);

            const filteredStores = storeData.filter((store: any) => {
                const isNameMatch = normalizeText(store.shopName).includes(normalizedKeyword);
                const isDescMatch = normalizeText(store.description).includes(normalizedKeyword);
                return isNameMatch || isDescMatch;
            });
            return res.json(filteredStores);
        }

        res.json(storeData);
    } catch (error) {
        console.error('店舗データの読み込みエラー:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;