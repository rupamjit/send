import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'


interface ContainerProps {
    children:ReactNode,
    className?:string
}

const Container = ({children,className}:ContainerProps) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-lg px-2.5 md:px-20',className)}>
        {children}
    </div>
  )
}

export default Container