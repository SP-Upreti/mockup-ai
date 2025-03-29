"use client"
import QuestionStepper from '@/components/stepper'
import { Button } from '@/components/ui/button'
import WebcamComponent from '@/components/webCam'
import { db } from '@/utils/db'
import { mockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Webcam as Icon, Lightbulb } from 'lucide-react'
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


    const [data, setData] = useState<JobDetails>();
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
        <section className='max-w-7xl p-4 grid lg:grid-cols-2 gap-4 mx-auto'>
            <div className="space-y-4">
                <h2 className='text-2xl font-semibold text-gray-800'>Lets get started </h2>
                <QuestionStepper interviewQuestions={data?.json_mock_resp as string} />
                <div className="bg-yellow-200 p-4 space-y-4 rounded-md">
                    <h2 className='flex gap-2 items-center text-xl font-semibold text-gray-800'><Lightbulb /> Important Notice</h2>
                    <p className='text-gray-700'>Please enable <strong>web camera</strong> to start recording video. web camera is presented to give realistic feel and video is <strong>not saved in server</strong> We dont  record your video. You will be asked 10 questions and your overall interview will be avaluated based on answers. The Questions are all  <strong>AI Generated</strong> and hence Ai can generate wrong data as well.</p>
                </div>
            </div>
            <div className="">
                <div className="my-4 flex justify-center bg-black text-white items-center h-64 rounded-lg gap-10 w-full border md:h-96 ">
                    {
                        camera ? (
                            <WebcamComponent />
                        ) : (
                            <div className=' flex flex-col gap-6 items-center'>
                                <Icon className='h-10 w-10 text-[30px]' />
                                <Button className='cursor-pointer' onClick={() => setCamera(!camera)}>Enable Camera</Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </section >
    )
}
