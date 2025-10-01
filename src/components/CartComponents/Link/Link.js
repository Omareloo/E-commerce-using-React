import { Typography, Box } from '@mui/material';

const Link = ({ label, handleLink }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="body2"
        color="primary"
        onClick={handleLink}
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Link;
