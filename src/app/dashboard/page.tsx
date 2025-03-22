import AddInterview from '@/components/addInterview'
import React from 'react'

export default function Page() {
    return (
        <div className='max-w-7xl mx-auto py-10  px-4'>
            <div className="">
                <h1 className='text-2xl text-gray-800 font-semibold'>Dashboard</h1>
                <p>Create new mockup interview or check your previous Interview</p>
            </div>

            <div className="my-10">
                <AddInterview />
            </div>
        </div>
    )
}
