import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice from './pokemonSlice';
import pageSlice from './pageSlice';
import searchSlice from './searchSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
    pageNum: pageSlice,
    findPokemon: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;