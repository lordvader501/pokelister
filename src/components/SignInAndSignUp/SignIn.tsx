import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './Signup.scss';
import { signInWithGooglePopup, createUserDocFromAuth, signinAuthUserWithEmailAndPass } from '../../utilities/Auth/firebase';
import { useNavigate } from 'react-router-dom';

interface SignInProps {
	email:string;
	password: string;
}

const SignIn = () => {
	const { register, handleSubmit, formState: { errors },reset } = useForm<SignInProps>();
	const [googleSigin, setGoogleSignin ] = useState(false);
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<SignInProps> = async (data) => {
		const { email, password } = data;
		if(!googleSigin){
			try {
				const {user} = await signinAuthUserWithEmailAndPass( email, password);
				console.log(user);
				reset();
				navigate('/pokelister');

			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const {user} = await signInWithGooglePopup();
				console.log(user);
				const [firstname , lastname]  = user.displayName ? user.displayName.split(' ') : ['', ''];
				await createUserDocFromAuth(user, {firstname, lastname});
				reset();
				navigate('/pokelister');

			} catch (error) {
				console.log(error);
			}
		}
	};

	const googleSubmit = () => {
		handleSubmit(onSubmit)();
	};

	const changeSignInmethod = () => {
		setGoogleSignin(true);
	};

	return (
		<div className='container'>
			<div className='form-container'>
				<form onSubmit={ handleSubmit(onSubmit) }>
					{(!googleSigin) ?
						(<>
							<label>Email ID:</label>
							<input placeholder= 'Email ID' type="email" {...register('email', {required:true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i})} />
							<label>Password:</label>
							<input placeholder='Password' type="password" {...register('password', { required: true, minLength: 8, maxLength: 15 })} />
							{errors.password && <span>Please enter correct password</span>}
							<div className="form-button">
								<button type="submit">Sign In</button>
								<button type="button" onClick={changeSignInmethod}>Sign In with different account</button>
							</div>
						</>) : (
							<>
								<button type='button' onClick={googleSubmit}>Sign Up with Google</button>
							</>
						)
					}
				</form>
			</div>
		</div>
	);
};

export default SignIn;