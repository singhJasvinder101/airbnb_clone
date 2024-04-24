import { SafeUser } from "@/app/types";
import { MouseEvent, useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

export function useFavorite({ listingId, currentUser }: IUseFavorite) {
    const loginModal = useLoginModal()
    const router = useRouter()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favouriteIds || [];
        return list.includes(listingId);

    }, [listingId, currentUser])

    const toggleFavorite = useCallback(async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong.');
        }

    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite
