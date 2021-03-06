import { Collections, NgRxBook } from '../model/models';
import { Action } from '@ngrx/store';
import { ADD_BOOK, AddBook, BOOKS_LOADED, BooksLoaded, LOAD_BOOKS, UPDATE_BOOK, UpdateBook } from './actions';

export interface BooksState {
  loading: boolean;
  items: NgRxBook[];
}

export const initialBooksState = {
  loading: false,
  items: [],
};

export function booksReducer(state: BooksState = initialBooksState, action: Action) {
  console.group('%cBooks reducer:', 'color: orange;');
  console.log(state, action);
  console.groupEnd();
  switch (action.type) {
    case UPDATE_BOOK: {
      const { payload } = action as UpdateBook;
      const items = state.items.map(
        book => payload.id === book.id ?
          { ...book, ...payload} :
          book
      );
      return { ...state, items };
    }
    case LOAD_BOOKS: {
      return {
        ...state,
        loading: true,
      };
    }
    case BOOKS_LOADED: {
      const {payload: items} = action as BooksLoaded;
      return {
        ...state,
        loading: false,
        items,
      };
    }
    case ADD_BOOK: {
      const {payload: item} = action as AddBook;
      return {
        ...state,
        loading: false,
        items: [...state.items, item],
      };
    }
    default:
      return state;
  }
}
