import {useEffect, useState} from "react";
import {ScrollingImages} from "./Images";
import "../stylesheets/meet-the-band.css";

import fullGroup from "../assets/band-members/FullGroup.png";
import sophia from "../assets/band-members/Sophia.png";
import miranda from "../assets/band-members/Miranda.png";
import tiena from "../assets/band-members/Tiena.png";
import {sophiaImages, mirandaImages, tienaImages} from "./ImageLinks";


export default function MeetTheBand(){
    const images = [tienaImages, sophiaImages, mirandaImages];
    const groupText = `Composed of Miranda Loyer and Sophia Shen on lead guitar, bass, and vocals, and Tiena Elias on drums, swell foop was formed under the overcast skies of Berkeley, CA in the fall of 2021. The band inaugurating its start with a performance beside locals Emma Gerson (lucky break) and Chammeili near the UC Berkeley campus where they met as college students, and has since shared bills with other Bay Area icons including Ultra Q, Ha Vay, and Fauxes. Over the following several years swell foop began to gain traction in the local college scene, from rowdy house shows to DIY digs, known for their lush indie rock arrangements and enthralling lyricism. Their debut EP Don't Spare Me, released in November of 2024, quickly broke 10,000 streams within days of its release and currently rests at over 300k streams across platforms. `;
    const texts = [
        "Tiena Elias is a drummer living in the Bay Area.",
        "Sophia Shen is a songwriter, guitarist, and bassist living in the Bay Area.",
        "Miranda Loyer is a songwriter, guitarist, and bassist living in Los Angeles."
    ];

    const [selectedMember, setSelectedMember] = useState(0);
    const [autoScroll, setAutoScroll] = useState(true);

    const selectMember = (member, manual = false) => {
        setSelectedMember(member);

        if(manual) setAutoScroll(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(autoScroll){
                selectMember((selectedMember + 1) % 3);
            }
        }, 10000);

        return () => clearInterval(interval)
    }, [selectedMember, autoScroll]);

    return(
      <div className="meet-the-band-wrapper">
          <div className="band-members">
              <div className={"band-text"}>{groupText}</div>
              <div className="band-pictures">
                  <img className="full-band" src={fullGroup}  alt=""/>
                  <img className="band-image sophia" src={sophia} style={{opacity: selectedMember === 1 ? 1 : 0}} alt=""/>
                  <img className="band-image tiena" src={tiena} style={{opacity: selectedMember === 0 ? 1 : 0}} alt=""/>
                  <img className="band-image miranda" src={miranda} style={{opacity: selectedMember === 2 ? 1 : 0}} alt=""/>
                  <div className="band-hovers">
                      <div className="band-member tiena"
                           onMouseEnter={() => selectMember(0, true)}
                           onMouseLeave={() => setAutoScroll(true)}
                           style={{backgroundColor: "red"}}/>
                      <div className="band-member sophia"
                           onMouseEnter={() => selectMember(1, true)}
                           onMouseLeave={() => setAutoScroll(true)}
                           style={{backgroundColor: "green"}}/>
                      <div className="band-member miranda"
                           onMouseEnter={() => selectMember(2, true)}
                           onMouseLeave={() => setAutoScroll(true)}
                           style={{backgroundColor: "blue"}}/>
                  </div>
              </div>
              <div className="member-label" style={{opacity: selectedMember === 0 ? 1 : 0}}>{texts[0]}</div>
              <div className="member-label" style={{opacity: selectedMember === 1 ? 1 : 0}}>{texts[1]}</div>
              <div className="member-label" style={{opacity: selectedMember === 2 ? 1 : 0}}>{texts[2]}</div>
          </div>
          <div className="scrolling-wrapper" style={{opacity: selectedMember === 0 ? 1 : 0}}>
              <ScrollingImages images={images[0]}/>
          </div>
          <div className="scrolling-wrapper" style={{opacity: selectedMember === 1 ? 1 : 0}}>
              <ScrollingImages images={images[1]}/>
          </div>
          <div className="scrolling-wrapper" style={{opacity: selectedMember === 2 ? 1 : 0}}>
              <ScrollingImages images={images[2]}/>
          </div>
      </div>
    );
}