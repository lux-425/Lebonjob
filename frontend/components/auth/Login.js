import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import AuthContext from '../../context/AuthContext';

import { toast } from 'react-toastify';

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, isAuthenticated, login } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (isAuthenticated && !loading) {
      router.push('/');
    }
  }, [loading, error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    login({ username: email, password });
  };

  return (
    <div className='modalMask'>
      <div className='modalWrapper'>
        <div className='left'>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src='/images/login.svg' alt='login' layout='fill' />
          </div>
        </div>
        <div className='right'>
          <div className='rightContentWrapper'>
            <div className='headerWrapper'>
              <h2>SIGN IN</h2>
            </div>
            <form className='form' onSubmit={submitHandler}>
              <div className='inputWrapper'>
                <div className='inputBox'>
                  <i aria-hidden className='fas fa-envelope'></i>
                  <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern='\S+@\S+\.\S+'
                    title='Your email is invalid'
                    required
                  />
                </div>
                <div className='inputBox'>
                  <i aria-hidden className='fas fa-key'></i>
                  <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className='loginButtonWrapper'>
                <button type='submit' className='loginButton'>
                  {loading ? 'Authenticating...' : 'Login'}
                </button>
              </div>
              <p style={{ textDecoration: 'none' }} className='signup'>
                New to Lebonjob? <a href='/register'>Create an account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
