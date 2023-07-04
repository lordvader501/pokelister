import Pokemon from './PokeTypes';
interface PaginationProps {
  filteredPokemonList: Pokemon[];
  currentPage: number;
  next: string | null;
  setNext: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default PaginationProps;
