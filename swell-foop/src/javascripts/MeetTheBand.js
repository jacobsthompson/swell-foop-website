import {useState} from "react";
import {ScrollingImages} from "./ScrollingImages";
import "../stylesheets/meet-the-band.css";

import fullGroup from "../assets/band-members/FullGroup.png";
import sophia from "../assets/band-members/Sophia.png";
import miranda from "../assets/band-members/Miranda.png";
import tiena from "../assets/band-members/Tiena.png";
// import {sophiaImages, mirandaImages, tienaImages, groupImages} from "./Images";


export default function MeetTheBand(){
    const [selectedMember, setSelectedMember] = useState("");
    const [selectedImages, setSelectedImages] = useState(null);

    // const selectImages = (member) => {
    //     if(member === "sophia"){
    //         setSelectedImages(sophiaImages);
    //     } else if(member === "miranda"){
    //         setSelectedImages(mirandaImages);
    //     } else if(member === "tiena"){
    //         setSelectedImages(tienaImages);
    //     } else {
    //         setSelectedImages(groupImages);
    //     }
    // }

    const selectMember = (member) => {
        setSelectedMember(member);
        // selectImages(member);
        console.log(member);
    }


    return(
      <div className="meet-the-band-wrapper">
          <div className="band-pictures">
              <img className="full-band" src={fullGroup}  alt=""/>
              <img className="band-image sophia" src={sophia} style={{opacity: selectedMember === "sophia" ? 1 : 0}} alt=""/>
              <img className="band-image tiena" src={tiena} style={{opacity: selectedMember === "tiena" ? 1 : 0}} alt=""/>
              <img className="band-image miranda" src={miranda} style={{opacity: selectedMember === "miranda" ? 1 : 0}} alt=""/>
          </div>
          <div className="band-members">
              <div className="band-member tiena"
                   onMouseEnter={() => selectMember("tiena")}
                   onMouseLeave={() => selectMember("")}
                   style={{backgroundColor: "red"}}/>
              <div className="band-member sophia"
                   onMouseEnter={() => selectMember("sophia")}
                   onMouseLeave={() => selectMember("")}
                   style={{backgroundColor: "green"}}/>
              <div className="band-member miranda"
                   onMouseEnter={() => selectMember("miranda")}
                   onMouseLeave={() => selectMember("")}
                   style={{backgroundColor: "blue"}}/>
          </div>
          <ScrollingImages images={selectedImages}/>
      </div>
    );
}