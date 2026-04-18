import "../stylesheets/images.css"
import {useEffect, useState} from "react";

export function ScrollingImages({images}) {
    const speed = images ? images.length * 10 : 60;

    if(images){
        return (
            <div className="images-wrapper">
                <div className="scrolling-images" style={{animation: `image-scroll ${speed}s linear infinite`}}>
                    {images.map((image, i) => <img className="scrolling-image" key={i} src={image} alt={""}/>)}
                    {images.map((image, i) => <img className="scrolling-image" key={i} src={image} alt={""}/>)}
                </div>
            </div>
        )
    }
}

export function FadingImages({images}){
    const [index, setIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [fading, setFading] = useState(false);
    const fadeDuration = 1000;
    const autoFadeDuration = 4000;

    useEffect(() => {
        const interval = setInterval(() => {
            handleImageSwap(getNextIndex(), true);
        }, autoFadeDuration);

        return () => clearInterval(interval)
    }, [index, fading]);

    const getNextIndex = () => {
        if(index + 1 > images.length-1){
            return 0;
        } else {
            return index + 1;
        }
    }

    const getPrevIndex = () => {
        if(index - 1 < 0){
            return images.length-1;
        } else {
            return index - 1;
        }
    }

    const handleImageSwap = (newIndex) => {
        if(fading) return;

        setPrevIndex(index);
        setIndex(newIndex);
        setFading(true);
        setTimeout(() => {
            setPrevIndex(null);
            setFading(false);
        }, fadeDuration);
    };

    if(!images) return null;

    return(
        <div className="fading-wrapper">
            <div className="fading-images">
                {images.map((src, i) => {
                    const isActive = i === index;
                    const isLeaving = i === prevIndex;

                    if(!isActive && !isLeaving) return null;
                    return(<img key={src} className="fading-image" src={src} alt={""} style={{
                        opacity: isLeaving ? 0 : 1,
                        transition: `opacity ${fadeDuration}ms ease`,
                        zIndex: isLeaving ? 1 : 0
                    }}/>);
                })}
            </div>
            <div className="index-buttons">
                <div className="index-button" onClick={() => handleImageSwap(getPrevIndex())}>{"<"}</div>
                <div className="index-button" onClick={() => handleImageSwap(getNextIndex())}>{">"}</div>
            </div>
        </div>
    );
}