import { getDogsMatch } from "@/api/dogs";
import { Button } from "@/components/ui/button";
import { useDogs } from "@/hooks/useDogs";
import { IDog } from "@/types";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Confetti from "react-confetti-boom";

export default function InterestedPage() {
  const {
    interestedDogs,
    handleRemoveInterestedDog,
    handleClearInterestedDogs,
  } = useDogs();
  const [match, setMatch] = useState<IDog>(null!);

  const { toast } = useToast();

  if (interestedDogs.length === 0 && !match) {
    return (
      <div className="flex flex-col gap-4 text-2xl justify-center items-center mt-32">
        <h2>There are no dogs you are interested in!</h2>
        <p>
          Please navigate to{" "}
          <Link className="text-orange-500 hover:text-orange-300" to="/">
            "search"
          </Link>{" "}
          to get started
        </p>
      </div>
    );
  }

  async function matchDogs() {
    const { match: currentMatch } = await getDogsMatch(
      interestedDogs.map((dog) => dog.id),
    );

    const foundDog = interestedDogs.find((dog) => {
      return dog.id === currentMatch;
    });

    if (!foundDog) {
      toast({
        title: "Sorry we couldn't find a match",
        description: "Please try again later",
      });
      return;
    }

    setMatch(foundDog);
    handleClearInterestedDogs();
  }

  return (
    <div>
      {!match ? (
        <div>
          <div className="flex flex-col justify-center items-center py-16">
            <h2 className="text-xl text-center mb-8">
              Once you see the dogs you are interested go ahead an submit to
              find a match!
            </h2>
            <Button onClick={() => matchDogs()}>Submit</Button>
          </div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            className="mb-4"
          >
            <Masonry>
              {interestedDogs.map((dog) => {
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
                      <Button onClick={() => handleRemoveInterestedDog(dog)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center mt-8 items-center">
          <Confetti mode="fall" />
          <h2 className="text-2xl">
            Congratulations you have been matched with
          </h2>
          <h3 className="text-3xl text-orange-500">{match.name}</h3>
          <img src={match.img} alt={match.name} />
        </div>
      )}
    </div>
  );
}
