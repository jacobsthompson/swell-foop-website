import {useState} from "react";
import "../stylesheets/music.css";

function Album({title, year, desc, coverArt, link}){
    return(
        <div className="album-wrapper">

        </div>
    );
}

export default function Music() {
    const [service, setService] = useState("spotify");

    const handleService = (s) => {
        setService(s);
        console.log(service);
    }

    return (
        <div className="music-container">
            <h1>Latest Releases</h1>
        </div>
    )
}