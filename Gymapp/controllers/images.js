const { imageActivity } = require('../activities.js');
const images = req.files?.images;
const sharp = require('sharp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const imageactivity = async (req, res, next) => {
  try {
    await newUserSchema.validateAsync(req.body);
    const images = req.files?.images;

    if (images) {
      const images = sharp(images.data);

      const { width, format } = images.metadata();

      if (width > 300) {
        await sharp(images.data).resize(300);
      }

      const imageName = `${uuidv4()}.${format}`;

      const imagesPath = path.join(__dirname, '../../images', imageName);

      await images.toFile(imagesPath);
    }
  } catch (error) {
    next(error);
  }
};
