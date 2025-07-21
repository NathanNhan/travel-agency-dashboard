import { Header } from "components"


const trips = () => {
  return (
    <main className="all-users wrapper">
          <Header
            title="Manage Users"
            description="Filter, sort, and access detailed user profiles"
            ctaText="Create a trip"
            ctaUrl="/trips/create"
          />
    </main>
  )
}

export default trips