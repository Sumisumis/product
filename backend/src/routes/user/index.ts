import { Router } from 'express';
import { getUserProfile } from '../../controllers/user/index'; // コントローラーをインポート

const router = Router();

// GET /api/user/profile でプロフィールのデータを返す
router.get('/profile', getUserProfile);

export default router;