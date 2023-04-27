import {RootState} from '~/types';

const controls = (state: RootState) => state.main.controls;
const pokemonList = (state: RootState) => state.main.pokemonList;
const pokemonInfo = (state: RootState) => state.main.pokemonInfo;

export const MainSelectors = {
  controls,
  pokemonList,
  pokemonInfo,
};
