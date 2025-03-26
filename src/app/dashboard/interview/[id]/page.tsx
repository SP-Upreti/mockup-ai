import React from 'react'

export default function page({ params }: { params: number }) {
    return (
        <section className='max-w-7xl p-4 mx-auto'>haha {params.id}</section>
    )
}
