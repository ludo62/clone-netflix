import Head from 'next/head';
import { getSession, signOut } from 'next-auth/react';
import { NextPageContext } from 'next';
import useCurrentUser from '@/hooks/useCurrentUser';

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
	const { data: user } = useCurrentUser();
	return (
		<>
			<Head>
				<title>Clone Netflix</title>
				<meta name='description' content='Clone Netflix' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1 className='text-4xl text-green-500'>Clone Netflix</h1>
			<p className='text-white'>Vous etes connecté avec l'identifiant : {user?.pseudo}</p>
			<button className='h-10 w-full bg-white' onClick={() => signOut()}>
				Déconnection
			</button>
		</>
	);
}
