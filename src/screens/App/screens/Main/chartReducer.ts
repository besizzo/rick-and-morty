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
};

export enum ChartActionsType {
  SET_PAGE = 'SET_PAGE',
  CHANGE_PAGE = 'CHANGE_PAGE',
  NEXT_PAGE = 'NEXT_PAGE',
  PREV_PAGE = 'PREV_PAGE',
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
        pagesCount: payload.pagesCount,
      })
    };

    case ChartActionsType.CHANGE_PAGE: {
      return ({
        ...state,
        page: payload,
      })
    }


    // case CurrencyActionsType.INIT:
    //   console.log(typeof payload.exchangeRate)
    //   return ({
    //     ...state,
    //     fromCurrency: payload.fromCurrency,
    //     toCurrency: payload.toCurrency,
    //     currencyOptions: payload.currencyOptions[0],
    //     headerRates: payload.headerRates,
    //     exchangeRate: payload.exchangeRate,
    //     amount: {
    //       from: 1,
    //       to: payload.exchangeRate,
    //     },
    //   });


    default:
      return state;
  }
};
