import { Button } from '@mui/material';

const MainButton = ({
  label = 'Click Me',
  onClick,
  baseColor = '#1976d2',
  hoverColor = '#1565c0',
  clickColor = '#0d47a1',
  textColor = '#fff',
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: baseColor,
        color: textColor,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: hoverColor,
        },
        '&:active, &:focus': {
          backgroundColor: clickColor,
        },
        padding: '8px 30px',
        fontWeight: 'bold',
        borderRadius: 3,
      }}
    >
      {label}
    </Button>
  );
};

export default MainButton;
