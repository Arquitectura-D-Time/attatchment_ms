const { Router } = require('express');

const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();

// Models
const Image = require('../models/image');

router.get('/',  (req, res) => {
    /*
    const images = await Image.find();
    res.render('index', { images });*/
    res.send('index page asfdjasfasjfasf')
});

router.get('/upload', (req, res) => {
    res.send('upload');
});

router.post('/:id/upload', async (req, res) => {
    const { id } = req.params;
    const image = new Image();
    image.id_owner = id;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/');
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findOne({id_owner: id}).exec();
    res.send('name: '+  image.originalname +"id: "+image._id);
});

router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
});

module.exports = router;