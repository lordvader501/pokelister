import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './Signup.scss';
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocFromAuth } from '../../utilities/Auth/firebase';
import { getRedirectResult } from 'firebase/auth';

interface SignInProps {
	email:string;
	password: string;
}

const SignIn = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<SignInProps>();
	const onSubmit: SubmitHandler<SignInProps> = async (data) => {
		const { email, password } = data;
		const newdata = {
			email: email,
			password: password.trim(),
		};
		const {user} = await signInWithGoogleRedirect();
		const userDocRef = await createUserDocFromAuth(user);
	};

	return (
		<div className='container'>
			<div className='form-container'>
				<form onSubmit={ handleSubmit(onSubmit) }>
					<label>Email ID:</label>
					<input placeholder= 'Email ID' type="email" {...register('email', {required:true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i})} />
					<label>Password:</label>
					<input placeholder='Password' type="password" {...register('password', { required: true, minLength: 8, maxLength: 15 })} />
					{errors.password && <span>Please enter correct password</span>}
					<button type="submit">Sign In</button>
					<button type="submit">Google SignIn</button>
				</form>
			</div>
		</div>
	);
};

export default SignIn;