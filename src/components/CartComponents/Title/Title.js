import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Title = ({ title, itemCount, variant = 'h4' }) => {

  const { content } = useSelector((state) => state.lang);

  return (
    <Box>
      <Typography
        variant={variant}
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
            {title} <span>({itemCount} {itemCount === 1 ? content.item : content.items})</span>
          </>
        ) : (
          title
        )}
      </Typography>
    </Box>
  );
};

export default Title;
