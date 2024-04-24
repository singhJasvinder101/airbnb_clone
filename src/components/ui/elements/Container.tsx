"use client"

import React, { FC, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

// const Container = FC<ContainerProps>({children}){}
export default function Container({ children }: ContainerProps) {
    return (
        <div className='container'>
            {children}
        </div>
    )
}
