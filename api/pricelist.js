export default async function handler(req, res) {
    // Tambahin header CORS biar WebView Android nggak rewel
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Ambil API Key dari settingan Vercel
    const API_KEY = process.env.ATLANTIC_API_KEY;

    try {
        const params = new URLSearchParams();
        params.append('api_key', API_KEY);
        // Ngambil parameter type dari frontend (misal: 'prabayar' atau 'pascabayar')
        params.append('type', req.body.type || 'prabayar'); 

        const response = await fetch('https://atlantich2h.com/layanan/price_list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ status: false, message: 'Gagal konek ke server Atlantic' });
    }
}
