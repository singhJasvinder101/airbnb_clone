"use client"

import { Listing, Reservation, User } from '@prisma/client'
import React, { FC, useMemo } from 'react'
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import useCountries from '@/hooks/useCountries';
import Image from 'next/image';
import HeartComponent from '../ui/HeartComponent';

interface listingProps {
  currentUser?: SafeUser | null;
  data: Listing
  reservation?: Reservation;
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
}

const ListingCard: FC<listingProps> = ({
  currentUser,
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId
}) => {
  const router = useRouter()
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imgSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartComponent
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {/* {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )} */}
      </div>
    </div>
  )
}

export default ListingCard
