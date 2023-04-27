import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import axiosInstance from '~/libraries/axios';
import {RootState} from '~/types';

import {
  INameURL,
  IPokemonData,
  TFlavorTextEntries,
  TPokemonType,
} from './types';

export const getPokemonList = createAsyncThunk(
  'main/getPokemonList',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`/pokemon?limit=800&offset=0`);

      const results = data?.results?.map((pokemon: INameURL, index: number) => {
        const pokemonInfo = {
          ...pokemon,
          id: index + 1,
        };
        return pokemonInfo;
      });

      const filteredPokemonList = {...data, results};

      return filteredPokemonList;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getPokemonTypes = createAsyncThunk(
  'main/getPokemonTypes',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get('/type');

      const results = data?.results?.map((pokemon: INameURL, index: number) => {
        const pokemonInfo = {
          ...pokemon,
          id: index + 1,
        };
        return pokemonInfo;
      });

      const filteredPokemonList = {...data, results};

      return filteredPokemonList.results;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const filterByTypes = createAsyncThunk(
  'main/filterByTypes',
  async (type: string, {getState, rejectWithValue}) => {
    try {
      const {main} = getState() as RootState;

      if (type === 'all') {
        return main.pokemonList.initialList;
      } else {
        const {data} = await axiosInstance.get(`/type/${type}`);

        const newFilterList = data.pokemon.map((item: TPokemonType) => {
          const activePokemonId = item.pokemon.url.split('/')[6];

          if (Number(activePokemonId) > 800) {
            return null;
          }

          return {
            name: item.pokemon.name,
            url: item.pokemon.url,
            id: activePokemonId,
          };
        });

        const filterPokemonList = newFilterList.filter(
          (item: INameURL) => item,
        );

        return filterPokemonList;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getActivePokemon = createAsyncThunk(
  'main/getActivePokemon',
  async (id: number, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`/pokemon/${id}`);
      const {weight, height, types, abilities, species, stats} = data;

      const {data: textEntries} = await axios.get(species.url);

      const englishText = textEntries.flavor_text_entries.find(
        (item: TFlavorTextEntries) => item.language.name === 'en',
      );

      const text = englishText
        ? englishText.flavor_text
            .replace('\f', ' ')
            .split('POKéMON')
            .join('Pokémon')
        : '';

      const getActiveInfo: IPokemonData = {
        weight: `${weight / 10}kg`,
        height: `${height / 10}m`,
        types: types,
        abilities: abilities,
        id: id,
        name: species.name,
        stats: stats,
        species: species.url,
        text: text,
      };

      return getActiveInfo;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getEvolution = createAsyncThunk(
  'main/getEvolution',
  async (speciesUrl: string, {rejectWithValue}) => {
    try {
      const {data} = await axios.get(speciesUrl);

      const {data: dataChain} = await axios.get(data?.evolution_chain.url);

      const idFirst = dataChain.chain.species.url.split('/')[6];
      const idSecond = dataChain.chain.evolves_to[0].species.url.split('/')[6];
      const idThird =
        dataChain.chain.evolves_to[0].evolves_to[0]?.species.url.split('/')[6];

      const getEvolutionInfo = {
        evolutionFirst: dataChain.chain.species.name,
        evolutionSecond: dataChain.chain.evolves_to[0].species.name,
        evolutionThird:
          dataChain.chain.evolves_to[0]?.evolves_to[0]?.species.name,
        idFirst: idFirst,
        idSecond: idSecond,
        idThird: idThird,
      };

      return getEvolutionInfo;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
