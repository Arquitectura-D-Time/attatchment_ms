const mongoose = require('mongoose');

mongoose.connect('mongodb://34.68.15.162:27017/attatchment_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));