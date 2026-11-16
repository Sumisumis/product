
import { Router, Request, Response } from 'express';
import { getIntegratedSearchResults } from '../../controllers/search/index';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    try {
        // q または keyword から検索キーワードを取得
        const rawQuery = req.query.q || req.query.keyword;

        const keyword =
            typeof rawQuery === 'string' ? rawQuery.trim() : '';

        // 検索キーワードが空の場合
        if (!keyword) {
            return res.json({ stores: [], sweets: [] });
        }

        // 検索処理を実行
        const resultData = getIntegratedSearchResults(keyword);

        res.json(resultData);
    } catch (error: any) {
        console.error('検索処理中にエラーが発生しました:', error);

        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message || 'データの取得に失敗しました'
        });
    }
});

export default router;
