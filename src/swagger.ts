import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import { Application, Express } from 'express';
import { JsonObject } from 'swagger-ui-express'; 

const swaggerDocument = yaml.load(fs.readFileSync('./src/swagger.yaml', 'utf8')) as JsonObject;

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
