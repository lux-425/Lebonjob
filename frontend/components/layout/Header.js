import React, { useContext } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { loading, user } = useContext(AuthContext);

  return (
    <div className='navWrapper'>
      <div className='navContainer'>
        <Link href='/'>
          <div className='logoWrapper'>
            <div className='logoImgWrapper'>
              <Image width='150' height='150' src='/images/logo.png' alt='' />
            </div>
            <span className='logo1'>Lebon</span>
            <span className='logo2'>job</span>
          </div>
        </Link>
        <div className='btnsWrapper'>
          <Link href='/employer/jobs/new'>
            <button className='postAJobButton'>
              <span>Post a job</span>
            </button>
          </Link>

          {user ? (
            <div className='btn dropdown-ml-3'>
              <a
                className='btn dropdown-toggle mr-4'
                id='dropDownMenuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <span>Hi, {user.first_name}</span>
              </a>

              <div
                className='dropdown-menu'
                aria-labelledby='dropDownMenuButton'
              >
                <Link href='/employer/jobs'>
                  <a className='dropdown-item'>Posted jobs</a>
                </Link>

                <Link href='/me/applied'>
                  <a className='dropdown-item'>Applied jobs</a>
                </Link>

                <Link href='/me'>
                  <a className='dropdown-item'>Profile</a>
                </Link>

                <Link href='/upload/resume'>
                  <a className='dropdown-item'>Resume</a>
                </Link>

                <Link href='/'>
                  <a className='dropdown-item text-danger'>Logout</a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href='/login'>
                <button className='loginButtonHeader'>
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
