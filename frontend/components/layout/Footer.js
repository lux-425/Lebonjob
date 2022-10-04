import React from 'react';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='py-1'>
      <p className='text-center mt-1'>
        Lebonjob - 2022
        <br />(
        <Link href='https://storyset.com/web'>
          Web illustrations by Storyset
        </Link>
        )
      </p>
    </footer>
  );
};

export default Footer;
