const { Router } = require('express');

const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();

// Models
const Image = require('../models/image');
const PDF = require('../models/pdf');

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name:'dmp9ifam8',
    api_key: '739695551696556',
    api_secret: 'uP9QEL4naoe0Q1S-r2UahFzcF_Q'
})
const fs = require('fs-extra');

router.get('/image',  (req, res) => {
    /*
    const images = await Image.find();
    res.render('index', { images });*/
    res.send('Este es el microservicio que manejara tus archivos adjuntos: ')
});

router.post('/:id/foto', async (req, res) => {
    const { id } = req.params;
    console.log('Hola')
    console.log(req.file);
    const result =await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);
    const image = new Image();
    image.id_owner = id;
    image.url = result.url;
    image.public_id = result.public_id;
    image.originalname = req.file.originalname;
    await image.save();
    await fs.unlink(req.file.path);
    res.send('recibido');
});

// mostrar imagen
router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findOne({id_owner: id}).exec();
    res.json({ name:  image.originalname, url:image.url})

});


router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findOne({id_owner: id}).exec();
    const idm = image._id;
    const imageDeleted = await Image.findByIdAndDelete(idm);
    const result = await cloudinary.v2.uploader.destroy(imageDeleted.public_id);
    res.send('eliminada');
});

module.exports = router;