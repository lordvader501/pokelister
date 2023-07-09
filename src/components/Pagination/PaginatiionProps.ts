import Pokemon from '../../utilities/PokeTypes';
interface PaginationProps {
  filteredPokemonList: Pokemon[];
  currentPage: number;
  pokemonsPerPage: number;
}

export default PaginationProps;
