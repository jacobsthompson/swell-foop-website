import {useEffect, useState} from "react";
import "../stylesheets/music.css";

import {linkIcons} from "./ImageLinks";

const releases = [
    'https://open.spotify.com/album/3wIMXwNS34iV4qAE1kzQ8k', // Dead Weight
    'https://open.spotify.com/album/6yg6Wxih6N0yZfKp12kKVc', // Dress Song
    'https://open.spotify.com/album/3DAs5Ynjx29nAGbnksRdPU', // Don't Spare Me
];

const DSMLinks = [
    'https://open.spotify.com/album/3DAs5Ynjx29nAGbnksRdPU', //spotify
    'https://music.apple.com/us/album/dont-spare-me-ep/1776810995', //apple music
    'https://soundcloud.com/swellfoop-sc/sets/dont-spare-me', //soundcloud
    'https://swellfoop.bandcamp.com/album/dont-spare-me', //bandcamp
    'https://www.youtube.com/playlist?list=OLAK5uy_mFNpqbFHqBe5PF-WX52Ff82-eUsqF9ZLQ' //youtube
];

const DSLinks = [
    'https://open.spotify.com/album/6yg6Wxih6N0yZfKp12kKVc', //spotify
    'https://music.apple.com/us/album/dress-song-single/1822716717', //apple music
    'https://soundcloud.com/swellfoop-sc/dress-song', //soundcloud
    'https://swellfoop.bandcamp.com/track/dress-song', //bandcamp
    'https://www.youtube.com/watch?v=19BJMu1wnrA' //youtube
]

const DWLinks = [
    'https://open.spotify.com/album/3wIMXwNS34iV4qAE1kzQ8k', //spotify
    'https://music.apple.com/us/album/dead-weight-ep/1837327552', //apple music
    'https://soundcloud.com/swellfoop-sc/sets/dead-weight-970347072', //soundcloud
    'https://swellfoop.bandcamp.com/album/dead-weight', //bandcamp
    'https://www.youtube.com/playlist?list=OLAK5uy_mMVQwpSMEWoa0PaEhh8lkgvDMqyPCzBIc' //youtube

]

const links = [
    ["Dead Weight", DWLinks], ["Dress Song", DSLinks], ["Don't Spare Me", DSMLinks]
];

function getLinks(title){
    for(const link of links){
        if(link.includes(title)){
            return link[1];
        }
    }

    return null;
}

function useDiscography(){
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all(
            releases.map(url =>
                fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`)
                    .then(r => r.json())
                    .then(data => ({
                        title: data.title,
                        thumbnail: data.thumbnail_url.replace('00001e02', '000082c1'),
                        links: getLinks(data.title)
                    }))
            )
        ).then(results => {
            setAlbums(results);
            setLoading(false);
        });
    }, []);

    return { albums, loading };
}

function AlbumLinks({title, links}){
    const handleClick = (link) => {
        window.open(link);
    }

    return(
        <div className="album-links-container">
            {/*<h3 style={{paddingTop: "10%"}}>{title}</h3>*/}
            <div className="album-links">
                <img className="album-link" src={linkIcons[0]} alt='' title={"Spotify"} onClick={() => handleClick(links[0])}/>
                <img className="album-link" src={linkIcons[1]} alt='' title={"Apple Music"} onClick={() => handleClick(links[1])}/>
                <img className="album-link" src={linkIcons[2]} alt='' title={"SoundCloud"} onClick={() => handleClick(links[2])}/>
                <img className="album-link" src={linkIcons[3]} alt='' title={"BandCamp"} onClick={() => handleClick(links[3])}/>
                <img className="album-link" src={linkIcons[4]} alt='' title={"Youtube"} onClick={() => handleClick(links[4])}/>
            </div>
        </div>
    );
}

function Album({srcAlbum, loading}){
    const title = srcAlbum?.title;
    const thumbnail = srcAlbum?.thumbnail;
    const links = srcAlbum?.links;

    if(loading) return (<div className="album-wrapper"/>);

    return(
        <div className="album-container">
            <div className="album-wrapper">
                <AlbumLinks title={title} links={links}/>
                <img className="album-cover" src={thumbnail} alt={""}/>
            </div>
            <h3>{title}</h3>
        </div>
    );
}

function useYoutube(){
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/youtubevideos")
            .then(r => r.text())
            .then(videoIds => {
                console.log(videoIds);
                const embedUrls = videoIds.map(id => `https://www.youtube.com/embed/${id}`);
                setVideos(embedUrls);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { videos, loading, error };
}

function YoutubeCarousel(){
    const {videos, loading, error} = useYoutube();

    if(loading) return <p> Loading Shows </p>
    if(error) return <p>{error} </p>

    return (
        <div className="youtube-container">
            {videos.map((url, i) => (
                <iframe
                    key={i}
                    src={url}
                    width="560"
                    height="315"
                    allowFullScreen
                    title={`Video ${i + 1}`}
                />
            ))}
        </div>
    );
}

export default function Music() {
    const { albums, loading } = useDiscography();

    return (
        <div className="music-container">
            <h1>Latest Releases</h1>
            {loading && (
                <div className="albums-container">
                    {releases.map((i) => (<Album key={i} srcAlbum={null} loading={loading}/>))}
                </div>
            )}
            {!loading && (
                <div className="albums-container">
                    {albums.map((album,i) => (<Album key={i} srcAlbum={album} loading={loading}/>))}
                </div>
            )}
            <YoutubeCarousel/>
        </div>
    )
}