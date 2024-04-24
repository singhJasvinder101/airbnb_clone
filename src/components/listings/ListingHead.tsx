'use client'

import { SafeUser } from "@/app/types";
import useCountries from "@/hooks/useCountries";
import { FC } from "react";
import Heading from "../ui/elements/Heading";
import Image from "next/image";
import HeartComponent from "../ui/HeartComponent";

interface listingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser: SafeUser | null;
}
const ListingHead: FC<listingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {

    const { getByValue } = useCountries()
    const location = getByValue(locationValue)

    return (
        <div>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className="
            mt-3
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
            >
                <Image
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                    alt="Image"
                />
                <div
                    className="
            absolute
            top-5
            right-5
          "
                >
                    <HeartComponent
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>

        </div>
    )
}

export default ListingHead
