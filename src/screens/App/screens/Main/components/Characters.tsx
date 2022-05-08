import { useReducer } from 'react';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ICharacter } from 'api';
import { useNavigate, useLocation } from "react-router-dom";
import { reducer, initialState, ChartActionsType, ChartActions } from 'screens/App/reducer';
import star from 'img/star-wave.png';

type CharTableProps = {
  // handleFavouritesClick: () => void,
  characters: ICharacter[],
  main?: boolean,
  dispatch: React.Dispatch<ChartActions>,
}

export const Characters: React.FC<CharTableProps> = ({ characters, main, dispatch }) => {
  const location = useLocation();
  const navigate = useNavigate();


  const handleFavouritesClick = () => {
    navigate(`/favourites`);
  }

  const handleOnCharClick = (id: number) => {
    const clickedChar = characters.filter(character => character.id === id);
    navigate(`/character/${id}`, { state: clickedChar[0] })
  }

  const handlePageChange = (pageNumber: number) => {
    dispatch({
      type: ChartActionsType.CHANGE_PAGE,
      payload: pageNumber,
    })
  }

  return (
    <>
      <TableContainer sx={{ maxWidth: 600 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {!main && <TableCell onClick={handleFavouritesClick} >
                <img src={star} alt='star' style={{ height: '40px', borderRadius: '50%', paddingLeft: '10px', cursor: 'pointer' }} />
              </TableCell>}
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.map((char: ICharacter) => (
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
      {/* {!main && <Pagination count={state.pagesCount} onChange={(event, id) => handlePageChange(id)} style={{ padding: 10 }} />} */}
    </>
  );
}