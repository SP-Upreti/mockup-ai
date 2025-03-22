"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { QuestionForm } from "@/types/job";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



// ✅ Define validation schema
const formSchema = z.object({
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    jobDescription: z.string().min(5, "Description must be at least 5 characters"),
    experience: z
        .number()
        .min(0, "Experience cannot be negative")
        .max(20, "Experience cannot exceed 20 years"),
});

export default function AddInterview() {

    const [aiResponse, setAiResponse] = useState({
        loading: false,
        data: ""
    })
    const [open, setOpen] = useState(false);


    // ✅ Setup form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });



    const submitForm = async (data: QuestionForm) => {
        console.log("Submitted Data:", data);

        // ✅ Ensure the correct property name for experience
        const prompt = `Create 5 job interview questions and answers in JSON format [{question, answer}] for the ${data.jobTitle} position. 
        Consider a job description of: "${data.jobDescription}" and ${data.experience} years of experience.`;

        try {
            setAiResponse({ loading: true, data: null });
            setOpen(false);
            const result = await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                ],
            });

            const responseText = result.response.text();
            const cleanedResponse = responseText.replace(/```json|```/g, ""); // ✅ Use replace safely
            console.log(cleanedResponse)
            setAiResponse({
                loading: false, data: cleanedResponse
            });
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setAiResponse({ loading: false, data: "Failed to generate questions." });
        }
        console.log("data", aiResponse.data)
    };



    return (
        <div>

            <Form>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="h-42 w-68 cursor-pointer">
                            Add Interview
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Job Information</DialogTitle>
                            <DialogDescription>
                                Fill the details below to create a new interview
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className="grid gap-4 py-4">
                                {/* Job Title */}
                                <div className="grid grid-cols-1 gap-2">
                                    <Label htmlFor="jobTitle">Job Title/Position</Label>
                                    <Input
                                        id="jobTitle"
                                        {...register("jobTitle")}
                                        placeholder="Frontend Engineer"
                                    />
                                    {errors.jobTitle && (
                                        <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>
                                    )}
                                </div>

                                {/* Job Description */}
                                <div className="grid grid-cols-1 gap-2">
                                    <Label htmlFor="jobDescription">
                                        Job Description / Tech Stack (Short)
                                    </Label>
                                    <Textarea
                                        id="jobDescription"
                                        {...register("jobDescription")}
                                        placeholder="JavaScript, TypeScript, React.js..."
                                        className="h-28"
                                    />
                                    {errors.jobDescription && (
                                        <p className="text-red-500 text-sm">{errors.jobDescription.message}</p>
                                    )}
                                </div>

                                {/* Experience */}
                                <div className="grid grid-cols-1 gap-2">
                                    <Label htmlFor="experience">
                                        Experience <span className="text-gray-500">(Years)</span>
                                    </Label>
                                    <Input
                                        id="experience"
                                        type="number"
                                        {...register("experience", { valueAsNumber: true })}
                                        placeholder="2"
                                        min={0}
                                        max={20}
                                    />
                                    {errors.experience && (
                                        <p className="text-red-500 text-sm">{errors.experience.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <DialogFooter>
                                <Button type="submit" className="cursor-pointer">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </Form>

            {/* AI Response Section */}
            {aiResponse.loading && <p className="text-blue-500">Generating questions...</p>}
            {aiResponse.data && JSON.parse(aiResponse.data).map((data, idx) => (
                <div className="" key={data.question}>
                    <div className="" key={data.question}>{idx}  ---{data.question}</div>
                    <div className="" key={data.question}>{data.answer}</div>
<br />
<br />
                </div>
            ))}


        </div>
    );
}
