const Mongoose = require('mongoose');
const { mongoUri, options } = require('./config/mongo.config');
const App = require('./app');

const port = process.env.PORT || 5000;

const connectDb = async () => {
  try {
    await Mongoose.connect(mongoUri, options);
  } catch (error) {
    console.error(error);
  }
};
connectDb();

const db = Mongoose.connection;

db.once('connected', () => {
  console.info('Connected to database');
  App.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
db.on('error', (err) => {
  console.error(err);
});
db.once('disconnected', () => {
  console.info('Database Disconnected');
});
process.on('SIGINT', () => {
  Mongoose.connection.close((err) => {
    console.info('Database Connection Closed Due to App Termination');
    process.exit(err ? 1 : 0);
  });
});
