import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export interface ICharacter {
  created: string,
  episode: string[],
  gender: string,
  id: number,
  image: string,
  location: {
    name: string,
    url: string,
  },
  name: string,
  origin: {
    name: string,
    url: string,
  },
  species: string,
  status: string,
  type: string,
  url: string,
};

interface ICharactersData {
  info: {
    count: number,
    next: string,
    pages: number,
    prev: string | null,
  },
  results: ICharacter[],
};

export const fetchCharactersById = async (ids: number[]): Promise<ICharacter[]> => {
  const characterData = await axios.get(`${BASE_URL}/character/${ids}`);
  return characterData.data;
};

export const fetchCharactersByPage = async (page: number): Promise<ICharactersData> => {
  const characterData = await axios.get(`${BASE_URL}/character/?page=${page}`);
  return characterData.data;
};

export const fetchCharactersByName = async (name: string): Promise<ICharactersData> => {
  const charactersData = await axios.get(`${BASE_URL}/character/?name=${name}`);
  return charactersData.data;
};
