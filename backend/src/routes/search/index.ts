import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Store, Sweet } from '../../types/index';
import { getFilteredStore } from '../../controllers/search/index'
const router = Router();

router.get('/', (req: Request, res: Response) => {
    try {
    // クエリパラメータからキーワード取得
    const keyword = req.query.q as string;
    console.log("検索キーワード:", keyword);

    //空白文字やクエリがない場合の安全対策
    if (!keyword || keyword.trim() === '') {
        return res.json({ stores: [], sweets: [] });
    }

    // JSONファイルを読み込む
    const sweetsData: Sweet[] = JSON.parse(fs.readFileSync(path.join(__dirname, '../../mocks/sweets.json'), 'utf-8'));
    const storeData: Store[] = JSON.parse(fs.readFileSync(path.join(__dirname, '../../mocks/stores.json'), 'utf-8'));

    // それぞれでフィルタリング
    const filteredStores = getFilteredStore(storeData, keyword);
    const filteredSweets = sweetsData.filter((sweet) =>
        sweet.sweetName?.includes(keyword) || sweet.category?.includes(keyword)
    );
    // 結果をまとめる
    res.json({ 
        stores: filteredStores,
        sweets: filteredSweets
    });

    } catch (error:any) {
        console.error('検索処理中にエラーが発生しました:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

export default router;