import { useState, useEffect } from 'react';
import { fetchCharactersById, ICharacter } from 'api';

type FavProps = {
  charIds: number[],
}

export const Favourites: React.FC<FavProps> = ({ charIds }) => {
  const [favCharactrs, setFavCharacters] = useState<ICharacter[]>();

  const getFavouriteChars = async (ids: number[]) => {
    const favChars = await fetchCharactersById(ids)
    console.log(favChars)
    setFavCharacters(favChars.results)
  }

  useEffect(() => {
    if (charIds.length !== 0) {
      getFavouriteChars(charIds)
    }
  }, [])

  return (
    <div>Favourites: {charIds} </div>
  )
}