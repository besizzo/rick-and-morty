import { useEffect } from 'react';
import { Pagination } from '@mui/material';
import { fetchCharactersByPage } from 'api';
import { ChartActionsType } from 'screens/App/reducer';
import { useNavigate } from "react-router-dom";
import { MainProps } from './Main';
import { Characters } from './Characters';

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

  const charClick = (id: number) => {
    const clickedChar = state.characters.filter(character => character.id === id);
    navigate(`/character/${id}`, { state: clickedChar[0] });
  };

  return (
    <>
      <Characters
        characters={state.characters}
        favCharIds={state.favCharIds}
        handleOnCharClick={charClick} />
      <Pagination
        count={state.pagesCount}
        onChange={(event, id) => handlePageChange(id)}
        style={{ padding: 10 }} />
    </>
  );
};
