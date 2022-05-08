export type State = {
  page: number,
  characters: Character[],
  next: string | null,
  prev: string | null,
  pagesCount: number,
  favCharIds: number[],
}

type Character = {
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

export enum ChartActionsType {
  GET_STORAGE = 'GET_STORAGE',
  SET_PAGE = 'SET_PAGE',
  CHANGE_PAGE = 'CHANGE_PAGE',
  ADD_FAV = 'ADD_FAV',
  REMOVE_FAV = 'REMOVE_FAV',
}

export type ChartActions = {
  type: ChartActionsType,
  payload: any,
}

export const initialState: State = {
  page: 0,
  characters: [],
  next: null,
  prev: null,
  pagesCount: 0,
  favCharIds: [],
}

export const reducer = (state: State, action: ChartActions): State => {
  const { type, payload } = action;

  switch (type) {
    case ChartActionsType.GET_STORAGE: {
      return ({
        ...state,
        favCharIds: payload,
      })
    }

    case ChartActionsType.SET_PAGE: {
      return ({
        ...state,
        page: payload.page,
        characters: payload.characters,
        pagesCount: payload.pagesCount
      })
    }

    case ChartActionsType.CHANGE_PAGE: {
      return ({
        ...state,
        page: payload,
      })
    }

    case ChartActionsType.ADD_FAV: {
      if (state.favCharIds.includes(payload)) return { ...state }
      localStorage.setItem("favourites", JSON.stringify([...state.favCharIds, payload]));
      return ({
        ...state,
        favCharIds: [...state.favCharIds, payload],
      })
    }

    case ChartActionsType.REMOVE_FAV: {
      const updatedList = state.favCharIds.filter(id => id !== payload);
      localStorage.setItem("favourites", JSON.stringify(updatedList));
      return ({
        ...state,
        favCharIds: updatedList,
      })
    }

    default:
      return state;
  }
};