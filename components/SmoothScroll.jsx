import { useEffect, useRef } from "react";

import { useRouter } from "next/router";
import useWindowSize from "../hooks/useWindowSize";

const SmoothScroll = ({ children }) => {
    const router = useRouter();

    // 1.
    const windowSize = useWindowSize();

    //2.
    const scrollingContainerRef = useRef();

    // 3.
    const data = {
        ease: 0.01, //Speed of scroll you can put 0.1 or 0.001 or 0.05 what ever you want
        current: 0,
        previous: 0,
        rounded: 0,
    };

    // 4.
    useEffect(() => {
        setBodyHeight();
    }, [windowSize?.height]);
    // [windowSize?.height, router.asPath]);  you can add router dependency for multiple page website

    const setBodyHeight = () => {
        document.body.style.height = `${
            scrollingContainerRef.current.getBoundingClientRect().height
        }px`;
    };

    // 5.
    useEffect(() => {
        window.addEventListener("scroll", smoothScrollingHandler);
        // cleanup function to remove the event listener
        return () => {
            window.removeEventListener("scroll", smoothScrollingHandler);
        };
    });
    const smoothScrollingHandler = () => {
        if (scrollingContainerRef.current?.style) {
            data.current = window.scrollY;
            data.previous += (data.current - data.previous) * data.ease;
            data.rounded = Math.round(data.previous * 100) / 100;
            scrollingContainerRef.current.style.transform = `translateY(-${data.rounded}px)`;
            if (
                data.current != data.rounded &&
                data.rounded != Math.round(data.previous)
            ) {
                // Recursive call untill reached target view
                requestAnimationFrame(() => smoothScrollingHandler());
            }
        }
    };

    return (
        <div className="smooth-scroll-container">
            <div ref={scrollingContainerRef}>{children}</div>
        </div>
    );
};

export default SmoothScroll;
