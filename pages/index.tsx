import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}

export default function Home() {
	const { data: movies } = useMovieList();
	return (
		<>
			<Head>
				<title>Clone Netflix</title>
				<meta name='description' content='Clone Netflix' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navbar />
			<Billboard />
			<div className='pb-40'>
				<MovieList title='À la mode maintenant' data={movies} />
			</div>
		</>
	);
}
