"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface NavbarProps {}

const Logo: FC<NavbarProps> = () => {
    const router = useRouter()
    return (
        <Image
        onClick={() => router.push('/')}
            alt='Logo'
            className='logo'
            height={'100'}
            width={'100'}
            src={'/images/logo.png'}
        />
    )
}

export default Logo
