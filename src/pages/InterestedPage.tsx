import { Button } from "@/components/ui/button";
import { useDogs } from "@/hooks/useDogs";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";

export default function InterestedPage() {
  const { interestedDogs, handleRemoveInterestedDog } = useDogs();

  if (interestedDogs.length === 0) {
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

  return (
    <div>
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
  );
}
