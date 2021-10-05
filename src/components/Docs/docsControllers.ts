import { RequestHandler } from 'express';

export const getDocsController: RequestHandler = async (_req, res) => {
  res.json({
    paths: {
      '/api/auth/login': {
        post: {
          tags: [
            'Auth',
          ],
          summary: 'Using for login existing user.',
          consumes: [
            'application/json',
          ],
          produces: [
            'application/json',
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/definitions/LoginRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Succesfull',
            },
          },
        },
      },
      '/api/auth/register': {
        post: {
          tags: [
            'Auth',
          ],
          summary: 'Using for register new user.',
          consumes: [
            'application/json',
          ],
          produces: [
            'application/json',
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/definitions/RegisterRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Succesfull request.',
            },
            400: {
              description: 'Bad request.',
            },
          },
        },
      },
      '/api/auth/user/self': {
        get: {
          tags: [
            'Auth',
          ],
          summary: 'Get current user.',
          consumes: [
            'application/json',
          ],
          produces: [
            'application/json',
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            201: {
              description: 'Succesfull request.',
            },
            400: {
              description: 'Unathorized.',
            },
          },
        },
      },
      '/api/task': {
        get: {
          tags: [
            'Tasks',
          ],
          summary: 'Get all tasks list.',
          consumes: [
            'application/json',
          ],
          produces: [
            'application/json',
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'Succesfull request.',
            },
          },
        },
        post: {
          tags: [
            'Tasks',
          ],
          summary: 'Create task.',
          consumes: [
            'application/json',
          ],
          produces: [
            'application/json',
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            201: {
              description: 'Succesfull request',
            },
            400: {
              description: 'Bad request.',
            },
          },
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/definitions/CreateTaskRequest',
                },
              },
            },
          },
        },
      },
      '/api/task/{taskId}': {
        get: {
          tags: [
            'Tasks',
          ],
          parameters: [
            {
              in: 'path',
              name: 'taskId',
            },
          ],
          summary: 'Get all tasks list.',
          consumes: [
            'application/json',
          ],
          produces: [
            'application/json',
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'Succesfull request.',
            },
          },
        },
        patch: {
          tags: [
            'Tasks',
          ],
          parameters: [
            {
              in: 'path',
              name: 'taskId',
            },
          ],
          summary: 'Create task.',
          consumes: [
            'application/json',
          ],
          produces: [
            'application/json',
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            201: {
              description: 'Succesfull request',
            },
            400: {
              description: 'Bad request.',
            },
          },
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/definitions/CreateTaskRequest',
                },
              },
            },
          },
        },
        delete: {
          tags: [
            'Tasks',
          ],
          parameters: [
            {
              in: 'path',
              name: 'taskId',
            },
          ],
          summary: 'Create task.',
          consumes: [
            'application/json',
          ],
          produces: [
            'application/json',
          ],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            204: {
              description: 'Succesfull delete request',
            },
            400: {
              description: 'Bad request.',
            },
          },
        },
      },
    },
    definitions: {
      LoginRequest: {
        summary: 'Regiter new user.',
        type: 'object',
        required: [
          'email',
          'password',
        ],
        properties: {
          email: {
            type: 'string',
            example: 'test@gmail.com',
          },
          password: {
            type: 'string',
          },
        },
      },
      RegisterRequest: {
        summary: 'Regiter new user.',
        type: 'object',
        required: [
          'email',
          'password',
        ],
        properties: {
          email: {
            type: 'string',
            example: 'test@gmail.com',
          },
          name: {
            type: 'string',
            example: 'Test',
          },
          password: {
            type: 'string',
          },
        },
      },
      CreateTaskRequest: {
        summary: 'Create task.',
        type: 'object',
        required: [
          'name',
          'description',
        ],
        properties: {
          name: {
            type: 'string',
            example: 'Create App',
          },
          description: {
            type: 'string',
            example: 'Some description',
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  });
};
