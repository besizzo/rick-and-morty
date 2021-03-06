import Box from '@mui/material/Box';
import logo from 'img/logo.png';
import { Link } from 'react-router-dom';
import routeConstants from 'shared/constants/routes';
import star from 'img/star.png';

const headerStyles = {
  backgroundColor: '#404040',
  color: '#FFFFFF',
  width: 1,
  height: '10vh',
  fontSize: '1.3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const Header: React.FC = () => {
  return (
    <Box sx={headerStyles} component='header'>
      <Box sx={{
        maxWidth: '600px',
        display: 'grid',
        gridAutoColumns: '1fr',
        gap: 1,
      }}>
        <Box sx={{ gridRow: '1', gridColumn: '3 / 6' }}>
          <Link to={routeConstants.MAIN.route}>
            <img src={logo} alt='logo' style={{ height: '10vh' }} />
          </Link>
        </Box>
        <Box sx={{ gridRow: '1', gridColumn: '7 / 8', margin: 'auto' }}>
          <Link to={routeConstants.FAVOURITES.route}>
            <img
              src={star}
              alt='star'
              style={{ height: '40px', borderRadius: '50%', cursor: 'pointer' }} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
