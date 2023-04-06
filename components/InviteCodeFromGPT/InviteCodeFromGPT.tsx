// components/InviteCode.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const InviteCode = ({ onValidCode }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [invalidMsg, setInvalidMsg] = useState('无效的邀请码');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inviteCode) {
      setIsValid(false);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inviteCode }),
      });

      if (response.status === 200) {
        onValidCode(inviteCode);
        localStorage.setItem('inviteCode', inviteCode);
      } else {
        // Handle error
        const errorData = await response.json();
        console.log(errorData.message);
        setIsValid(false);
        setInvalidMsg(errorData.message);
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return  (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        paddingTop: 'calc(50vh - 50vh / 1.618)', // Add this line to adjust the padding-top based on the golden ratio
      }}
    >
      <Typography variant="h5">请输入邀请码</Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            gap: 1,
            my: 2,
          }}
        >
          <TextField
            error={!isValid}
            helperText={!isValid ? invalidMsg : ''}
            label="邀请码"
            value={inviteCode}
            onChange={(e) => {
              setInviteCode(e.target.value);
              setIsValid(true);
            }}
            required
            sx={{ flexGrow: 1 }}
            InputProps={{
              style: {
                height: '56px',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{height: '56px'}}
            className="mui-button-contained-primary" // Add the className here
          >
            验证
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default InviteCode;
