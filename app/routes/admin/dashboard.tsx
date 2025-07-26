import { Header, StatCard, TripCard } from "components"
import type { Route } from "./+types/dashboard";
import { allTrips, dashboardStats, user } from "~/constants";
import { getUser } from "~/appwrite/auth";
import { getUsersAndTripsStats } from "~/appwrite/dashboard";


//pre fetch data form from the browser only.
export const clientLoader = async () => {
  const [ user, dashboardStats ] = await Promise.all([ 
    await getUser(),
    await getUsersAndTripsStats()
  ]);

  return {
    user, 
    dashboardStats
  }
};

const dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData.user as User | null;
  const { dashboardStats } = loaderData;

  const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } =
    dashboardStats;

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"}`}
        description="Track activity, trends and popular destinations in real time"
      />
    
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
          />
          <StatCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth}
            lastMonthCount={tripsCreated.lastMonth}
          />
          <StatCard
            headerTitle="Active Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
        <div className="trip-grid">
          {allTrips
            .slice(0, 4)
            .map(
              ({
                id,
                name,
                imageUrls,
                itinerary,
                tags,
                travelStyle,
                estimatedPrice,
              }) => (
                <TripCard
                  key={id}
                  id={id.toString()}
                  name={name}
                  imageUrl={imageUrls[0]}
                  location={itinerary?.[0]?.location ?? ""}
                  tags={tags}
                  price={estimatedPrice}
                />
              )
            )}
        </div>
      </section>
    </main>
  );
};

export default dashboard