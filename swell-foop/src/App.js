import {useEffect, useRef, useState} from "react";
import './App.css';
import Header from "./javascripts/Header";
import MainContent from "./javascripts/MainContent";

export default function App() {
    const headerMax = window.innerHeight;
    const headerMin = 860 * 0.05;
    const [headerHeight, setHeaderHeight] = useState(headerMax);

    const containerRef = useRef(null);
    const headerHeightRef = useRef(headerHeight);

    useEffect(() => {
        headerHeightRef.current = headerHeight;
    }, [headerHeight]);

    useEffect(() => {
        const el = containerRef.current;

        const handleWheel = (e) => {
            const atTop = el.scrollTop === 0;

            if (headerHeightRef.current > headerMin && e.deltaY > 0) {
                e.preventDefault();
                const newHeight = Math.max(headerMin, headerHeightRef.current - e.deltaY);
                if(newHeight <= window.innerHeight){
                    setHeaderHeight(newHeight);
                }
            } else if(atTop && e.deltaY < 0 && headerHeightRef.current < headerMax){
                e.preventDefault();
                const newHeight = Math.min(headerMax, headerHeightRef.current - e.deltaY);
                if(newHeight <= window.innerHeight){
                    setHeaderHeight(newHeight);
                }
            }
        };

        let lastTouchY = 0;
        let velocity = 0;
        let lastTouchTime = 0;
        let animFrame = null;

        const handleTouchStart = (e) => {
            lastTouchY = e.touches[0].clientY;
            lastTouchTime = Date.now();
            velocity = 0;
            cancelAnimationFrame(animFrame);
        }

        const handleTouchMove = (e) => {
            const atTop = el.scrollTop === 0;
            const touchY = e.touches[0].clientY;
            const deltaY = lastTouchY - touchY;
            const now = Date.now();
            const elapsed = now - lastTouchTime;

            velocity = deltaY / elapsed;
            lastTouchY = touchY;
            lastTouchTime = now;

            if (headerHeightRef.current > headerMin && deltaY > 0) {
                e.preventDefault();
                const newHeight = Math.max(headerMin, headerHeightRef.current - deltaY);
                if(newHeight <= window.innerHeight){
                    setHeaderHeight(newHeight);
                }
            } else if(atTop && deltaY < 0 && headerHeightRef.current < headerMax){
                e.preventDefault();
                const newHeight = Math.min(headerMax, headerHeightRef.current - deltaY);
                if(newHeight <= window.innerHeight){
                    setHeaderHeight(newHeight);
                }
            } else {
                // el.scrollTop += deltaY;
            }
        };

        const handleTouchEnd = () => {
            let v = velocity * 32;

            const momentum = () => {
                if (Math.abs(v) < 0.1) return;

                const atTop = el.scrollTop === 0;

                if (headerHeightRef.current > headerMin && v > 0) {
                    const newHeight = Math.max(headerMin, headerHeightRef.current - v);
                    if(newHeight <= window.innerHeight){
                        setHeaderHeight(newHeight);
                    }
                } else if (atTop && v < 0 && headerHeightRef.current < headerMax) {
                    const newHeight = Math.min(headerMax, headerHeightRef.current - v);
                    if(newHeight <= window.innerHeight){
                        setHeaderHeight(newHeight);
                    }
                } else {
                    // el.scrollTop += v;
                }

                v *= 0.92;
                animFrame = requestAnimationFrame(momentum);
            };

            animFrame = requestAnimationFrame(momentum);
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchmove", handleTouchMove, {passive: false});
        el.addEventListener("touchend", handleTouchEnd);
        return () => {
            el.removeEventListener("wheel", handleWheel);
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchmove", handleTouchMove);
            el.removeEventListener("touchend", handleTouchEnd);
            cancelAnimationFrame(animFrame);
        }
    }, [headerMin, headerMax]);

    return (
    <div className="App" ref={containerRef}>
        <Header height={headerHeight} minHeight={headerMin} maxHeight={headerMax}/>
        <MainContent headerHeight={headerHeight} headerMin={headerMin}/>
    </div>
    );
}
