import prisma from '@/libs/prismadb'

interface IParams {
    listingId: string
}

export default async function getListingsById(params: IParams) {
    try {
        const { listingId } = params
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })

        if (!listing) {
            return
        }

        // as listingCard is in client side so it may possible that 
        // browser may expects only plain objects rather date objects
        return listing
    } catch (error: any) {
        throw new Error(error)
    }
}

