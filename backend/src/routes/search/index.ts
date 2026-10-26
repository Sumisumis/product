import { Router, Request, Response } from 'express';
import { getIntegratedSearchResults } from '../../controllers/search/index';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    try {
        // 1. クエリパラメータからキーワード取得
        let keyword = '';
        const rawQuery = req.query.q || req.query.keyword;
    
        if (typeof rawQuery === 'string' ){
            keyword = rawQuery.trim().toLowerCase();
        }
        
        // 空文字・クエリなしの対策
        if (!keyword) {
            return res.json({ stores: [], sweets: [] });
        }

        // 2．コントローラを呼び出して検索結果を取得
        const resultData = getIntegratedSearchResults(keyword);

        // 3. 結果を返す
        res.json(resultData);

    } catch (error: any) {
        console.error('Search route error:', error);
        res.status(500).json({
             error: 'Internal Server Error',
             message: error.message || 'データの取得中にエラーが発生しました'
        });
    }
});

export default router;