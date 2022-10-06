import express from 'express';
import { shortenerService } from '../services';

const router = express.Router();

router.post('/shortener', (req, res) => {
  let { originalUrl } = req.body;

  try {
    originalUrl = new URL(originalUrl);
  } catch (err) {
    return res.status(404).json({ error: 'Invalid url' });
  }

  let shortUrl = shortenerService.getShortUrl(originalUrl.href);

  if (shortUrl !== null) {
    return res.status(200).json({ newUrl: shortUrl });
  }

  do {
    shortUrl = shortenerService.generateShortUrl();
  } while (!shortenerService.isShortUrlAvailable(shortUrl));

  shortenerService.addUrl(originalUrl.href, shortUrl);
  return res.status(200).json({ newUrl: shortUrl });
});

export const api = router;
