import { Box, Typography } from '@mui/material';
import Title from '../Title/Title';
import MainButton from '../MainButton/MainButton';

const Sidebar = ({ totalPrice, onMakeOrder, itemCount }) => {
  return (
    <Box
      sx={{
        position: { xs: 'static', md: 'sticky' },
        right: 0,
        top: { md: 20 },
        minHeight: '200px',
        height: 'auto',
        width: { xs: '100%', md: '22vw' },
        backgroundColor: '#ffffffff',
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
        borderRadius: 2,
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
      <MainButton
        label="Make an order"
        onClick={onMakeOrder}
        baseColor="#ffeb3b"
        hoverColor="#fdd835"
        clickColor="#fbc02d"
        textColor="#333"
      />
    </Box>
  );
};

export default Sidebar;
