"use client"

import { SafeUser } from "@/app/types"
import useFavorite from "@/hooks/useFavorite"
import { FC } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface HeartComponentProps {
    listingId?: string,
    currentUser?: SafeUser | null
}

const HeartComponent: FC<HeartComponentProps> = ({
    listingId,
    currentUser
}) => {

    // const hasFavorited = false
    // const toggleFavorite = () => { }

    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId: listingId ?? "",
        currentUser
    })

    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={36}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
                size={28}
                className={
                    `${hasFavorited ?
                        'fill-rose-500' :
                        'fill-neutral-500/70'
                    } absolute top-[2px] right-[2px]`
                }
            />
        </div>
    )
}

export default HeartComponent
