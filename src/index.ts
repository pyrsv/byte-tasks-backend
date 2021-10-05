import express, { NextFunction, Response } from 'express';
import path from 'path';
import mongoose from 'mongoose';

import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import * as dotenv from 'dotenv';

import { authRoutes } from './components/Auth/authRoutes';
import { taskRoutes } from './components/Task/taskRoutes';
import { passportInstance } from './components/Auth/passport';
import { docsRoutes } from './components/Docs/docsRoutes';
import cors from 'cors';

// import { MongoClient } from 'mongodb';

// const { mo } = mongoose;

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const init = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${
        process.env.MONGO_LOGIN
      }:${
        process.env.MONGO_PASSWORD
      }@tasks-app.kddnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        // useNewUrlParser: true,
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      },
    );
    // eslint-disable-next-line no-console
    app.listen(port, () => console.log(`Running on port: ${port}`));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Connection error:', err);
  }

  // eslint-disable-next-line no-console
  // try {
  //   const uri = `mongodb+srv://pyrsv:${
  //     process.env.MONGO_PASSWORD
  //   }@tasks-app.kddnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  //   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  //   client.connect(async (a) => {
  //     console.log(`a`, a)
  //     // eslint-disable-next-line no-console
  //     await app.listen(port, () => console.log(`Running on port: ${port}`));
  //   });
  // } catch (err) {
  //   // eslint-disable-next-line no-console
  //   console.log('err', err);
  // }
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Byte Education Tasks App',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application for educational purposes',
      contact: { name: 'Byte Education' },
    },
    servers: [
      { url: 'http://localhost:5000' },
    ],
  },
  // defenition: {},
  // apis: [
  //   // '**/*.ts',
  //   './src/docs/parameters.yaml',
  // ],
  apis: [path.join(__dirname, './docs/test.js')],
};

// eslint-disable-next-line
const specs = swaggerJsDoc(options);

init();

app.use(express.json());
app.use(passport.initialize());
passportInstance(passport);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);

app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/docs', docsRoutes);
app.use(cors());

app.use((error: unknown, _req, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log('error', error);
  res.status(500).json({ error: error.toString() });
  next();
});
