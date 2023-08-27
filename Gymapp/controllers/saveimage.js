const sharp = require ("sharp");
const path = require ("path");
const fs = require("fs").promises;
const{ v4: uuidv4 } = require("uuid"); 

const imagesPath = path.join(--path.dirname, "../images");

const processAndSavingImg = async (imageData, maxWidth = 300) => {
    await fs.mkdir(imagesPath), {recursive:true};

    const processedImage =sharp (imageData);
    const{width, format} = await processedImage.metadata();

    if (width > maxWidth){
        processedImage.resize(maxWidth);
    }

    const imageName = `${uuidv4}.${format}`;
    const imagePath = path.join (imagesPath, imageName); 
    await processedImage.toFile(imagePath);

    return imageName;
}

processAndSavingImg ();

