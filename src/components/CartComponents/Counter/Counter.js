import { IconButton, Typography, Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Counter = ({ value, onIncrease, onDecrease, onDelete }) => {
  const handleDecrease = () => {
    if (value > 1) {
      onDecrease();
    } else {
      onDelete(); // لو الكمية = 1، نحذف العنصر
    }
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: 4,
        p: 0.1,
        width: 'fit-content',
        maxWidth: 80,
      }}
    >
      {value === 1 ? (
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            color: '#666',
            '&:hover': { color: '#444' },
            p: 1,
            '& .MuiSvgIcon-root': { fontSize: 14 },
          }}
        >
          <DeleteIcon />
        </IconButton>
      ) : (
        <IconButton
          size="small"
          onClick={handleDecrease}
          sx={{
            color: '#666',
            '&:hover': { color: '#444' },
            p: 1,
            '& .MuiSvgIcon-root': { fontSize: 14 },
          }}
        >
          <RemoveIcon />
        </IconButton>
      )}
      <Typography sx={{ mx: 0.25, minWidth: 12, textAlign: 'center', fontSize: 12, px: 0.25 }}>
        {value}
      </Typography>
      <IconButton
        size="small"
        onClick={onIncrease}
        sx={{
          color: '#666',
          '&:hover': { color: '#444' },
          p: 1,
          '& .MuiSvgIcon-root': { fontSize: 14 },
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default Counter;
