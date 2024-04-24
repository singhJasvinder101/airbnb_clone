import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingsById from "@/app/actions/listings/getListingsById"
import { FC } from "react"
import ListingClient from "./ListingClient"
import EmptyState from "@/components/EmptyState"
import getReservations from "@/app/actions/getReservations"

interface Iparams {
    listingId: string
}
const page = async ({ params }: { params: Iparams }) => {
    const listing = await getListingsById(params)
    const currentUser = await getCurrentUser()
    const reservations = await getReservations(params)

    // console.log(listings)
    if(!listing){
        return <EmptyState />
    }
    

    return (
        <div>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
                reservations={reservations}
            />
        </div>
    )
}

export default page
