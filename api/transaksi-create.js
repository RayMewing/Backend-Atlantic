export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ status: false, message: 'Harus POST' });

    const { code, reff_id, target } = req.body;

    if (!code || !reff_id || !target) {
        return res.status(400).json({ status: false, message: 'Data pesanan tidak lengkap' });
    }

    try {
        const params = new URLSearchParams();
        params.append('api_key', process.env.ATLANTIC_API_KEY);
        params.append('code', code);
        params.append('reff_id', reff_id);
        params.append('target', target);

        const response = await fetch('https://atlantich2h.com/transaksi/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Detail Error Transaksi Create:", error);
        return res.status(500).json({ 
            status: false, 
            message: "Crash di Vercel: " + error.message 
        });
    }
}
