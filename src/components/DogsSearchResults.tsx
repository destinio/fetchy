import { useDogs } from "@/hooks/useDogs";
import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Button } from "./ui/button";

interface IPageControlProps {
  options: {
    currentPage: number;
    totalPages: number;
    total: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
    isLoading: boolean;
  };
}

function PageControl({
  options: {
    currentPage,
    totalPages,
    total,
    handlePrevPage,
    handleNextPage,
    isLoading,
  },
}: IPageControlProps) {
  return (
    <div className="flex justify-around mb-4">
      <Button
        onClick={handlePrevPage}
        disabled={total === 0 || currentPage === 0 || isLoading}
      >
        Prev
      </Button>
      <p>
        Page {currentPage + 1} of {totalPages}
      </p>
      <Button onClick={handleNextPage} disabled={total === 0}>
        Next
      </Button>
    </div>
  );
}

export default function DogsSearchResults() {
  const {
    allPages,
    nextPage,
    prevPage,
    total,
    resultsSize,
    isDogErrored,
    isDogLoading,
    handleAddInterestedDog,
    interestedDogs,
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

    const nextIndex = currentPage + 1;

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

  return (
    <div className="mb-8">
      <PageControl
        options={{
          currentPage,
          totalPages,
          total,
          handleNextPage,
          handlePrevPage,
          isLoading: isLoadingState,
        }}
      />
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        className="mb-4"
      >
        <Masonry>
          {!isLoadingState ? (
            allPages[currentPage].map((dog) => {
              return (
                <div
                  key={dog.id}
                  className="p-2 border-2 rounded border-slate-600"
                >
                  <header>
                    <h3 className="text-orange-500 text-2xl font-bold">
                      {dog.name}
                    </h3>
                  </header>
                  <div className="mb-8">
                    <img src={dog.img} alt={dog.name} />
                  </div>
                  <div className="space-y-2 mb-4">
                    {Object.entries(dog)
                      .filter(([key]) => !["id", "name", "img"].includes(key)) // Ignore these fields
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-semibold capitalize">
                            {key.replace("_", " ")}:
                          </span>
                          <span>{value}</span>
                        </div>
                      ))}
                  </div>
                  <div>
                    <Button
                      onClick={() => handleAddInterestedDog(dog)}
                      disabled={interestedDogs
                        .map((dog) => dog.id)
                        .includes(dog.id)}
                    >
                      {interestedDogs.map((dog) => dog.id).includes(dog.id)
                        ? "Added"
                        : "Add to Interested"}
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>Loading new results...</h2>
          )}
        </Masonry>
      </ResponsiveMasonry>
      <PageControl
        options={{
          currentPage,
          totalPages,
          total,
          handleNextPage,
          handlePrevPage,
        }}
      />
    </div>
  );
}
