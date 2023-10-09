import { NextApiRequest, NextApiResponse } from 'next';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		res.status(405).end();
	}
	try {
		await serverAuth(req);

		const { movieId } = req.query;

		if (typeof movieId !== 'string') {
			throw new Error('ID invalide');
		}
		if (!movieId) {
			throw new Error('ID invalide');
		}
		const movie = await prismadb.movie.findUnique({
			where: {
				id: movieId,
			},
		});
		if (!movieId) {
			throw new Error('ID invalide');
		}
		return res.status(200).json(movie);
	} catch (error) {
		console.error(error);
		res.status(400).end();
	}
}
