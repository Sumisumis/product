import { Router, Request, Response } from 'express';
<<<<<<< HEAD
import fs from 'fs';
import path from 'path';
import { Store, Sweet } from '../../types/index';
import { getFilteredStore } from '../../controllers/search/index'
=======
import { getIntegratedSearchResults } from '../../controllers/search/index';

>>>>>>> 53cd18b16e7477897edd475e11dd6b49e7d051d0
const router = Router();

router.get('/', (req: Request, res: Response) => {
    try {
<<<<<<< HEAD
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
=======
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
>>>>>>> 53cd18b16e7477897edd475e11dd6b49e7d051d0
    }
});

export default router;