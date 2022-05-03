import { useState, useEffect, useReducer } from 'react';
import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchCharactersByPage, fetchCharactersByName } from 'api';
import { Character } from './Main'
import { reducer, initialState, ChartActionsType } from '../chartReducer';

export const Chart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCharacters = async (pageNumber = 1) => {
    try {
      const characterData = await fetchCharactersByPage(pageNumber);
      const characterOptions = characterData.results.map((character) => {
        const { id, name, status } = character;
        return { id, name, status };
      });
      dispatch({
        type: ChartActionsType.SET_PAGE,
        payload: {
          page: 1,
          characters: characterOptions,
          next: characterData.info.next,
          prev: characterData.info.prev,
          pagesCount: characterData.info.pages,
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  const updateCharacters = async (pageNumber: number) => {
    try {
      const characterData = await fetchCharactersByPage(pageNumber);
      const characterOptions = characterData.results.map((character) => {
        const { id, name, status } = character;
        return { id, name, status };
      });
      dispatch({
        type: ChartActionsType.SET_PAGE,
        payload: {
          page: pageNumber,
          characters: characterOptions,
          next: characterData.info.next,
          prev: characterData.info.prev,
          pagesCount: characterData.info.pages,
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCharacters()
  }, [])

  useEffect(() => {
    if (!state.characters) return
    console.log('page changerd');
    updateCharacters(state.page)
  }, [state.page])

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
              <TableCell></TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.characters.map((char: Character) => (
              <TableRow
                key={char.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {char.id}
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
