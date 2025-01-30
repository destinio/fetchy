import { useDogs } from "@/hooks/useDogs";

export default function DogsSearchResults() {
  const { searchDogs } = useDogs();
  return <div>DogsSearchResults</div>;
}
