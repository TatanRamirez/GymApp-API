const sharp = require('sharp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const imageActivity = async (req, res, next) => {
  try {
    await newUserSchema.validateAsync(req.body);
    const images = req.files?.images;

    if (images) {
      const processedimage = sharp(images.data);

      const { width, format } = await image.metadata();

      if (width > 300) {
        await sharp(image.data).resize(300);
      }

      const imageName = `${uuidv4()}.${format}`;

      const imagesPath = path.join(__dirname, '../../images', imageName);

      await image.toFile(imagesPath);
    }
  } catch (error) {
    next(error);
  }
};

console.log(imageActivity);

module.exports = {
  imageActivity
};

