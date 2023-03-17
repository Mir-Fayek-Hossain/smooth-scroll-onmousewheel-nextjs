import { useEffect, useRef } from "react";

import useWindowSize from "../hooks/useWindowSize";

const SmoothScroll = ({ children }) => {
    // 1.
    const windowSize = useWindowSize();

    //2.
    const scrollingContainerRef = useRef();

    // 3.
    const data = {
        ease: 0.01,
        current: 0,
        previous: 0,
        rounded: 0,
    };

    // 4.
    useEffect(() => {
        setBodyHeight();
    }, [windowSize?.height]);

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
        <div className="ppparent">
            <div ref={scrollingContainerRef}>{children}</div>
        </div>
    );
};

export default SmoothScroll;
