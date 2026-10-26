import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const getUserProfile = (req: Request, res: Response) => {
    try {
        // 1. JSONファイルのパスを指定
        const userProfilePath = path.join(__dirname, '../../mocks/userProfile.json');
        const storesPath = path.join(__dirname, '../../mocks/stores.json');

        // 2. データを読み込む
        const userProfileData = JSON.parse(fs.readFileSync(userProfilePath, 'utf-8'));
        const storesData = JSON.parse(fs.readFileSync(storesPath, 'utf-8'));

        // 3. favoriteShopIds を使って、お気に入り店舗の詳細データを抽出
        // ※ stores.json の中の shopId が、userProfileData の favoriteShopIds に含まれているかチェック
        const favoriteStoresDetails = storesData.filter((store: any) => 
            userProfileData.favoriteShopIds.includes(store.shopId)
        );

        // 4. フロントエンドに返すデータ（合体させたデータ）を作成
        const responseData = {
            ...userProfileData,
            favoriteStores: favoriteStoresDetails
        };

        // 5. JSONレスポンスを返す
        res.json(responseData);

    } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};