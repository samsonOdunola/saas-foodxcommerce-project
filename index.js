const syncDb = require('./db_sync/db_relationship');
const App = require('./app');
require('dotenv').config();
const sequelize = require('./config/mysql.config');
// eslint-disable-next-line no-unused-vars
const { populatePermissions } = require('./config/createpermissions');

const port = process.env.PORT || 5000;

const connectDb = async () => {
  try {
    syncDb();
    // await Mongoose.connect(mongoUri, options);
    await sequelize.sync({ alter: true });
    console.log('Database connected');
    // populatePermissions();
    App.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectDb();

// const db = Mongoose.connection;

// db.once('connected', () => {
//   console.info('Connected to database');
//   App.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
//   });
// });
// db.on('error', (err) => {
//   console.error(err);
// });
// db.once('disconnected', () => {
//   console.info('Database Disconnected');
// });
// process.on('SIGINT', () => {
//   Mongoose.connection.close((err) => {
//     console.info('Database Connection Closed Due to App Termination');
//     process.exit(err ? 1 : 0);
//   });
// });
