import { Button } from "@/components/ui/button";
import { useDogs } from "@/hooks/useDogs";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function InterestedPage() {
  const { interestedDogs, handleRemoveInterestedDog } = useDogs();
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
