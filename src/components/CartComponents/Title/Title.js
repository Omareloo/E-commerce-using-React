import { Box, Typography } from '@mui/material';

const Title = ({ title, itemCount, variant = 'h4' }) => {
  return (
    <Box>
      <Typography
        variant={variant}
        // gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& span': {
            color: '#666',
            fontWeight: 'normal',
            marginLeft: '10px',
            fontSize: '18px',
          },
        }}
      >
        {itemCount !== undefined ? (
          <>
            {title} <span>({itemCount} items)</span>
          </>
        ) : (
          title
        )}
      </Typography>
    </Box>
  );
};

export default Title;
