'use client';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex gap-2 fixed w-full z-50 bg-white flex-row items-center shadow-lg px-4 md:px-8 lg:px-20 py-2 md:py-3'>
        <img className='h-10 md:h-12' src="/assets/logo.svg" alt="img" />
        <h2 className='text-sm md:text-base'>
          Open Water <br />
          Monitoring Platform
        </h2>
    </nav>
  );
};

export default Navbar;
