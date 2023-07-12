import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './Signup.scss';

interface SignUpProps {
	firstname: string;
	lastname: string;
	email:string;
	password1: string;
	password2: string;
}

const SignUp = () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpProps>();
	const onSubmit: SubmitHandler<SignUpProps> = (data) => {
		const {firstname, lastname, email, password1 } = data;
		const newdata = {
			firstname: firstname.trim(),
			lastnaem: lastname.trim(),
			email: email,
			password: password1.trim(),
		};
		console.log(newdata);
	};


	return (
		<div className='container'>
			<div className='form-container'>
				<form onSubmit={ handleSubmit(onSubmit) }>
					<label>First Name:</label>
					<input placeholder='First Name' {...register('firstname', { required: true, maxLength: 20 })} />
					<label>Last Name:</label>
					<input placeholder='Last Name' {...register('lastname', { required: true, maxLength: 20 })} />
					<label>Email ID:</label>
					<input placeholder= 'Email ID' type="email" {...register('email', {required:true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i})} />
					<label>Password:</label>
					<input placeholder='Password' type="password" {...register('password1', { required: true, minLength: 8, maxLength: 15 })} />
					{errors.password1 && <span>Please enter correct password</span>}
					<label>Password:</label>
					<input placeholder='retype Password' type="password" {...register('password2', { required: true, minLength: 8, maxLength: 15, validate: (val:string) => (val === watch('password1')) })} />
					{errors.password2 && <span>Please enter correct password</span>}
					<button type="submit">Sign Up</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;