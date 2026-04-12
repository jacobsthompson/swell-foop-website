import "../stylesheets/images.css"

export function ScrollingImages({images}) {
    const speed = images ? images.length * 10 : 60;

    if(images){
        return (
            <div className="carousel-wrapper">
                <div className="carousel-track" style={{animation: `image-scroll ${speed}s linear infinite`}}>
                    {images.map((image, i) => <img key={i} src={image} alt={""}/>)}
                    {images.map((image, i) => <img key={i} src={image} alt={""}/>)}
                </div>
            </div>
        )
    }
}

// export function FadingImages({images}){
// }