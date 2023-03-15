import { useEffect, useState } from "react";

export default function useWindowSize() {
    const getSize = () => {
        if (typeof window !== "undefined") {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        }
    };

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getSize());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
