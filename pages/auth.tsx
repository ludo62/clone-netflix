import { useCallback, useState } from 'react';
import Input from '@/components/input';

const Auth = () => {
	const [email, setEmail] = useState('');
	const [pseudo, setPseudo] = useState('');
	const [password, setPassword] = useState('');

	const [variant, setVariant] = useState('login');

	const toggleVariant = useCallback(() => {
		setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
	}, []);

	const register = useCallback(async () => {}, []);

	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
			<div className='bg-black w-full h-full lg:bg-opacity-50'>
				<nav className='px-12 py-5'>
					<img src='/images/logo.png' alt='logo' className='h-12' />
				</nav>
				<div className='flex justify-center'>
					<div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
						<h2 className='text-white text-4xl mb-8 font-semibold'>
							{variant === 'login' ? 'Connexion' : 'Inscription'}
						</h2>
						<div className='flex flex-col gap-4'>
							{variant === 'register' && (
								<Input
									label='Pseudo'
									onChange={(ev: any) => setPseudo(ev.target.value)}
									id='pseudo'
									value={pseudo}
								/>
							)}
							<Input
								label='Email'
								onChange={(ev: any) => setEmail(ev.target.value)}
								id='email'
								type='email'
								value={email}
							/>
							<Input
								label='Mot de passe'
								onChange={(ev: any) => setPassword(ev.target.value)}
								id='password'
								type='password'
								value={password}
							/>
						</div>
						<button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
							{variant === 'login' ? 'Se connecter' : 'S’inscrire'}
						</button>
						<p className='text-neutral-500 mt-12'>
							{variant === 'login'
								? "C'est votre pemière visite ?"
								: 'Vous avez déjà un compte ?'}
							<span
								onClick={toggleVariant}
								className='text-white ml-1 hover:underline cursor-pointer'
							>
								{variant === 'login' ? 'Inscrivez-vous' : 'Connectez-vous'}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
