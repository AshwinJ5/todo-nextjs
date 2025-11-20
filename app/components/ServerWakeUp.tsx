"use client";

import { useState, useEffect, useRef } from "react";

interface ServerWakeUpProps {
    children: React.ReactNode;
}

export default function ServerWakeUp({ children }: ServerWakeUpProps) {
    const [isServerReady, setIsServerReady] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const CACHE_DURATION = 5 * 60 * 1000;

    useEffect(() => {
        const checkAndWakeServer = async (isBackgroundCheck = false) => {
            try {
                const lastActiveTime = sessionStorage.getItem("server-last-active");
                const now = Date.now();

                if (!isBackgroundCheck && lastActiveTime) {
                    const timeDiff = now - parseInt(lastActiveTime, 10);
                    if (timeDiff < CACHE_DURATION) {
                        setIsServerReady(true);
                        return;
                    }
                }

                if (!isBackgroundCheck) setIsServerReady(false);

                const wakeUp = async () => {
                    try {
                        const res = await fetch(`${BACKEND_URL}/health`);
                        if (res.ok) {
                            sessionStorage.setItem("server-last-active", Date.now().toString());
                            setIsServerReady(true);
                        } else {
                            throw new Error("Server not ready");
                        }
                    } catch (error) {
                        if (!isBackgroundCheck) {
                            console.log("Server sleeping, retrying in 2s...");
                            setTimeout(wakeUp, 2000);
                        } else {
                            console.log("Background ping failed" + error);
                        }
                    }
                };

                await wakeUp();
            } catch (err) {
                console.error(err);
            }
        };

        checkAndWakeServer();

        intervalRef.current = setInterval(() => {
            checkAndWakeServer(true);
        }, CACHE_DURATION);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [CACHE_DURATION, BACKEND_URL]);

    if (!isServerReady) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#f6f7f8] dark:bg-[#101922] text-[#333333] dark:text-gray-200">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
                <h2 className="text-xl font-bold">Connecting to Server...</h2>
                <p className="text-sm text-gray-500 mt-2 text-center max-w-md">
                    Waking up the free-tier server. This may take up to 60 seconds.
                </p>
            </div>
        );
    }

    return <>{children}</>;
}
