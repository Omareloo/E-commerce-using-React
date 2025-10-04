import { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import Title from '../Title/Title';
import MainButton from '../MainButton/MainButton';

const Sidebar = ({ totalPrice, onMakeOrder, itemCount }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Validation function
  const validateAddress = (value) => {
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    if (!value.trim()) {
      setError('Please enter your address');
      return false;
    } else if (value.trim().length < 8) {
      setError('Address must be at least 8 characters long');
      return false;
    } else if (!hasLetter || !hasNumber) {
      setError('Address must contain both letters and numbers');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    setAddress(e.target.value);
    validateAddress(e.target.value);
  };

  const handleOrderClick = async () => {
    if (!validateAddress(address)) return;
    const isSuccess = await onMakeOrder(address);
    if (isSuccess) setSuccess(true);
  };

  return (
    <Box
      sx={{
        position: { xs: 'static', md: 'sticky' },
        right: 0,
        top: { md: 20 },
        minHeight: '200px',
        height: 'auto',
        width: { xs: '100%', md: '22vw' },
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        zIndex: 1000,
        p: 2,
        borderRadius: 2,
        mt: { xs: 0, md: 5 },
        boxSizing: 'border-box',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Title title="My Cart" itemCount={itemCount} />

      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        Total Price: <span style={{ fontWeight: 'bold' }}>{totalPrice || '0.00'} EGP</span>
      </Typography>
      <Typography variant="body1" sx={{ alignSelf: 'flex-start', mb: 1 }}>
        Your address:
      </Typography>
      <TextField
        value={address}
        onChange={handleChange}
        placeholder="Enter your address"
        fullWidth
        size="small"
        error={!!error}
        helperText={error || ' '}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: error ? 'red' : address && !error ? 'green' : '#ccc',
            },
            '&:hover fieldset': {
              borderColor: error ? 'red' : address && !error ? 'green' : '#999',
            },
          },
        }}
      />
      <MainButton
        label={success ? 'Order placed successfully!' : 'Make an order'}
        onClick={handleOrderClick}
        baseColor={success ? '#4caf50' : '#ffeb3b'}
        hoverColor={success ? '#43a047' : '#fdd835'}
        clickColor={success ? '#388e3c' : '#fbc02d'}
        textColor={success ? '#fff' : '#333'}
      />
    </Box>
  );
};

export default Sidebar;
