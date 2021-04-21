import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import * as dotenv from 'dotenv';

import { authRoutes } from './components/Auth/authRoutes';
import { passportInstance } from './components/Auth/passport';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const init = async () => {
  await mongoose.connect(
    `mongodb+srv://${
      process.env.MONGO_LOGIN
    }:${
      process.env.MONGO_PASSWORD
    }@tasks-app.kddnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );
  // console.log('res', res);

  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Running on port: ${port}`));
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Byte Education tasks app',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      contact: { name: 'Byte Education' },
    },
    servers: [
      { url: 'http://localhost:5000' },
    ],
  },
  // defenition: {},
  apis: [
    '**/*.ts',
  ],
};

// eslint-disable-next-line
const specs = swaggerJsDoc(options);

void init();

app.use(express.json());

app.use(passport.initialize());
passportInstance(passport);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);
app.use('/api/auth', authRoutes);

app.use((error: unknown, _req, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.toString() });
  next();
});
