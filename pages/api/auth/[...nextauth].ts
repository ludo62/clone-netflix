import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import prismadb from '@/lib/prismadb';

import GithubProvider from 'next-auth/providers/github';

import { PrismaAdapter } from '@next-auth/prisma-adapter';

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
		}),
		Credentials({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
				},
				password: {
					label: 'Mot de passe',
					type: 'passord',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Veuillez entrer votre email et votre mot de passe');
				}

				const user = await prismadb.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.hashedPassword) {
					throw new Error("Votre email n'est pas enregistré");
				}

				const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

				if (!isCorrectPassword) {
					throw new Error('Mot de passe incorrect');
				}

				return user;
			},
		}),
	],
	pages: {
		signIn: '/connexion',
	},
	debug: process.env.NODE_ENV === 'development',
	adapter: PrismaAdapter(prismadb),
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
});
