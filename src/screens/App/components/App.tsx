// import { Header } from "./components/Header";
// import { MainContainer } from "./components/MainContainer";

import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import routeConstants from 'shared/constants/routes';
import { Header } from './Header';
import { Main } from '../screens/Main';
import { Character } from '../screens/Character';
import { Favourites } from '../screens/Favourites';


const {
  MAIN, CHARACTER, FAVOURITES,
} = routeConstants;

export const App = () => {
  // const params = useParams();
  return (
    <>
      <Header />
      <Box sx={{ height: '90vh' }}>
        <Routes>
          <Route path={CHARACTER.route} element={<Character />} />
          <Route path={FAVOURITES.route} element={<Favourites />} />
          <Route path={MAIN.route} element={<Main />} />
          {/* <Route path={CHARACTER.route}>
          <h1>{CHARACTER.name}</h1>
        </Route>
        <Route path={FAVOURITES.route}>
          <h1>{FAVOURITES.name}</h1>
        </Route> */}
        </Routes>
      </Box>
    </>
  );
};
