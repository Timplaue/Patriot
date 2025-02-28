import { NextApiRequest, NextApiResponse } from 'next';

const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await fetch('http://localhost:5000/api/events');
    const news = await response.json();
    res.status(200).json(news);
};

export default getEvents;
