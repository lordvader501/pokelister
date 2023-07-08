import Pokemon from '../../utilities/PokeTypes';
interface PaginationProps {
  filteredPokemonList: Pokemon[];
  currentPage: number;
  next: string | null;
  setNext: React.Dispatch<React.SetStateAction<string | null>>;
}

export default PaginationProps;
