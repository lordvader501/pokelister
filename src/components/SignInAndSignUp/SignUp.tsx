import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';
import { createAuthUserWithEmailAndPass, createUserDocFromAuth, signInWithGooglePopup } from '../../utilities/Auth/firebase';
import { FirebaseError } from 'firebase/app';

interface SignUpProps {
	firstname: string;
	lastname: string;
	email:string;
	password1: string;
	password2: string;
}

const SignUp = () => {
	const { register, handleSubmit, watch,formState: { errors },reset } = useForm<SignUpProps>();
	const [googleSigin, setGoogleSignin ] = useState(false);
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<SignUpProps> = async (data) => {
		const {firstname, lastname, email, password1 } = data;
		const newdata = {
			firstname: firstname.trim(),
			lastname: lastname.trim(),
			email: email,
			password: password1.trim(),
		};
		if(!googleSigin){
			try {
				const {user} = await createAuthUserWithEmailAndPass(newdata.email,newdata.password);
				const displayName = newdata.firstname + ' ' + newdata.lastname;
				await createUserDocFromAuth(user, {firstname, lastname, displayName});
				reset();
				navigate('/');

			} catch (error) {
				console.log(error);
				if (error instanceof FirebaseError){
					if (error.code === 'auth/email-already-exists') alert('Email already exists');
					else{
						console.log(error);
					}
				}
			}
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
					{
						(!googleSigin) ?
							(<>
								<label>First Name:</label>
								<input placeholder='First Name' {...register('firstname', { required: true, maxLength: 20 })} />
								<label>Last Name:</label>
								<input placeholder='Last Name' {...register('lastname', { required: true, maxLength: 20 })} />
								<label>Email ID:</label>
								<input placeholder= 'Email ID' type="email" {...register('email', {required:true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i})} />
								<label>Password:</label>
								<input placeholder='Password' type="password" {...register('password1', { required: true, minLength: 8, maxLength: 15, pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/})} />
								{errors.password1 && <span>Please enter correct password</span>}
								<label>Password:</label>
								<input placeholder='retype Password' type="password" {...register('password2', { required: true, minLength: 8, maxLength: 15, validate: (val:string) => (val === watch('password1')) })} />
								{errors.password2 && <span>Please enter correct password</span>}
								<div className="form-button">
									<button type="submit">Sign Up</button>
									<button type="button" onClick={changeSignInmethod}>Sign up with different account</button>
								</div>
							</>
							) : (
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

export default SignUp;