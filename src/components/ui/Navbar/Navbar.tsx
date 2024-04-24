"use client"

import React, { FC } from 'react'
import Container from '../elements/Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { User } from '@prisma/client'
import { SafeUser } from '@/app/types'
import Categories from './Categories'
// prisma exported the schma for us

interface navbarProps {
  currentUser?: SafeUser | null
}
const Navbar: FC<navbarProps> = ({ currentUser }) => {
  return (
    <div className='nav-top'>
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="nav">
            <Logo />
            <Search />
            <UserMenu user={currentUser} />
          </div>
        </Container>
          <Categories />
      </div>
    </div>
  )
}

export default Navbar

