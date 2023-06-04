import {AxiosError} from 'axios';
import {characterSlice} from '../slices/CharacterSlice';
import {AppDispatch} from '../store';
import {CharacterService} from './../../api/CharacterService';

export const fetchAllCharacters = () => async (dispatch: AppDispatch) => {
  try {
    const response = await CharacterService.fetchAllCharacters();
    const totalPages = Math.ceil(response.count / response.results.length);
    const charactersPromises = Array.from({length: totalPages}, (_, idx) =>
      CharacterService.fetchAllCharacters(idx + 1).then(res => res.results),
    );
    const allCharacters = await Promise.all(charactersPromises).then(results =>
      results.flat(),
    );
    dispatch(
      characterSlice.actions.allCharacterFetchingSuccess({
        characters: allCharacters,
        pages: totalPages,
      }),
    );
  } catch (error) {
    dispatch(
      characterSlice.actions.allCharacterFetchingError(
        (error as AxiosError).message,
      ),
    );
  }
};
