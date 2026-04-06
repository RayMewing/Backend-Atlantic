export default async function handler(req, res) {
    // Header CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ status: false, message: 'Harus pakai POST bro' });
    }

    const API_KEY = process.env.ATLANTIC_API_KEY;
    
    // Tangkap data dari HTML frontend
    const { reff_id, nominal, type, method } = req.body;

    try {
        const params = new URLSearchParams();
        params.append('api_key', API_KEY);
        params.append('reff_id', reff_id);
        params.append('nominal', nominal);
        params.append('type', type);     // ewallet / bank / va
        params.append('method', method); // qris / dana / bca dll

        const response = await fetch('https://atlantich2h.com/deposit/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ status: false, message: 'Terjadi kesalahan sistem' });
    }
}
