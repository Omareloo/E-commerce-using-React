import { useState } from 'react';
import { IconButton, Typography, Box, Popover, Alert } from '@mui/material';

const MyButton = ({ icon: Icon, label, handleAction, message }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const handleClick = (event) => {
    if (handleAction) {
      const resultMessage = handleAction();
      setAlertMessage(resultMessage || message || `${label} completed`);
    }

    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      setAnchorEl(null);
    }, 1000);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ color: '#1976d2', '&:hover': { color: '#1565c0' }, p: 0.5 }}
      >
        <Icon sx={{ fontSize: 16 }} data-testid="action-icon" />
      </IconButton>
      <Typography
        variant="body2"
        color="primary"
        onClick={handleClick}
        sx={{ ml: 0.5, cursor: 'pointer' }}
      >
        {label}
      </Typography>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            boxShadow: 1,
            borderRadius: 1,
            mt: 1,
          },
        }}
      >
        <Alert
          severity="info"
          sx={{
            backgroundColor: '#e0e0e0ff',
            padding: '2px 8px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
          }}
        >
          {alertMessage}
        </Alert>
      </Popover>
    </Box>
  );
};

export default MyButton;
