import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import routeConstants from 'shared/constants/routes';
import { Header } from './Header';
import { Main } from '../screens/Main';
import { Character } from '../screens/Character';
import { Favourites } from '../screens/Favourites';
import { reducer, initialState, ChartActionsType } from '../screens/Main/chartReducer';


const {
  MAIN, CHARACTER, FAVOURITES,
} = routeConstants;

export const containerStyles = {
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiInput-input': {
    textAlign: "center",
  },
};

export const App = () => {
  const [favCharIds, setFavCharIds] = useState<number[]>([])


  return (
    <>
      <Header />
      <Box sx={{ height: '90vh' }}>
        <Routes>
          <Route path={CHARACTER.route} element={<Character addToFav={setFavCharIds} />} />
          <Route path={FAVOURITES.route} element={<Favourites charIds={favCharIds} />} />
          <Route path={MAIN.route} element={<Main />} />
        </Routes>
      </Box>
    </>
  );
};
