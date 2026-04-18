import "../stylesheets/about.css";
import {FadingImages} from "./Images";
import {groupImages} from "./ImageLinks";

export default function About(){


    return(
        <div className="about-container">
            <div className="band-info">
                <div className="about-title">hey, we're swell foop.</div>
                <div className="about-text">From the release of their debut EP "Don't Spare Me," which has garnered over 300k streams across platforms, to their latest single "Dress Song," which has been included in Spotify's influential "Fresh Finds Indie" playlist, swell foop's rise has been swift and notable. Building on this momentum comes the release of "Dead Weight," a collaboration between the band and co-songwriter Sophia Shen's solo project. It marks an expansion of swell foop's sonic vocabulary and illuminates their musical future, harnessing the band's cathartic studio synthesis to deliver a complex and stirring breakup record.</div>
            </div>
            <div className="band-images">
                <FadingImages images={groupImages}/>
            </div>
        </div>
    );
}