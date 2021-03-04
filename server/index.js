const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const PORT = config.get('serverPort');

const corsMiddleware = require('./middleware/cors.middleware');

app.use(fileUpload({}))
app.use(corsMiddleware);
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);


const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'));
    app.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    });
  } catch (e) {

  }
};

start();
