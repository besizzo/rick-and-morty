import { useReducer, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import routeConstants from 'shared/constants/routes';
import { Header } from './Header';
import { Main } from '../screens/Main';
import { Character } from '../screens/Character';
import { Favourites } from '../screens/Favourites';
import { reducer, initialState, ChartActionsType } from '../reducer';

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
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedFavIds = JSON.parse(localStorage.getItem("favourites") ?? "[]");

    dispatch({
      type: ChartActionsType.GET_STORAGE,
      payload: savedFavIds,
    })
  }, [])

  return (
    <>
      <Header />
      <Box sx={{ height: '90vh' }}>
        <Routes>
          <Route path={CHARACTER.route} element={<Character dispatch={dispatch} favCharIds={state.favCharIds} />} />
          <Route path={FAVOURITES.route} element={<Favourites favCharIds={state.favCharIds} />} />
          <Route path={MAIN.route} element={<Main dispatch={dispatch} state={state} />} />
        </Routes>
      </Box>
    </>
  );
};
