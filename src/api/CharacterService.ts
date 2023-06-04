import axios from 'axios';
import $api from './http';
import {AllCharacterResponseType} from '../types/ApiResponseTypes';

export class CharacterService {
  static async fetchAllCharacters(page: number = 1) {
    const response = await $api.get(`/people/?page=${page}`);
    const data: AllCharacterResponseType = await response.data;

    const homeworlds = await Promise.all(
      data.results.map(async character => {
        const homeworldResponse = await axios.get(character.homeworld);
        const name = await homeworldResponse.data.name;

        return name;
      }),
    );

    const characters = data.results.map((character, index) => {
      return {
        ...character,
        homeworld: homeworlds[index],
        inFavorite: false,
      };
    });
    return {...data, results: characters};
  }
  // static async fetchSelectedCharacter(
  //   id: string,
  // ): Promise<AxiosResponse<CharacterType>> {
  //   return $api.get(`people/${id}`);
  // }
}
