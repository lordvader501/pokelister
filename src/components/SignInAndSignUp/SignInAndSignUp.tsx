import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './SignInAndSignUp.scss';
import {
  createAuthUserWithEmailAndPass,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signinAuthUserWithEmailAndPass,
} from '../../utilities/Auth/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import bgImg from '../../assets/signinbackground.png';
import bgAuthImg from '../../assets/signin-bg.jpg';

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  firstname: string;
  lastname: string;
  email: string;
  password1: string;
  password2: string;
}
interface FormProps {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password1: string;
  password2: string;
}

const SignInAndSignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormProps>();
  const navigate = useNavigate();
  const [menuToggle, setMenuToggle] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/signin') {
      const toAddBackgroundImg = document.getElementById('gc');
      if (toAddBackgroundImg) {
        toAddBackgroundImg.style.backgroundImage = `url(${bgAuthImg})`;
        toAddBackgroundImg.style.backgroundPosition = 'center';
        toAddBackgroundImg.style.backgroundSize = 'cover';
      }
    }
  }, []);

  const onSubmitSignUp: SubmitHandler<SignUpProps> = async (data) => {
    const { firstname, lastname, email, password1 } = data;
    const newdata = {
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email,
      password: password1.trim(),
    };
    try {
      const { user } = await createAuthUserWithEmailAndPass(
        newdata.email,
        newdata.password
      );
      const displayName = newdata.firstname + ' ' + newdata.lastname;
      await createUserDocFromAuth(user, { firstname, lastname, displayName });
      reset();
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-exists')
          alert('Email already exists');
        else {
          console.log(error);
        }
      }
    }
  };

  const onSubmitSignIn: SubmitHandler<SignInProps> = async (data) => {
    const { email, password } = data;
    try {
      await signinAuthUserWithEmailAndPass(email, password);
      reset();
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrong-password') alert('worng password');
        if (error.code === 'auth/email-already-exists')
          alert('Email already exists');
        if (error.code === 'auth/user-not-found')
          alert('invalid email please signup!');
        if (error.code === 'auth/too-many-request')
          alert(
            'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later'
          );
      } else {
        console.log(error);
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signInWithGooglePopup();
      reset();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const signinMenuHandeler = () => {
    setMenuToggle(true);
  };
  const signupMenuHandeler = () => {
    setMenuToggle(false);
  };

  return (
    <div className="container">
      <div className="signin-container">
        <div className="img-container">
          <img className="bg-signin-img" src={bgImg} alt="bgimg" />
        </div>
        <div className="form-container">
          <div className="menu">
            <a
              onClick={signupMenuHandeler}
              className={`menu-option ${!menuToggle ? 'selected' : ''}`}
            >
              <h2>SIGN UP</h2>
            </a>
            <a
              onClick={signinMenuHandeler}
              className={`menu-option ${menuToggle ? 'selected' : ''}`}
            >
              <h2>SIGN IN</h2>
            </a>
          </div>
          <form>
            {menuToggle ? (
              <>
                <label>Email ID:</label>
                <input
                  placeholder="Email ID"
                  type="email"
                  {...register('email', {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  })}
                />
                <label>Password:</label>
                <input
                  placeholder="Password"
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    maxLength: 15,
                  })}
                />
                {errors.password && <span>Please enter correct password</span>}
              </>
            ) : (
              <>
                <label htmlFor="Frist Name">First Name:</label>
                <input
                  placeholder="First Name"
                  {...register('firstname', { required: true, maxLength: 20 })}
                />
                <label htmlFor="Last Name">Last Name:</label>
                <input
                  placeholder="Last Name"
                  {...register('lastname', { required: true, maxLength: 20 })}
                />
                <label htmlFor="Email ID">Email ID:</label>
                <input
                  placeholder="Email ID"
                  type="email"
                  {...register('email', {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  })}
                />
                <label htmlFor="Passowrd">Password:</label>
                <input
                  placeholder="Password"
                  type="password"
                  {...register('password1', {
                    required: true,
                    minLength: 8,
                    maxLength: 15,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                  })}
                />
                {errors.password1 && <span>Please enter correct password</span>}
                <label htmlFor="retype Password">Retype Password:</label>
                <input
                  placeholder="retype Password"
                  type="password"
                  {...register('password2', {
                    required: true,
                    minLength: 8,
                    maxLength: 15,
                    validate: (val: string) => val === watch('password1'),
                  })}
                />
                {errors.password2 && <span>Please enter correct password</span>}
              </>
            )}
            <div className="form-button">
              {menuToggle ? (
                <button type="submit" onClick={handleSubmit(onSubmitSignIn)}>
                  Sign In
                </button>
              ) : (
                <button type="submit" onClick={handleSubmit(onSubmitSignUp)}>
                  Sign Up
                </button>
              )}
              <div className="google-btn" onClick={handleGoogleSignin}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </div>
            </div>
          </form>
          {menuToggle && (
            <>
              <hr />
              <a href="#" target="_blank" rel="noreferrer">
                Forgot password?
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInAndSignUp;
