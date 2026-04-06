export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ status: false, message: 'Harus POST' });

    try {
        const params = new URLSearchParams();
        params.append('api_key', process.env.ATLANTIC_API_KEY);
        params.append('type', req.body.type || 'prabayar'); 
        if (req.body.code) params.append('code', req.body.code);

        const response = await fetch('https://atlantich2h.com/layanan/price_list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Server Error' });
    }
}
