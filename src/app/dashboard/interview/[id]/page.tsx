"use client"
import { Button } from '@/components/ui/button'
import WebcamComponent from '@/components/webCam'
import { db } from '@/utils/db'
import { mockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Webcam as Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function Page() {

    interface JobDetails {
        id: number;
        createdAt: string;
        createdBy: string;
        jobDesc: string;
        jobExperience: string;
        jobPosition: string;
        json_mock_resp: string;
        mockId: string;
    }

    const params = useParams(); // ✅ Fetch params properly
    const id = params?.id as string; // ✅ Extract id safely


    const [data, setData] = useState<JobDetails | []>([]);
    const [camera, setCamera] = useState(false);

    useEffect(() => {
        const getInterview = async () => {
            const result = await db.select().from(mockInterview).where(eq(mockInterview.mockId, id));
            console.log("rijalt", result);
            setData(result[0]);
        }
        getInterview()
    }, [id])

    return (
        <section className='max-w-7xl p-4 mx-auto'>
            {`${data}`}
            <h2 className='text-2xl font-semibold text-gray-800'>Lets get started {`${camera}`}</h2>
            <div className="my-4 flex justify-center items-center h-64 rounded-lg gap-10 w-full border md:h-64 md:w-96">
                {
                    camera ? (
                        <WebcamComponent />
                    ) : (
                        <div className=' flex flex-col gap-4 items-center'>
                            <Icon className='h-10 w-10 text-[30px]' />
                            <Button className='cursor-pointer' onClick={() => setCamera(!camera)}>Start Interview</Button>
                        </div>
                    )
                }
            </div>
        </section >
    )
}
