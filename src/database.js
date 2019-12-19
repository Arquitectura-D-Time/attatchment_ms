const mongoose = require('mongoose');

mongoose.connect('mongodb://attatchment-db:27017/attatchment_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));