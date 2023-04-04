import React, { FC, useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import useStyles from './inviteCodeStyle';

interface Props {
  onSubmit: (code: string) => void;
}

const InviteCode: FC<Props> = ({ onSubmit }) => {
  const styles = useStyles();

  const handleSubmitInviteCode = async() => {
    if (!inviteCode) {
      return;
    }
    const response = await testInviteCode();
  };


  const testInviteCode = async() => {
    const param = {
      inviteCode: inviteCode,
    }
    const response = await fetch('/api/activateInviteCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    });
    return response;
  }
  
  const [inviteCode, setInviteCode] = useState('');
  return (
    <Box className={styles.container}>
        <TextField
          id="outlined-basic"
          label="请输入邀请码"
          variant="outlined"
          fullWidth
          className={styles.textField}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInviteCode(event.target.value);
          }}
        />
        <Button size="large" variant="contained" className={styles.button} onClick={() => handleSubmitInviteCode()}>
          提交
        </Button>
    </Box>
  );
};

export default InviteCode;
