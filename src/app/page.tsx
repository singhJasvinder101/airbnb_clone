import EmptyState from "@/components/EmptyState";
import Container from "@/components/ui/elements/Container";
import Image from "next/image";
import getListings from "./actions/listings/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const listings = await getListings()
  const currentUser = await getCurrentUser()
  // const isEmpty = true

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    );
  }


  return (
    <main className="">
      <Container>
        <div
          className="
             pt-20  
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
