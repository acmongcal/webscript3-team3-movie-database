// This custom hook makes our mobile screen check reusable.
// Instead of rewriting the same logic in multiple components,
// we can use this hook anywhere we need to adjust styling
// or hide/show elements based on screen size.

import { useEffect, useState } from "react";

const getIsMobile = () => window.innerWidth < 601;

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(getIsMobile);

    useEffect(()=>{
        const onSnap = () => {
            setIsMobile(getIsMobile());
        };

        window.addEventListener("resize", onSnap);
    }, []);

    return isMobile;
}