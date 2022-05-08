import { useState, useEffect } from 'react';
import { fetchCharactersById, ICharacter } from 'api';
import { Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { containerStyles } from '../../Main/components/Main';
import { Characters } from '../../Main/components/Characters';

type FavProps = {
  favCharIds: number[],
}

export const Favourites: React.FC<FavProps> = ({ favCharIds }) => {
  const [favCharacters, setFavCharacters] = useState<ICharacter[]>([]);
  const navigate = useNavigate();

  const getFavouriteChars = async (ids: number[]) => {
    try {
      const favChars = await fetchCharactersById(ids);
      Array.isArray(favChars) ? setFavCharacters(favChars) : setFavCharacters([favChars]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!favCharIds.length) return;
    getFavouriteChars(favCharIds);
  }, []);

  const charClick = (id: number) => {
    if (!favCharacters) return;
    const clickedChar = favCharacters.filter(character => character.id === id);
    navigate(`/character/${id}`, { state: clickedChar[0] });
  }

  return (
    <>
      <Box sx={containerStyles}>
        <Typography variant='h4' sx={{ height: '32px', marginTop: '15px' }}>Your besties</Typography>
        {Array.isArray(favCharacters) &&
          <Characters
            characters={favCharacters}
            favCharIds={favCharIds}
            handleOnCharClick={charClick} />
        }
      </Box>
    </>
  );
};
