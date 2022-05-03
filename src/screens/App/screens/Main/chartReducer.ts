export type State = {
  page: number,
  characters: Character[],
  next: string | null,
  prev: string | null,
  pagesCount: number,
}

type Character = {
  id: number,
  name: string,
  status: string,
  image: string,
};

export enum ChartActionsType {
  SET_PAGE = 'SET_PAGE',
  CHANGE_PAGE = 'CHANGE_PAGE',
  CHAR_CLICK = 'CHAR_CLICK',
}

type ChartActions = {
  type: ChartActionsType,
  payload: any,
}

export const initialState: State = {
  page: 0,
  characters: [],
  next: null,
  prev: null,
  pagesCount: 0,
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

    default:
      return state;
  }
};