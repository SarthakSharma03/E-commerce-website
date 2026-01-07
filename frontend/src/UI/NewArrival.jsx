import ArrivalCard from "../components/ArrivalCard";
import ps5 from '../images/ps-5.jpg'
import speakers from '../images/speakers.avif'
import perfume from '../images/perfume.webp'
import womenFashion from '../images/womenFashion.jpg'

const ArrivalSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <span className="flex items-center gap-2 text-red-500 text-sm font-medium">
          <span className="h-4 w-1 bg-red-500 rounded"></span>
          Featured
        </span>
        <h2 className="text-3xl font-bold mt-2">New Arrival</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <ArrivalCard
            large
            image={ps5}
            title="PlayStation 5"
            description="Black and White version of the PS5 coming out on sale."
          />
        </div>

        <div className="flex flex-col gap-6">
          <ArrivalCard
            image={womenFashion}
            title="Women’s Collections"
            description="Featured woman collections that give you another vibe."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ArrivalCard
              image={speakers}
              title="Speakers"
              description="Amazon wireless speakers"
            />
            <ArrivalCard
              image={perfume}
              title="Perfume"
              description="GUCCI INTENSE OUD EDP"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArrivalSection;
