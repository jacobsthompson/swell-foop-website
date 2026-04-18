import "../stylesheets/main-content.css";
import About from "./About";
import MeetTheBand from "./MeetTheBand";
import Music from "./Music";
import UpcomingShows from "./UpcomingShows";

export default function MainContent({headerHeight, headerMin}){
    return(
        <div className="main-content" style={{ marginTop: headerHeight === headerMin ? headerHeight : 0}}>
            <div className="content-box">
                <About/>
            </div>
            {/*<h1>Meet The Band</h1>*/}
            <div className="content-box">
                <MeetTheBand/>
            </div>
            <div className="content-box" style={{height: 'fit-content', backgroundColor: 'blue'}}>
                <Music/>
            </div>
            <div className="content-box">
                <UpcomingShows/>
            </div>
        </div>
    );
}