// pages/_app.tsx
import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import InviateCode from '../components/InviteCodeFromGPT/InviteCodeFromGPT';

// Add MUI imports
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  // your theme customization, if any
});

function App({ Component, pageProps }: AppProps) {
  const [inviteCode, setInviteCode] = useState('');

  useEffect(() => {
    const inviteCode = localStorage.getItem('inviteCode');
    if (inviteCode) {
      setInviteCode(inviteCode);
    }
    window.addEventListener('storage', function(e) {
      if (e.key === 'inviteCode') {
        console.log('inviteCode changed', e.newValue);
        setInviteCode(e.newValue);
      }
    });
  }, []);

  const handleSubmit = (code: string) => {
    setInviteCode(code);
    localStorage.setItem('inviteCode', code);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={inter.className}>
        <Toaster />
        {inviteCode ? (
          <Component {...pageProps} />
        ) : (
          <InviateCode onValidCode={handleSubmit} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
