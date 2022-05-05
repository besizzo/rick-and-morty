import { useReducer, useContext, createContext } from 'react';
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
  // const StateContext = createContext({ state, dispatch })
  // const StateContext = createContext({ state, dispatch })

  return (
    <>
      <Header />
      <Box sx={{ height: '90vh' }}>
        <Routes>
          <Route path={CHARACTER.route} element={<Character dispatch={dispatch} />} />
          <Route path={FAVOURITES.route} element={<Favourites charIds={state.favCharIds} />} />
          <Route path={MAIN.route} element={<Main dispatch={dispatch} state={state} />} />
        </Routes>
      </Box>
    </>
  );
};
