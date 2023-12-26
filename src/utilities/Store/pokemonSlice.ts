import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Pokemon from '../PokeTypes';

interface PokemonState {
  pokemonList: Pokemon[];
}
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonList: [],
  } as PokemonState,
  reducers: {
    addItem: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemonList.push(...action.payload);
    }
  }
});

export const { addItem } = pokemonSlice.actions;
export default pokemonSlice.reducer;