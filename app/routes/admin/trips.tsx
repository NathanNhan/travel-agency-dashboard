import { Header, TripCard } from "components"
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/trips";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
import { useState } from "react";
import { PagerComponent } from "@syncfusion/ej2-react-grids";

export const loader = async ({request} : LoaderFunctionArgs) => {
    const limit = 8;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || "1", 10);
    const offset = (page - 1) * limit; 

    const {allTrips, total} = await getAllTrips(limit, offset);
    

    return {

      trips: allTrips.map(({$id, tripDetail, imageUrls}) => (
        {
          id: $id, 
          ...parseTripData(tripDetail),
          imageUrls: imageUrls ?? []
        }
      )),
      total
    }

}

const Trips = ({loaderData} : Route.ComponentProps) => {
  const trips = loaderData.trips as Trip[] | [];
  const [serachParams] = useSearchParams();
  const initialPage = Number(serachParams.get('page') || '1');

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
    window.location.search =`?page=${page}`;
  }
  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort, and access detailed user profiles"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />

      <section>
        <h1 className="p-24-semibold text-dark-100 mb-4">Manage Created Trips</h1>

        <div className="trip-grid mb-4">
          {trips.map(
            ({
              id,
              name,
              imageUrls,
              itinerary,
              travelStyle,
              estimatedPrice,
              interests,
            }) => (
              <TripCard
                id={id}
                name={name}
                location={itinerary?.[0].location ?? ""}
                imageUrl={imageUrls[0]}
                tags={[interests, travelStyle]}
                price={estimatedPrice}
              />
            )
          )}
        </div>

        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={8}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>
    </main>
  );
}

export default Trips