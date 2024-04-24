"use client"

import React, { FC } from 'react'
import { BiSearch } from 'react-icons/bi'

interface SearchProps { }
const Search: FC<SearchProps> = () => {
    return (
        <div className='search'>
            <div
                className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
            >
                <div
                    className="
            text-sm 
            font-semibold 
            px-6
          "
                >
                    location
                </div>
                <div
                    className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          ">
                    duration
                </div>
                <div
                    className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          ">
                    <div className="hidden sm:block">guestlabel</div>
                    <div
                        className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
                    >
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
