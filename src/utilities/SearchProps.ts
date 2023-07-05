interface SearchProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchPokemon: string;
  setSearchPokemon: React.Dispatch<React.SetStateAction<string>>;
}
export default SearchProps;