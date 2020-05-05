const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');


const server = restify.createServer();

// Middleware

server.use(restify.plugins.bodyParser());

// server.use(rjwt({
//   secret: config.JWT_SECRET
// }).unless({
//   path: ['/auth']
// }));

server.listen(config.PORT, () => {
  mongoose.connect(
    config.MONGODB_URI, 
    { 
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false  
    }
  );
});

const db = mongoose.connection;

db.on('error', (err) => console.info(err));

db.once('open', () => {
  require('./routes/customers')(server);
  require('./routes/users')(server);
  console.info(`Server started on port ${config.PORT}`);
});
