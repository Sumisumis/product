import fs from 'fs';
import path from 'path';
import { Store, Sweet } from '../../types/index';

// カタカナひらがな変換
const toHiragana = (text: string): string => {
    return text.replace(/[\u30A1-\u30F6]/g, match => 
        String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
};

// 店検索ロジック
export const getFilteredStore = (storeData: Store[], keyword: string): Store[] => {
    return storeData.filter((store) => {
        if (!keyword) return true;

        // 1. キーワードを小文字に変換して比較
        const normalizedShopName = toHiragana(store.shopName?.toLocaleLowerCase() || '');
        const normalizedDescription = toHiragana(store.description?.toLocaleLowerCase() || '');

        return (
            normalizedShopName.includes(keyword) ||
            normalizedDescription.includes(keyword)
        );
    });
};

// 統合検索ロジック
export const getIntegratedSearchResults = (rawKeyword: string) => {
    // Jsonファイル読み込み
    const storesPath = path.join(__dirname, '../../mocks/stores.json');
    const sweetsPath = path.join(__dirname, '../../mocks/sweets.json');

    const keyword = toHiragana(rawKeyword.toLowerCase());

    const storesData: Store[] = JSON.parse(fs.readFileSync(storesPath, 'utf-8'));
    const sweetsData: Sweet[] = JSON.parse(fs.readFileSync(sweetsPath, 'utf-8'));

    // 店検索
    const filteredStores = getFilteredStore(storesData, keyword);

    // スイーツ検索
    const filteredSweets = sweetsData.filter((sweet: Sweet) => {
        if (!keyword) return true;

        // 1. キーワードを小文字に変換して比較
        const normalizedSweetName = toHiragana(sweet.sweetName.toLowerCase());
        const normalizedCategory = toHiragana(sweet.category.toLowerCase());
        const normalizedDescription = sweet.description ? toHiragana(sweet.description.toLowerCase()) : '';
        
        return (
            normalizedSweetName.includes(keyword) ||
            normalizedCategory.includes(keyword) ||
            normalizedDescription.includes(keyword)
        );
    });

    // 結果を統合して返す
    return {
        stores: filteredStores,
        sweets: filteredSweets
    };
};