'use client'
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
const HomePage = () => {
  const token = localStorage?.getItem('userInfo');
  useEffect(() => {
      if (!token) {
          redirect('/logIn')
      }
      else{
        redirect('/dashboard')
      }
  }, [token]);
};

export default HomePage;