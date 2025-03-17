import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
