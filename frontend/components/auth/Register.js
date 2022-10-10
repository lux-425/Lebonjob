import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import AuthContext from '../../context/AuthContext';

import { toast } from 'react-toastify';

const Register = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error, isAuthenticated, register, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (isAuthenticated && !loading) {
      router.push('/');
    }
  }, [loading, error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    register({ firstName, lastName, email, password });
  };

  return (
    <div className='modalMask'>
      <div className='modalWrapper'>
        <div className='left'>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src='/images/signup.svg' alt='register' layout='fill' />
          </div>
        </div>
        <div className='right'>
          <div className='rightContentWrapper'>
            <div className='headerWrapper'>
              <h2>SIGN UP</h2>
            </div>
            <form className='form' onSubmit={submitHandler}>
              <div className='inputWrapper'>
                <div className='inputBox'>
                  <i aria-hidden className='fas fa-user'></i>
                  <input
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className='inputBox'>
                  <i aria-hidden className='fas fa-user-tie'></i>
                  <input
                    type='text'
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className='inputBox'>
                  <i aria-hidden className='fas fa-envelope'></i>
                  <input
                    type='email'
                    placeholder='Your Email'
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
                    placeholder='Choose a Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <div className='registerButtonWrapper'>
                <button type='submit' className='registerButton'>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
