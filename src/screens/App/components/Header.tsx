import { Box } from '@mui/material';
import logo from 'img/logo.png';
import { Link } from 'react-router-dom';
import routeConstants from 'shared/constants/routes'

const headerStyles = {
  backgroundColor: '#404040',
  color: '#FFFFFF',
  width: 1,
  height: '10vh',
  fontSize: '1.3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const Header: React.FC = () => {
  return (
    <Box sx={headerStyles} component='header'>
      <Link to={routeConstants.MAIN.route}>
        <img src={logo} alt='logo' style={{ height: '10vh' }} />
      </Link>
    </Box>
  );
};
