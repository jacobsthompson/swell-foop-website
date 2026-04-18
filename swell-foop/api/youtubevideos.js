export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log("WHEE");
    console.log("API KEY:", process.env.YOUTUBE_API_KEY);

    const playlistId = "PLiXVv1-G9F_CKDulGIixe7NkqSRE_ghUX";

    if (!playlistId) {
        return res.status(400).json({ error: 'playlistId is required' });
    }

    try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        const videos = [];
        let nextPageToken = '';

        do {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}&pageToken=${nextPageToken}`
            );
            const data = await response.json();

            data.items.forEach(item => {
                videos.push(item.contentDetails.videoId);
            });

            nextPageToken = data.nextPageToken || '';
        } while (nextPageToken);

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}