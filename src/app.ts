import 'reflect-metadata';
import express, { Request, Response } from 'express';
import logger from './utils/logger';
import fs from 'fs';
import path from 'path';
import { container } from './container'; 
import { ProducerController } from './controllers/ProducerController';
import { setupSwagger } from './swagger'; 

export default class App {
    private app: express.Application;
    private producerController: ProducerController;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.loadRoutes();
        this.configureErrorHandling();
        this.producerController = container.resolve(ProducerController);
        setupSwagger(this.app); 
    }

    private configureMiddleware() {
        this.app.use(express.json());
    }

    public get(path: string, callback: (req: Request, res: Response) => void) {
        this.app.get(path, callback);
    }

    private loadRoutes() {
        const routesPath = path.join(__dirname, 'routes');

        fs.readdirSync(routesPath).forEach(file => {
            if (file.endsWith('.ts')) {
                const route = require(path.join(routesPath, file)).default;
                this.app.use(`/api/${file.replace('.ts', '')}`, route);
            }
        });
    }

    private configureErrorHandling() {
        this.app.use((err: unknown, req: Request, res: Response, next: express.NextFunction) => {
            const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
            logger.error(errorMessage);
            res.status(500).json({ message: errorMessage });
        });
    }

    public async start(port: number) {
        return new Promise<void>((resolve, reject) => {
            this.app.listen(port, () => {
                logger.info(`Server is running on http://localhost:${port}`);
                resolve();
            }).on('error', (err) => {
                logger.error('Error starting server:', err);
                reject(err);
            });
        });
    }
}
