import { Box } from '@mui/material';
import Title from '../Title/Title';
import MainButton from '../MainButton/MainButton';
import { useSelector } from 'react-redux';

const EmptyCart = ({ onBrowse }) => {
  const { content } = useSelector((state) => state.lang);
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <img
        src="emptyCart.png"
        alt="Empty Cart"
        style={{
          marginBottom: '10px',
          width: '250px',
        }}
      />
      <Title title ={content.YourCartIsEmpty} variant="h4" />
      <Title title={content.Addyourfavouriteitemstoyourcart} variant="h6" />
      <MainButton
        label={content.StartShoppingButton}
        onClick={onBrowse}
        baseColor="#1976d2"
        hoverColor="#1565c0"
        clickColor="#0d47a1"
        textColor="#fff"
      />
    </Box>
  );
};
export default EmptyCart;
