import { useEffect, useReducer } from 'react';
import { reducer, initialState, ChartActionsType } from '../../Main/chartReducer';

type FavProps = {
  ids: number[],
}

export const Favourites: React.FC<FavProps> = ({ ids }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  console.log(ids)
  return (
    <div>Favourites: {ids} </div>
  )
}