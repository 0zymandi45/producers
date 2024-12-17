import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ProducerService } from '../services/ProducerService';
import { HttpStatus } from '../utils/httpStatus';
import logger from '../utils/logger';

@injectable()
export class ProducerController {
    constructor(
        @inject('ProducerService') private producerService: ProducerService
    ) {}

    public async createProducer(req: Request, res: Response): Promise<void> {
        try {
            const producer = req.body;
            const newProducer = await this.producerService.createProducer(producer);
            logger.info('Producer created:', newProducer);
            res.status(HttpStatus.CREATED).json(newProducer);
        } catch (error) {
            logger.error('Error creating producer:', (error as Error).message);
            res.status(HttpStatus.BAD_REQUEST).json({ error: (error as Error).message });
        }
    }

    public async updateProducer(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                throw new Error("ID is required to update a producer");
            }
            const producer = req.body;
            const updatedProducer = await this.producerService.updateProducer(id, producer);
            logger.info('Producer updated:', updatedProducer);
            res.status(HttpStatus.OK).json(updatedProducer);
        } catch (error) {
            logger.error('Error updating producer:', (error as Error).message);
            res.status(HttpStatus.BAD_REQUEST).json({ error: (error as Error).message });
        }
    }

    public async deleteProducer(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.producerService.deleteProducer(id);
            logger.info('Producer deleted with id:', id);
            res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            logger.error('Error deleting producer:', (error as Error).message);
            res.status(HttpStatus.BAD_REQUEST).json({ error: (error as Error).message });
        }
    }

    public async getProducerById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const producer = await this.producerService.getProducerById(id);
            res.status(HttpStatus.OK).json(producer);
        } catch (error) {
            logger.error('Error fetching producer:', (error as Error).message);
            res.status(HttpStatus.NOT_FOUND).json({ error: (error as Error).message });
        }
    }

    public async getAllProducers(req: Request, res: Response): Promise<void> {
        try {
            const producers = await this.producerService.getAllProducers();
            res.status(HttpStatus.OK).json(producers);
        } catch (error) {
            logger.error('Error fetching producers:', (error as Error).message);
            res.status(HttpStatus.BAD_REQUEST).json({ error: (error as Error).message });
        }
    }

    public async getDashboardTotals(req: Request, res: Response): Promise<void> {
        try {
            const totals = await this.producerService.getDashboardTotals();
            res.status(HttpStatus.OK).json(totals);
        } catch (error) {
            logger.error('Error fetching dashboard totals:', (error as Error).message);
            res.status(HttpStatus.BAD_REQUEST).json({ error: (error as Error).message });
        }
    }
}
