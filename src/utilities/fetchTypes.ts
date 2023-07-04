import Pokemon from './PokeTypes';
interface Results {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
export default Results;