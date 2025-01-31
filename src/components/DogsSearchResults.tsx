import { useDogs } from "@/hooks/useDogs";

export default function DogsSearchResults() {
  const { dogs, nextPage, prevPage, total } = useDogs();

  if (!dogs) {
    return <h2>Please submit some search queries to get started!</h2>;
  }

  console.log(total);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      <div>
        <button onClick={prevPage} disabled={total === 0}>
          Prev
        </button>
        <button onClick={nextPage} disabled={total === 0}>
          Next
        </button>
      </div>
      {dogs.map((dog) => {
        return (
          <div key={dog.id} className="p-2 border-2 rounded border-slate-600">
            <header>
              <h3>{dog.name}</h3>
            </header>
            <div>
              <img src={dog.img} alt={dog.name} />
            </div>
            <div>
              <p>{dog.breed}</p>
              <p>{dog.age}</p>
              <p>{dog.zip_code}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
