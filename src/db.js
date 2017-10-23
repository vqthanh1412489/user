const mongoose = require('mongoose');
const uri = 'mongodb://localhost/node0409';
mongoose.connect(uri, { useMongoClient: true });
mongoose.Promise = global.Promise;

