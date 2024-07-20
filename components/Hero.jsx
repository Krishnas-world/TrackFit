"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";

export default function Hero() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <video
            ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.55 }} // Full opacity initially
            >
                <source src="/gym1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
                <div
                    
                    className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 md:p-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">It's Time to Regain Your Fitness</h1>
                    <p className="text-muted-foreground mb-6">Do fitness anywhere and anytime with our training videos</p>
                    <Button className='bg-white bg-opacity-80 text-black px-6 py-3 rounded-lg hover:bg-primary/80' >
                        Explore Now!
                    </Button>
                </div>
                <button
                    onClick={toggleMute}
                    className="absolute top-4 right-4 z-20 bg-white bg-opacity-30 text-black p-2 rounded-full flex items-center justify-center"
                    style={{ width: '30px', height: '30px' }}
                >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
            </div>
        </div>
    );
}
