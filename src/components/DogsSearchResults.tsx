import { useDogs } from "@/hooks/useDogs";
import { useState, useEffect } from "react";

export default function DogsSearchResults() {
  const {
    allPages,
    nextPage,
    prevPage,
    total,
    resultsSize,
    isDogErrored,
    isDogLoading,
  } = useDogs();
  const totalPages = Math.ceil(total / resultsSize);

  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingState, setIsLoadingState] = useState(isDogLoading);

  useEffect(() => {
    setIsLoadingState(isDogLoading);
  }, [isDogLoading]);

  if (!allPages) {
    return <h2>Please submit some search queries to get started!</h2>;
  }

  if (isDogErrored.status) {
    return <h2>{isDogErrored.message}</h2>;
  }

  function handlePrevPage() {
    if (currentPage > 0) {
      prevPage();
      setCurrentPage((prev) => prev - 1);
    }
  }

  function handleNextPage() {
    if (!allPages) return;

    const nextIndex = currentPage + 1; // Calculate next page index

    if (nextIndex < totalPages) {
      if (nextIndex < allPages.length) {
        // Page already exists, just update state
        setCurrentPage(nextIndex);
      } else {
        // Load new page only if it hasn't been fetched yet
        setIsLoadingState(true);
        nextPage();
        setCurrentPage(nextIndex);
      }
    }
  }

  console.log(allPages, isDogLoading);

  return (
    <div>
      <div>
        <button
          onClick={handlePrevPage}
          disabled={total === 0 || currentPage === 0}
        >
          Prev
        </button>
        <button onClick={handleNextPage} disabled={total === 0}>
          Next
        </button>
      </div>
      {isLoadingState && <h2>Loading...</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {!isLoadingState ? (
          allPages[currentPage].map((dog) => {
            return (
              <div
                key={dog.id}
                className="p-2 border-2 rounded border-slate-600"
              >
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
          })
        ) : (
          <h2>Loading new results...</h2>
        )}
      </div>
    </div>
  );
}
