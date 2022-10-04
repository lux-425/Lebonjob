import React from 'react';

import Link from 'next/link';

import Layout from './Layout';

const NotFound = () => {
  return (
    <Layout title='Page not found'>
      <div className='page-not-found-wrapper'>
        <img
          src='/images/404.svg'
          height='555'
          width='555'
          alt='404_not_found'
        />

        <h5>
          Page Not Found. Return to <Link href='/'>Homepage</Link>{' '}
        </h5>
      </div>
    </Layout>
  );
};

export default NotFound;
