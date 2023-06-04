import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CharacterType} from '../../types/ApiResponseTypes';

interface CharacterStateType {
  characters: CharacterType[];
  currentPage: number;
  totalPages: number;
  totalCharacters: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CharacterStateType = {
  characters: [],
  totalPages: 1,
  totalCharacters: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
};

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    //All char actions
    allCharacterFetching: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.error = null;
      state.currentPage = action.payload;
    },
    allCharacterFetchingSuccess: (
      state,
      action: PayloadAction<{
        characters: CharacterType[];
        pages: number;
      }>,
    ) => {
      state.isLoading = false;
      state.characters = action.payload.characters;
      state.totalPages = action.payload.pages;
      state.totalCharacters = action.payload.characters.length;
    },
    allCharacterFetchingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //Favorite actions
    setCharacterInFav: (state, action: PayloadAction<string>) => {
      const characterIdx = state.characters.findIndex(
        item => item.name === action.payload,
      );
      state.characters[characterIdx].inFavorite = true;
    },
    removeCharacterFromFav: (state, action: PayloadAction<string>) => {
      const characterIdx = state.characters.findIndex(
        item => item.name === action.payload,
      );
      state.characters[characterIdx].inFavorite = false;
    },

    removeAllCharFromFav: state => {
      state.characters = state.characters.map(item => ({
        ...item,
        inFavorite: false,
      }));
    },
    //Page changing
    currentPageChanging: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export default characterSlice.reducer;
