import './App.css';
import Header from "./javascripts/Header";
import {useEffect, useRef, useState} from "react";
import MeetTheBand from "./javascripts/MeetTheBand";
import Music from "./javascripts/Music";

function App() {
    const headerMax = window.innerHeight;
    const headerMin = 860/15;
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
                el.scrollTop += deltaY;
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
                    el.scrollTop += v;
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
    <div className="App"
         ref={containerRef}
    >
        <Header height={headerHeight} minHeight={headerMin} maxHeight={headerMax}/>
        <div className="main-content" style={{marginTop: headerHeight === headerMin ? headerHeight : 0}}>
            <div className="content-box">
                <h1>hey, we're swell foop.</h1>
                <p>From the release of their debut EP "Don't Spare Me," which has garnered over 300k streams across platforms, to their latest single "Dress Song," which has been included in Spotify's influential "Fresh Finds Indie" playlist, swell foop's rise has been swift and notable. Building on this momentum comes the release of "Dead Weight," a collaboration between the band and co-songwriter Sophia Shen's solo project. It marks an expansion of swell foop's sonic vocabulary and illuminates their musical future, harnessing the band's cathartic studio synthesis to deliver a complex and stirring breakup record.</p>
                <h1>MEET THE BAND</h1>
            </div>
            <div className="content-box">
                <MeetTheBand/>
            </div>
            <div className="content-box">
                <Music/>
            </div>
            <div className="about"></div>
        </div>
    </div>
    );
}

export default App;
