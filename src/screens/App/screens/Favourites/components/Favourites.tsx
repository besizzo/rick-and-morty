import { useState, useEffect, useReducer } from 'react';
import { reducer, initialState, ChartActionsType } from '../../Main/chartReducer';
import { fetchCharactersById, ICharacter } from 'api';

type FavProps = {
  charIds: number[],
}

export const Favourites: React.FC<FavProps> = ({ charIds }) => {
  const [favCharactrs, setFavCharacters] = useState<ICharacter[]>();

  const getFavouriteChars = async (ids: number[]) => {
    const favChars = await fetchCharactersById(ids)
    setFavCharacters(favChars.results)
  }

  useEffect(() => {
    getFavouriteChars(charIds)
  }, [])

  return (
    <div>Favourites: {charIds} </div>
  )
}