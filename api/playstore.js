import gplay from ‘google-play-scraper’;

export default async function handler(req, res) {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘GET’);

const { id } = req.query;
if (!id) return res.status(400).json({ error: ‘Missing package id’ });

try {
const data = await gplay.app({ appId: id, country: ‘tw’, lang: ‘zh-TW’ });
res.status(200).json({ version: data.version, title: data.title });
} catch (e) {
res.status(404).json({ error: ‘App not found’, detail: e.message });
}
}
