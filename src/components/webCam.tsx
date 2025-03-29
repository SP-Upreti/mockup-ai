"use client"
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";

const WebcamComponent = () => {
    const webcamRef = useRef<Webcam>(null);
    const [image, setImage] = useState<string | undefined | null>(null);

    const capture = () => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        setImage(imageSrc);
    };

    return (
        <div className="flex h-full w-full relative flex-col items-center gap-4">
            {image ? (
                <img src={image} alt="Captured" className="rounded-lg shadow-lg" />
            ) : (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    mirrored={true}
                    onUserMediaError={(err: unknown) => { alert(err || "k vo") }}
                    screenshotFormat="image/png"
                    className="rounded-lg  h-full shadow-lg w-96"
                />
            )}
            <div className="flex gap-4 absolute bottom-2 left-2">
                <Button
                    onClick={capture}
                >
                    Capture
                </Button>
                {image && (
                    <button
                        onClick={() => setImage(null)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Retake
                    </button>
                )}
            </div>
        </div>
    );
};

export default WebcamComponent;
