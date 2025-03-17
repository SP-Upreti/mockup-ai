"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {

    const [state, setState] = useState(false)

    // Replace javascript:void(0) path with your path
    const navigation = [
        { title: "Customers", path: "javascript:void(0)" },
        { title: "Careers", path: "javascript:void(0)" },
        { title: "Guides", path: "javascript:void(0)" },
        { title: "Partners", path: "javascript:void(0)" }
    ]

    return (
        <nav className="bg-white w-full border-b-2 border-slate-200  md:static">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="176" height="25" fill="none" viewBox="0 0 176 40"><path fill="#283841" fill-rule="evenodd" d="M15 28a5 5 0 0 1-5-5V0H0v23c0 8.284 6.716 15 15 15h11V28H15ZM45 10a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-19 9C26 8.507 34.507 0 45 0s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM153 10a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9Zm-19 9c0-10.493 8.507-19 19-19s19 8.507 19 19-8.507 19-19 19-19-8.507-19-19ZM85 0C74.507 0 66 8.507 66 19s8.507 19 19 19h28c1.969 0 3.868-.3 5.654-.856L124 40l5.768-10.804A19.007 19.007 0 0 0 132 20.261V19c0-10.493-8.507-19-19-19H85Zm37 19a9 9 0 0 0-9-9H85a9 9 0 1 0 0 18h28a9 9 0 0 0 9-8.93V19Z" clip-rule="evenodd"></path><path fill="#283841" d="M176 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path></svg>
                    <div className="md:hidden">
                        <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-600 hover:text-indigo-600">
                                        <a href={item.path}>
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="hidden md:inline-block">
                    <UserButton />
                </div>
            </div>
        </nav>
    )
}