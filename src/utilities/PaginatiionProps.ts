import Pokemon from './PokeTypes';
interface PaginationProps {
  filteredPokemonList: Pokemon[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default PaginationProps;
