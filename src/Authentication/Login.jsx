import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { LoadCanvasTemplate, validateCaptcha, loadCaptchaEnginge } from 'react-simple-captcha';

const Login = () => {
  const location = useLocation();
  const [error, setError] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const emailRef = useRef();
  const auth = getAuth();
// const from= location.state?.from?.pathname || "/"
  useEffect(() => {
    loadCaptchaEnginge(6); // Initialize CAPTCHA
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!captchaValid) {
      toast.error('Please solve the CAPTCHA correctly.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setError('');

    signIn(email, password)
      .then((result) => {
        const user = { email: email };
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
        });
        e.target.reset();

        // Save JWT token
        axios
          .post('http://localhost:5000/jwt', user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log('JWT token saved successfully.');
          });

        // Navigate user
        navigate(location?.state || '/');

        // Update last login info
        const lastSignInTime = result?.user?.metadata?.lastSignInTime;
        const loginInfo = { email, lastSignInTime };
        fetch(`http://localhost:5000/users`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginInfo),
        })
          .then((res) => res.json())
          .then(() => {
            console.log('Last login info updated.');
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`Login failed: ${error.message}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.warn('Please provide a valid email address.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success('Password reset email sent! Please check your inbox.', {
            position: 'top-right',
            autoClose: 3000,
          });
        })
        .catch((error) => {
          toast.error(`Failed to send password reset email: ${error.message}`, {
            position: 'top-right',
            autoClose: 3000,
          });
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        toast.error(`Google Sign-In failed: ${error.message}`, {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  const handleValidateCaptcha = (e) => {
    const userCaptchaValue = e.target.value;
    if (validateCaptcha(userCaptchaValue)) {
      setCaptchaValid(true);
      toast.success('CAPTCHA validated successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
    } else {
      setCaptchaValid(false);
      toast.error('Invalid CAPTCHA. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>SCHOLAR | Login</title>
      </Helmet>
      <div className="relative inset-0">
        <img
          className="object-cover lg:w-full opacity-80 h-screen"
          src="https://i.ibb.co.com/fxBxdqx/images-5.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 "></div>
      </div>

      <div className="flex items-center justify-center">
        <ToastContainer />
        <div className="bg-white/30 backdrop-blur-md card  shadow-lg rounded-lg p-10 absolute bottom-0 lg:w-full lg:max-w-lg top-32 h-screen">
          <h2 className="text-2xl text-center font-bold mb-5">Login to Your Account</h2>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                ref={emailRef}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
              <label onClick={handleForgetPassword} className="label">
                <span className="label-text-alt link link-hover">Forgot password?</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label ">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handleValidateCaptcha}
                name="captcha"
                type="text"
                placeholder="Type the CAPTCHA "
                className="input input-bordered"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="form-control mt-6">
              <button
                className="btn rounded-md bg-green-600 text-white"
                disabled={!captchaValid}
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center font-semibold mt-3">
            Don’t Have An Account?{' '}
            <Link className="text-red-500 underline" to="/register">
              Register
            </Link>
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center p-2 shadow-sm btn w-full mt-5 bg-white"
          >
            <img
              className="w-6 h-6 mr-2"
              src="https://i.ibb.co/k9sCr1Z/Logo-google-icon-PNG.png"
              alt="Google Logo"
            />
            <span className="text-gray-600 font-medium">Log in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
