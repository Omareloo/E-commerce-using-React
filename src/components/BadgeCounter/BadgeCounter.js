import { Badge, IconButton, Tooltip } from '@mui/material';

const BadgeCounter = ({ count, icon, tooltip }) => {
  return (
    <Tooltip title={tooltip || ''}>
      <IconButton>
        <Badge
          badgeContent={count}
          color="error"
          overlap="circular"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.7rem',
              height: 18,
              minWidth: 18,
            },
          }}
        >
          {icon}
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default BadgeCounter;
