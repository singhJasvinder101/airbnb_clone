'use client'

import { SafeUser } from "@/app/types";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import { categories } from "@/components/ui/Navbar/Categories";
import Container from "@/components/ui/elements/Container";
import { Listing, Reservation } from "@prisma/client";
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservations from "@/components/listings/ListingReservations";
import getReservations from "@/app/actions/getReservations";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface listingClientProps {
    listing: Listing & {
        user: SafeUser;
    };
    currentUser: SafeUser | null;
    reservations?: Reservation[];
}

const ListingClient: FC<listingClientProps> = ({
    listing,
    currentUser,
    reservations
}) => {
    const router = useRouter()
    const loginModal: any = useLoginModal()
    

    const category = useMemo(() => {
        return categories.find((category) => category.label === listing.category);
    }, [listing.category])

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations?.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
            dates = [...dates, ...range];
            return dates

        });
    }, [reservations])
    console.log(reservations)

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState(initialDateRange)

    const onCreateReservation = useCallback(() => {
        if (!currentUser) loginModal.onOpen()
        setIsLoading(true)

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(() => {
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                router.push('/trips');
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    return (
        <Container>
            <div
                className="
            max-w-screen-lg 
            mx-auto
        "
            >
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imgSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div
                        className="
                        grid 
                        grid-cols-1 
                        md:grid-cols-7 
                        md:gap-10 
                        mt-6
                    "
                    >
                        <ListingInfo
                            user={listing?.user}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                            category={category}
                        />
                        <div
                            className="
                            order-first 
                            mb-10 
                            md:order-last 
                            md:col-span-3
                        ">
                            <ListingReservations
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient
