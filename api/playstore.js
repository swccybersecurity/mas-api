module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;
  
  if (!id) return res.status(400).json({ error: 'Missing id' });
  
  try {
    const m = await import('google-play-scraper');
    const gplay = m.default ?? m;
    const app = gplay.app ?? gplay.default?.app;
    const data = await app({ appId: id, country: 'tw' });
    
    res.status(200).json({ version: data.version, title: data.title });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
