import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.get('/', (request, response) => {
  console.log('request', request);
  response.send('Hello world!');
});

const init = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@tasks-app.kddnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );
  // console.log('res', res);

  app.listen(port, () => console.log(`Running on port: ${port}`));
};

init();
