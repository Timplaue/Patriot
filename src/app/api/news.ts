import { NextApiRequest, NextApiResponse } from 'next';

const getNews = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await fetch('http://localhost:5000/api/news');
    const news = await response.json();
    res.status(200).json(news);
};

export default getNews;
