import { useState, useEffect } from 'react';
import { Box, TextField, Autocomplete } from '@mui/material';
import { Chart } from './Chart';
import { fetchCharactersByName, ICharacter, } from 'api';
import { ChartActions, State } from 'screens/App/reducer';
import { useNavigate } from "react-router-dom";

// export type Character = {
//   id: number,
//   name: string,
//   status?: string,
//   image?: string
// }


export const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiInput-input': {
    textAlign: "center",
  },
};

export type MainProps = {
  dispatch: React.Dispatch<ChartActions>,
  state: State,
};

export const Main: React.FC<MainProps> = ({ state, dispatch }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>();
  const [foundCharacters, setFoundCharacters] = useState<ICharacter[]>([]);

  const searchCharacters = async (name: string) => {
    try {
      const charactersData = await fetchCharactersByName(name);
      setFoundCharacters(charactersData.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!input) {
      setFoundCharacters([]);
      return
    }
    const timer = setTimeout(() => {
      searchCharacters(input);
    }, 300);
    return () => clearTimeout(timer);

  }, [input])

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput(event.target.value);
  }

  const handlePickCharacterOption = (value: ICharacter | null) => {
    if (value !== null) {
      const clickedChar = foundCharacters.filter(character => character.id === value.id);
      navigate(`/character/${value.id}`, { state: clickedChar[0] })
    }
  }

  return (
    <Box sx={containerStyles}>
      <Autocomplete
        freeSolo={false}
        popupIcon={""}
        disablePortal
        id="character-list"
        options={foundCharacters}
        getOptionLabel={(option: ICharacter) => option.name}
        sx={{ width: 300, marginTop: '15px' }}
        onChange={(e, value) => handlePickCharacterOption(value)}
        noOptionsText={'Start typing for *burp* results'}
        renderInput={(params) =>
          <TextField {...params}
            variant="standard"
            placeholder="Search..."
            onChange={event => handleInputChange(event)}
          />
        }
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id} >
              {option.name}
            </li>
          );
        }}
      />
      <Chart dispatch={dispatch} state={state} />
    </Box>
  );
};
