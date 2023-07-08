import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
	name: 'findPokemon',
	initialState: {
		searchPokemon: '',
	},
	reducers: {
		setSearchPokemon: (state, actions) => {
			state.searchPokemon = actions.payload;
		}
	}
});

export const { setSearchPokemon } = searchSlice.actions;
export default searchSlice.reducer;