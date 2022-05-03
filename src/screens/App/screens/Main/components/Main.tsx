import { useState, useEffect } from 'react';
import { Box, TextField, Autocomplete } from '@mui/material';
import { Chart } from './Chart';
import { fetchCharactersByName } from 'api';
import { useNavigate } from "react-router-dom";

export type Character = {
  id: number,
  name: string,
  status?: string,
  image?: string
}

const containerStyles = {
  color: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiInput-input': {
    textAlign: "center",
  }
};

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>();
  const [foundCharacters, setFoundCharacters] = useState<Character[]>([]);

  const searchCharacters = async (name: string) => {
    try {
      const charactersData = await fetchCharactersByName(name);
      const characters = charactersData.results.map((character) => {
        const { id, name } = character;
        return { id, name };
      });
      setFoundCharacters(characters);
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

  const handlePickCharacterOption = (value: Character | null) => {
    if (value !== null) {
      navigate(`/character/${value.id}`)
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
        getOptionLabel={(option: Character) => option.name}
        sx={{ width: 300, marginTop: '15px' }}
        onChange={(e, value) => handlePickCharacterOption(value)}
        noOptionsText={'Start *burp* typing for results'}
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
      <Chart />
    </Box>
  );
};
