export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const response = await fetch(
            `https://rest.bandsintown.com/artists/swell%20foop/events/?app_id=${process.env.BANDSINTOWN_API_KEY}`
        );
        const data = await response.json();
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}