import { useEffect } from 'react';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { fetchCharactersByPage, ICharacter } from 'api';
import { ChartActionsType } from 'screens/App/reducer';
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MainProps } from './Main';

export const Chart: React.FC<MainProps> = ({ state, dispatch }) => {
  const navigate = useNavigate();

  const getCharacters = async (pageNumber = 1) => {
    try {
      const characterData = await fetchCharactersByPage(pageNumber);
      dispatch({
        type: ChartActionsType.SET_PAGE,
        payload: {
          page: pageNumber,
          characters: characterData.results,
          pagesCount: characterData.info.pages,
        }
      });
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    if (!state.characters) return
    getCharacters(state.page);
  }, [state.page]);

  const handlePageChange = (pageNumber: number) => {
    dispatch({
      type: ChartActionsType.CHANGE_PAGE,
      payload: pageNumber,
    });
  };

  const handleOnCharClick = (id: number) => {
    const clickedChar = state.characters.filter(character => character.id === id);
    navigate(`/character/${id}`, { state: clickedChar[0] });
  };

  return (
    <>
      <TableContainer sx={{ maxWidth: 600 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.characters.map((char: ICharacter) => (
              <TableRow onClick={() => handleOnCharClick(char.id)}
                key={char.id}
                sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ width: 65 }}>
                  <img src={char.image} alt='avatar' style={{ height: '65px', borderRadius: '50%' }} />
                  {state.favCharIds.includes(char.id) && <FavoriteIcon sx={{ position: 'absolute', height: 15, marginLeft: -1, color: "#f08080" }} />}
                </TableCell>
                <TableCell align="left">
                  {char.name}
                </TableCell>
                <TableCell align="right">{char.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={state.pagesCount} onChange={(event, id) => handlePageChange(id)} style={{ padding: 10 }} />
    </>
  );
};
