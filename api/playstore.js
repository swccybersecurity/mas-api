module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query;
  
  if (!id) return res.status(400).json({ error: 'Missing id' });
  
  try {
    const gplay = await import('google-play-scraper');
    const s = gplay.default || gplay;
    const data = await s.app({ appId: id, country: 'tw' });
    
    res.status(200).json({ version: data.version, title: data.title });
  } catch (e) {
    res.status(404).json({ error: 'Not found', detail: e.message });
  }
};
