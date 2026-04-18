import "../stylesheets/upcoming-shows.css";
import {useEffect, useState} from "react";

const ARTIST = 'swell foop';
const APP_ID = 'swell-foop-website';
const USING_MOCK = true;

const months = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function useShows(){
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (USING_MOCK) {
            setShows(mockShows);
            setLoading(false);
            return;
        }

        fetch("/api/bandsintown")
            .then(r => r.json())
            .then(data => {
                // Filter to only upcoming shows, sorted by date
                const upcoming = data
                    .filter(show => new Date(show.datetime) >= new Date())
                    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
                setShows(upcoming);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { shows, loading, error };
}

export default function UpcomingShows(){
    const {shows, loading, error} = useShows();

    if(loading) return <p> Loading Shows </p>
    if(error) return <p>{error} </p>

    const marqueesRows = Math.max(1, shows.length/4);
    const marqueesCols = Math.min(shows.length,4);

    return(
        <div className="shows-container">
            <div className="marquee-wrapper">
                <div className="marquee" style={{gridTemplate: `repeat(${marqueesRows},1fr) / repeat(${marqueesCols},1fr)`}}>
                    {Array.from({ length: (marqueesRows * marqueesCols) }, (_, i) => (
                        <div className="marquee-cell" key={i} />
                    ))}
                </div>
                <div className="marquee shows" style={{gridTemplate: `repeat(${marqueesRows},1fr) / repeat(${marqueesCols},1fr)`}}>
                    {shows.map(show => {
                        const date = new Date(show.datetime);

                        const timePart = show.datetime.split('T')[1].substring(0, 5);
                        const [hour, minute] = timePart.split(':').map(Number);
                        const ampm = hour >= 12 ? 'PM' : 'AM';
                        const displayHour = hour % 12 || 12;
                        const time = `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;

                        return (
                            <div key={show.id} className="show">
                                <div className="show-text">{show.venue.name}</div>
                                <div className="show-text">{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</div>
                                <div className="show-text">{time}</div>
                                <div className="show-text">{show.venue.city}, {show.venue.region}</div>
                                <div className="show-text button" onClick={() => window.open(show.offers[0].url)}>Get Tickets</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const mockShows = [
    {
        "id": "1",
        "datetime": "2026-05-15T20:00:00",
        "title": "",
        "venue": {
            "name": "The Independent",
            "city": "San Francisco",
            "region": "CA",
            "country": "United States",
            "latitude": "37.7773",
            "longitude": "-122.4213"
        },
        "offers": [
            {
                "type": "Tickets",
                "url": "https://ticketmaster.com",
                "status": "available"
            }
        ],
        "url": "https://www.bandsintown.com/e/1"
    },
    {
        "id": "2",
        "datetime": "2026-06-03T19:30:00",
        "title": "",
        "venue": {
            "name": "Cafe Du Nord",
            "city": "San Francisco",
            "region": "CA",
            "country": "United States",
            "latitude": "37.7635",
            "longitude": "-122.4197"
        },
        "offers": [],
        "url": "https://www.bandsintown.com/e/2"
    },
    {
        "id": "3",
        "datetime": "2026-06-21T21:00:00",
        "title": "",
        "venue": {
            "name": "Rickshaw Stop",
            "city": "San Francisco",
            "region": "CA",
            "country": "United States",
            "latitude": "37.7766",
            "longitude": "-122.4232"
        },
        "offers": [
            {
                "type": "Tickets",
                "url": "https://ticketmaster.com",
                "status": "available"
            }
        ],
        "url": "https://www.bandsintown.com/e/3"
    },
    {
        "id": "4",
        "datetime": "2026-07-04T18:00:00",
        "title": "Summer Fest",
        "venue": {
            "name": "Slim's",
            "city": "San Francisco",
            "region": "CA",
            "country": "United States",
            "latitude": "37.7751",
            "longitude": "-122.4183"
        },
        "offers": [
            {
                "type": "Tickets",
                "url": "https://ticketmaster.com",
                "status": "available"
            }
        ],
        "url": "https://www.bandsintown.com/e/4"
    },
    {
        "id": "5",
        "datetime": "2026-05-15T20:00:00",
        "title": "",
        "venue": {
            "name": "The Independent",
            "city": "San Francisco",
            "region": "CA",
            "country": "United States",
            "latitude": "37.7773",
            "longitude": "-122.4213"
        },
        "offers": [
            {
                "type": "Tickets",
                "url": "https://ticketmaster.com",
                "status": "available"
            }
        ],
        "url": "https://www.bandsintown.com/e/1"
    },
    {
        "id": "6",
        "datetime": "2026-06-03T19:30:00",
        "title": "",
        "venue": {
            "name": "Cafe Du Nord",
            "city": "San Francisco",
            "region": "CA",
            "country": "United States",
            "latitude": "37.7635",
            "longitude": "-122.4197"
        },
        "offers": [],
        "url": "https://www.bandsintown.com/e/2"
    },
    {
        "id": "7",
        "datetime": "2026-06-21T21:00:00",
        "title": "",
        "venue": {
            "name": "Rickshaw Stop",
            "city": "San Francisco",
            "region": "CA",
            "country": "United States",
            "latitude": "37.7766",
            "longitude": "-122.4232"
        },
        "offers": [
            {
                "type": "Tickets",
                "url": "https://ticketmaster.com",
                "status": "available"
            }
        ],
        "url": "https://www.bandsintown.com/e/3"
    },
    {
        "id": "8",
        "datetime": "2026-07-04T18:00:00",
        "title": "Summer Fest",
        "venue": {
            "name": "Slim's",
            "city": "San Francisco",
            "region": "CA",
            "country": "United States",
            "latitude": "37.7751",
            "longitude": "-122.4183"
        },
        "offers": [
            {
                "type": "Tickets",
                "url": "https://ticketmaster.com",
                "status": "available"
            }
        ],
        "url": "https://www.bandsintown.com/e/4"
    }
];