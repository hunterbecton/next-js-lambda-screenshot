import { generateImage } from 'services/image';

export default async (req, res) => {
  try {
    const image = await generateImage();
    if (!image) {
      res.statusCode = 500;
      res.end();
      return;
    }

    res.end(image, 'binary');
    return;
  } catch (error) {
    res.statusCode = 500;
    res.end();
    return;
  }
};
