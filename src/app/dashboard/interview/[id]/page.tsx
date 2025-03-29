"use client"
import QuestionStepper from '@/components/stepper'
import { Button } from '@/components/ui/button'
import WebcamComponent from '@/components/webCam'
import { db } from '@/utils/db'
import { mockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Webcam as Icon, Lightbulb, Mic } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSpeechToText, { ResultType } from 'react-hook-speech-to-text';
import { toast } from 'sonner'

// Define proper TypeScript interfaces
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

type SpeechError = {
    message: string;
    error?: string;
};

export default function Page() {
    const params = useParams();
    const id = params?.id as string;
    const [data, setData] = useState<JobDetails>();
    const [camera, setCamera] = useState(false);

    // Speech-to-text hook with proper typing
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
        timeout: 10000,
    });

    useEffect(() => {
        const getInterview = async () => {
            const result = await db.select().from(mockInterview).where(eq(mockInterview.mockId, id));
            setData(result[0]);
        }
        getInterview()
    }, [id])

    const handleMicClick = async () => {
        if (error) {
            toast.error(error || "Mic cannot be turned on");
            return;
        }

        try {
            if (isRecording) {
                await stopSpeechToText();
            } else {
                await stopSpeechToText();
                startSpeechToText();
            }
        } catch (err) {
            toast.error((err as SpeechError).message || "Failed to toggle microphone");
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error || "Speech recognition error");
            stopSpeechToText();
        }
    }, [error, stopSpeechToText]);

    return (
        <section className='max-w-7xl p-4 grid lg:grid-cols-2 gap-4 mx-auto'>
            <div className="space-y-4">
                <h2 className='text-2xl font-semibold text-gray-800'>Let&apos;s get started</h2>
                <QuestionStepper interviewQuestions={data?.json_mock_resp as string} />
                <div className="bg-yellow-200 p-4 space-y-4 rounded-md">
                    <h2 className='flex gap-2 items-center text-xl font-semibold text-gray-800'><Lightbulb /> Important Notice</h2>
                    <p className='text-gray-700'>
                        Please enable <strong>web camera</strong> to start recording video.
                        Web camera is presented to give a realistic feel and video is <strong>not saved in the server.</strong>
                        We do not record your video. You will be asked 10 questions, and your overall interview will be evaluated based on answers.
                        The Questions are all <strong>AI Generated</strong> and AI can generate wrong data as well.
                    </p>
                </div>
            </div>
            {/* Other components remain the same */}
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
                <div className='flex justify-between items-center'>
                    <ul className="flex-1 pr-4">
                        {(results as ResultType[]).map((result) => (
                            <li key={result.timestamp}>{result.transcript}</li>
                        ))}
                        {interimResult && <li className="text-gray-500">{interimResult}</li>}
                    </ul>

                    <Button
                        onClick={handleMicClick}
                        variant={isRecording ? 'destructive' : 'default'}
                    >
                        {isRecording ? (
                            <><Mic className='animate-pulse' /> Stop Recording</>
                        ) : (
                            <><Mic /> Start Recording</>
                        )}
                    </Button>
                </div>
            </div>
        </section>
    )
}