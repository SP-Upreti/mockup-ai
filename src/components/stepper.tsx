import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Button } from './ui/button';

const QuestionStepper = ({ interviewQuestions }: { interviewQuestions: string }) => {
    // const questions = [
    //     "What is your name?",
    //     "What is your favorite color?",
    //     "Where were you born?",
    //     "What is your hobby?",
    //     "What is your dream job?",
    //     "Do you like coding?",
    //     "What is your favorite food?",
    //     "Do you prefer tea or coffee?",
    //     "What is your favorite book?",
    //     "What is your favorite movie?"
    // ];

    const interviewData = JSON.parse(interviewQuestions || "[]");
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < interviewData.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };




    return (
        <div className='border p-4 bg-indigo-50 rounded-md'>
            {/* {interviewData.length} */}
            <div className="flex gap-2 mb-4 items-center flex-wrap">
                {interviewData.map((question, idx: number) => {
                    return (
                        <Button onClick={() => setCurrentStep(idx)} className={`cursor-pointer border active:bg-indigo-800 focus:bg-indigo-800 ${currentStep === idx ? "bg-indigo-800" : "bg-transparent text-indigo-800 border hover:bg-indigo-800 hover:text-white border-indigo-500"} px-3.5 rounded-full`} key={idx}>#question {idx + 1}</Button>
                    )
                })}
            </div>
            <Accordion.Root type="single" value={String(currentStep)} collapsible>
                <Accordion.Item value={String(currentStep)}>
                    <Accordion.Header className=" ">
                        <Accordion.Trigger className='text-left my-6 text-lg font-semibold '>{interviewData[currentStep]?.question}</Accordion.Trigger>
                    </Accordion.Header>
                </Accordion.Item>
            </Accordion.Root>

            <div className="flex justify-end items-center ">
                <Button className='cursor-pointer' onClick={nextStep} disabled={currentStep === interviewData.length - 1}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default QuestionStepper;
