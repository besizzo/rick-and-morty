import { useEffect, useReducer, useContext } from 'react';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { fetchCharactersByPage, ICharacter } from 'api';
// import { Character } from './Main'
import { ChartActionsType } from 'screens/App/reducer';
import { useNavigate } from "react-router-dom";
import star from 'img/star-wave.png';
import { MainProps } from './Main';
import { Characters } from './Characters';


export const Chart: React.FC<MainProps> = ({ state, dispatch }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const getCharacters = async (pageNumber = 1) => {
    try {
      const characterData = await fetchCharactersByPage(pageNumber);
      dispatch({
        type: ChartActionsType.SET_PAGE,
        payload: {
          page: pageNumber,
          characters: characterData.results,
          next: characterData.info.next,
          prev: characterData.info.prev,
          pagesCount: characterData.info.pages,
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacters()
  }, [])

  useEffect(() => {
    if (!state.characters) return
    getCharacters(state.page)
  }, [state.page])

  const handlePageChange = (pageNumber: number) => {
    dispatch({
      type: ChartActionsType.CHANGE_PAGE,
      payload: pageNumber,
    })
  }

  const handleOnCharClick = (id: number) => {
    const clickedChar = state.characters.filter(character => character.id === id);
    navigate(`/character/${id}`, { state: clickedChar[0] })
  }


  const handleFavouritesClick = () => {
    navigate(`/favourites`);
  }

  return (
    <>
      <TableContainer sx={{ maxWidth: 600 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={handleFavouritesClick} >
                <img src={star} alt='star' style={{ height: '40px', borderRadius: '50%', paddingLeft: '10px', cursor: 'pointer' }} />
              </TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.characters.map((char: ICharacter) => (
              <TableRow onClick={() => handleOnCharClick(char.id)}
                key={char.id}
                sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={char.image} alt='avatar' style={{ height: '65px', borderRadius: '50%' }} />
                </TableCell>
                <TableCell align="left">{char.name}</TableCell>
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
