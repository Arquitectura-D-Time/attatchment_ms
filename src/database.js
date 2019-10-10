const mongoose = require('mongoose');

mongoose.connect('mongodb://10.128.0.3/attatchment_db', {
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));