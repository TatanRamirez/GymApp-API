

const { imageActivity} = require("../activities.js");
const images = req.files?.images;
const sharp =require("sharp");
const path =require("path");
const { v4: uuidv4 } = require('uuid');

const imageactivity = async (req, res, next) =>{
    try{
        await //poner el nombre de la actividad. validateAsync(req.body);
        const images = req.files?.images; 
    }
}

if (images){
    const imagesPath =path.join(__dirname,"../../images",);

    const images =sharp(images.data);

    const { width, format } = images.metadata();

if (width > 300) {
    await sharp(images.data).resize(300)
 }
 const imageName = `${uuidv4()}.$ {format}`;
  await images. toFile(imagesPath);
  
} 