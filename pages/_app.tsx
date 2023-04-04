import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import InviateCode from '../components/InviteCode/InviteCode';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {

  const [inviteCode, setInviteCode] = useState('');

  // watch local storage for invite code
  useEffect(() => {
    const inviteCode = localStorage.getItem('inviteCode');
    if (inviteCode) {
      setInviteCode(inviteCode);
    }
  }, []);


  const handleSubmit = (code: string) => {
    setInviteCode(code);
  };

  return (
    inviteCode ? 
    <div className={inter.className}>
      <Toaster />
      <Component {...pageProps} />
    </div> : <InviateCode onSubmit={handleSubmit}/>
  );
}

export default appWithTranslation(App);
