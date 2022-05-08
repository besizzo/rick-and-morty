import { useState, useEffect } from 'react';
import { fetchCharactersById, ICharacter } from 'api';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { containerStyles } from '../../Main/components/Main';
import FavoriteIcon from '@mui/icons-material/Favorite';

type FavProps = {
  favCharIds: number[],
}

export const Favourites: React.FC<FavProps> = ({ favCharIds }) => {
  const [favCharacters, setFavCharacters] = useState<ICharacter[]>();
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

  const handleOnCharClick = (id: number) => {
    if (!favCharacters) return;
    console.log(favCharacters);
    const clickedChar = favCharacters.filter(character => character.id === id);
    navigate(`/character/${id}`, { state: clickedChar[0] });
  }

  return (
    <>
      <Box sx={containerStyles}>
        <Typography variant='h4' sx={{ height: '32px', marginTop: '15px' }}>Your besties</Typography>
        {Array.isArray(favCharacters) &&
          <TableContainer sx={{ maxWidth: 600 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">Full Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {favCharacters.map((char: ICharacter) => (
                  <TableRow onClick={() => handleOnCharClick(char.id)}
                    key={char.id}
                    sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" sx={{ width: 65 }}>
                      <img src={char.image} alt='avatar' style={{ height: '65px', borderRadius: '50%' }} />
                      {favCharIds.includes(char.id) && <FavoriteIcon sx={{ position: 'absolute', height: 15, marginLeft: -1, color: "#f08080" }} />}
                    </TableCell>
                    <TableCell align="left">{char.name}</TableCell>
                    <TableCell align="right">{char.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        };
      </Box>
    </>
  );
};
