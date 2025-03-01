import { NextApiRequest, NextApiResponse } from 'next';

const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch('http://localhost:5000/api/events');
        const events = await response.json();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

export default getEvents;