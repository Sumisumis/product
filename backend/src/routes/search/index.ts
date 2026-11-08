import { Router, Request, Response } from 'express';
import { getIntegratedSearchResults } from '../../controllers/search/index';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    try {
        // クエリパラメータからキーワードを取得
        const rawQuery = req.query.q || req.query.keyword;

        let keyword = '';

        if (typeof rawQuery === 'string') {
            keyword = rawQuery.trim().toLowerCase();
        }

        // キーワードが空の場合
        if (!keyword) {
            return res.json({ stores: [], sweets: [] });
        }

        // 検索結果を取得
        const resultData = getIntegratedSearchResults(keyword);

        // 結果を返す
        return res.json(resultData);

    } catch (error: any) {
        console.error('Search route error:', error);

        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message || 'データの取得中にエラーが発生しました'
        });
    }
});

export default router;