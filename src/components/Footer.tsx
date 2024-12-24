import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; 2024 LLGMT. All Rights Reserved.</p>
      <div className='footer__links'>
        {['About', 'Privacy Policy', 'Licensing', 'Contact'].map(
          (item, index) => (
            <Link
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              key={index}
              className='footer__link'
            >
              {item}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Footer;
