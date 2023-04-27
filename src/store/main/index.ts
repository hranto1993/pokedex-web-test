import {createSlice} from '@reduxjs/toolkit';

import {IMainInitialState} from './types';
import {
  getEvolution,
  filterByTypes,
  getPokemonList,
  getPokemonTypes,
  getActivePokemon,
} from './actions';

export const initialState: IMainInitialState = {
  pokemonList: {
    count: 0,
    data: [],
    initialList: [],
    loading: false,
    error: null,
    types: [],
  },
  pokemonInfo: {
    data: null,
    evolution: undefined,
    loading: false,
    error: null,
  },
  controls: {
    page: 0,
    offset: 20,
  },
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateSearchList: (state, action) => {
      state.pokemonList.data = action.payload;
    },
    updatePage: (state, action) => {
      state.controls.page = action.payload;
    },
    updateOffset: (state, action) => {
      state.controls.offset = action.payload;
    },
    catchPokemonInfo: (state) => {
      state.pokemonInfo.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonList.pending, (state) => {
      state.pokemonList.loading = true;
      state.pokemonList.error = null;
    });
    builder.addCase(getPokemonList.fulfilled, (state, action) => {
      state.pokemonList.loading = false;
      state.pokemonList.data = action.payload.results;
      state.pokemonList.initialList = action.payload.results;
      state.pokemonList.count = action.payload.results.length;
      state.pokemonList.error = null;
    });
    builder.addCase(getPokemonList.rejected, (state, action) => {
      state.pokemonList.loading = false;
      state.pokemonList.error = action.payload as null;
    });
    builder.addCase(getPokemonTypes.pending, (state) => {
      state.pokemonList.loading = true;
      state.pokemonList.error = null;
    });
    builder.addCase(getPokemonTypes.fulfilled, (state, action) => {
      state.pokemonList.loading = false;
      state.pokemonList.types = action.payload;
      state.pokemonList.error = null;
    });
    builder.addCase(getPokemonTypes.rejected, (state, action) => {
      state.pokemonList.loading = false;
      state.pokemonList.error = action.payload as null;
    });
    builder.addCase(filterByTypes.pending, (state) => {
      state.pokemonList.loading = true;
      state.pokemonList.error = null;
    });
    builder.addCase(filterByTypes.fulfilled, (state, action) => {
      state.pokemonList.loading = false;
      state.pokemonList.data = action.payload;
      state.pokemonList.error = null;
    });
    builder.addCase(filterByTypes.rejected, (state, action) => {
      state.pokemonList.loading = false;
      state.pokemonList.error = action.payload as null;
    });
    builder.addCase(getActivePokemon.pending, (state) => {
      state.pokemonInfo.loading = true;
      state.pokemonInfo.error = null;
    });
    builder.addCase(getActivePokemon.fulfilled, (state, action) => {
      state.pokemonInfo.loading = false;
      state.pokemonInfo.data = action.payload;
      state.pokemonInfo.error = null;
    });
    builder.addCase(getActivePokemon.rejected, (state, action) => {
      state.pokemonInfo.loading = false;
      state.pokemonInfo.error = action.payload as null;
    });
    builder.addCase(getEvolution.pending, (state) => {
      state.pokemonInfo.loading = true;
      state.pokemonInfo.error = null;
    });
    builder.addCase(getEvolution.fulfilled, (state, action) => {
      state.pokemonInfo.loading = false;
      state.pokemonInfo.evolution = action.payload;
      state.pokemonInfo.error = null;
    });
    builder.addCase(getEvolution.rejected, (state, action) => {
      state.pokemonInfo.loading = false;
      state.pokemonInfo.error = action.payload as null;
    });
  },
});

export const {name, actions} = mainSlice;
export const {updateSearchList, updatePage, catchPokemonInfo, updateOffset} =
  actions;

const mainReducer = mainSlice.reducer;

export default mainReducer;
