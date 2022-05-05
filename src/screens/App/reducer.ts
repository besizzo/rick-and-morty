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
  SET_PAGE = 'SET_PAGE',
  CHANGE_PAGE = 'CHANGE_PAGE',
  // CHAR_CLICK = 'CHAR_CLICK',
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
    case ChartActionsType.SET_PAGE: {
      return ({
        ...state,
        page: payload.page,
        characters: payload.characters,
        next: payload.next,
        prev: payload.prev,
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
      console.log(`adding ${payload}`)
      return ({
        ...state,
        favCharIds: [...state.favCharIds, payload],
      })
    }

    default:
      return state;
  }
};