import {useState} from "react";
import "../stylesheets/music-embeds.css";

function MusicEmbed({service}) {
    switch(service) {
        case "spotify":
            return (
                <iframe
                    className="music-embed"
                    title="Spotify"
                    src="https://open.spotify.com/embed/artist/5zQi16UXlsQxpqeIOYBu7r?utm_source=generator&theme=0"
                />
            )

        case "apple-music":
            return (
                <iframe
                    className="music-embed"
                    title="Apple Music"
                    src="https://embed.music.apple.com/us/album/dont-spare-me-ep/1776810995?itscg=30200&amp;itsct=music_box_player&amp;ls=1&amp;app=music&amp;mttnsubad=1776810995&amp;theme=light"
                />
            )

        case "soundcloud":
            return (
                <iframe
                    className="music-embed"
                    title="Soundcloud"
                    src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fswellfoop-sc&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false"
                />
            );

        case "bandcamp":
            return(
                <iframe
                    className="music-embed"
                    title="Bandcamp"
                    src="https://bandcamp.com/EmbeddedPlayer/album=516270296/size=large/bgcol=ffffff/linkcol=de270f/artwork=small/transparent=true/" seamless
                />
            );
        default:
            return;
    }
}

export default function MusicEmbeds() {
    const [service, setService] = useState("spotify");

    const handleService = (s) => {
        setService(s);
        console.log(service);
    }

    return (
        <div className="music-embeds">
            <MusicEmbed service={service}/>
            <div className="MusicButtons">
                <button onClick={() => handleService("spotify")}>Spotify</button>
                <button onClick={() => handleService("apple-music")}>Apple Music</button>
                <button onClick={() => handleService("soundcloud")}>Soundcloud</button>
                <button onClick={() => handleService("bandcamp")}>Bandcamp</button>
                <button onClick={() => handleService("youtube")}>Youtube</button>
            </div>
        </div>
    )
}