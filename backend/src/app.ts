import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

import homeRoutes from './routes/home/home';
import detailRoutes from './routes/stores/detail';
import sweetsRoutes from './routes/sweets/sweets';
import searchRoutes from './routes/search/search';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(
    '/images',
    express.static(path.join(__dirname, '../public/images'))
);

const port = 3000;

app.get('/api', (req: Request, res: Response) => {
    res.send('Express is working!');
});

app.use('/api/home', homeRoutes);
app.use('/api/stores', detailRoutes);
app.use('/api/sweets', sweetsRoutes);
app.use('/api/search', searchRoutes);
app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

app.listen(port, () => {
    console.log(`サーバーが起動しました: http://localhost:${port}`);
});