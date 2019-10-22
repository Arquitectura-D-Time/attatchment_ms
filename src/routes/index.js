const { Router } = require('express');

const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();

// Models
const Image = require('../models/image');
const PDF = require('../models/pdf');

router.get('/',  (req, res) => {
    /*
    const images = await Image.find();
    res.render('index', { images });*/
    res.send('Este es el microservicio que manejara tus archivos adjuntos: ')
});

router.get('/upload', (req, res) => {
    res.send('El archivo fue cargado satisfactoriamente');
});

router.post('/:id/certificado', async (req, res) => {
    const { id } = req.params;
    const pdf = new PDF();
    pdf.id_owner = id;
    pdf.tipo = 0;
    pdf.filename = req.file.filename;
    pdf.path = '/img/uploads/' + req.file.filename;
    pdf.originalname = req.file.originalname;
    pdf.mimetype = req.file.mimetype;
    pdf.size = req.file.size;

    await pdf.save();
    res.redirect('/');
});

router.post('/:id/foto', async (req, res) => {
    const { id } = req.params;
    const image = new Image();
    image.id_owner = id;
    image.tipo = 1;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/');
});

// mostrar imagen
router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findOne({id_owner: id}).exec();
    res.send('name: '+  image.originalname +"id: "+image.path);
});
router.get('/documento/:id', async (req, res) => {
    const { id } = req.params;
    const pdf = await PDF.findOne({id_owner: id}).exec();
    res.send('name: '+  pdf.originalname +"id: "+pdf.path);
});

router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
});

module.exports = router;