
import fs from 'fs';
import path from 'path';
import { Store, Sweet } from '../../types/index';

// カタカナをひらがなに変換
const toHiragana = (text: string): string => {
    return text.replace(/[\u30A1-\u30F6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
};

// 店舗検索
export const getFilteredStore = (
    storeData: Store[],
    keyword: string
): Store[] => {
    return storeData.filter((store) => {
        if (!keyword) return true;

        const normalizedShopName = toHiragana(
            store.shopName?.toLowerCase() || ''
        );
        const normalizedDescription = toHiragana(
            store.description?.toLowerCase() || ''
        );

        return (
            normalizedShopName.includes(keyword) ||
            normalizedDescription.includes(keyword)
        );
    });
};

// 店舗とスイーツの統合検索
export const getIntegratedSearchResults = (rawKeyword: string) => {
    const storesPath = path.join(__dirname, '../../mocks/stores.json');
    const sweetsPath = path.join(__dirname, '../../mocks/sweets.json');

    const keyword = toHiragana(rawKeyword.toLowerCase());

    const storesData: Store[] = JSON.parse(
        fs.readFileSync(storesPath, 'utf-8')
    );
    const sweetsData: Sweet[] = JSON.parse(
        fs.readFileSync(sweetsPath, 'utf-8')
    );

    const filteredStores = getFilteredStore(storesData, keyword);

    const filteredSweets = sweetsData.filter((sweet) => {
        if (!keyword) return true;

        const normalizedSweetName = toHiragana(
            sweet.sweetName.toLowerCase()
        );
        const normalizedCategory = toHiragana(
            sweet.category.toLowerCase()
        );
        const normalizedDescription = sweet.description
            ? toHiragana(sweet.description.toLowerCase())
            : '';

        return (
            normalizedSweetName.includes(keyword) ||
            normalizedCategory.includes(keyword) ||
            normalizedDescription.includes(keyword)
        );
    });

    return {
        stores: filteredStores,
        sweets: filteredSweets
    };
};
