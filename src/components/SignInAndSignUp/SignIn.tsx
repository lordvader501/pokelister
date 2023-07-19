import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './Signup.scss';
import { signInWithGooglePopup, signinAuthUserWithEmailAndPass } from '../../utilities/Auth/firebase';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

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
				await signinAuthUserWithEmailAndPass( email, password);
				reset();
				navigate('/');

			} catch (error) {
				if (error instanceof FirebaseError){
					if (error.code === 'auth/wrong-password') alert('worng password');
					if (error.code === 'auth/email-already-exists') alert('Email already exists');
					if (error.code === 'auth/user-not-found') alert('invalid email please signup!');
					if (error.code === 'auth/too-many-request') alert('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later');
				}
				else{
					console.log(error);
				}
			}
		} else {
			try {
				await signInWithGooglePopup();
				reset();
				navigate('/');

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