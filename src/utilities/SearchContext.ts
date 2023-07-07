import { createContext } from 'react';

export interface SearchContextType {
	searchPokemon: string;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	setSearchPokemon: React.Dispatch<React.SetStateAction<string>>;
}
// const defaultValue: SearchContextType = {
// 	searchPokemon: '',
// 	// eslint-disable-next-line @typescript-eslint/no-empty-function
// 	setCurrentPage: () => { },
// 	// eslint-disable-next-line @typescript-eslint/no-empty-function
// 	setSearchPokemon: () => { },
// };

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default SearchContext;