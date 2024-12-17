import { inject, injectable } from 'tsyringe';
import { ProducerRepository } from '../repositories/ProducerRepository';
import { Producer } from '../infra/models/Producer';

@injectable()
export class ProducerService {
    constructor(
        @inject('ProducerRepository') public producerRepository: ProducerRepository
    ) {}

    public async createProducer(producer: Producer): Promise<Producer> {
        return await this.producerRepository.createProducer(producer);
    }

    public async updateProducer(id: number, updatedData: Partial<Producer>): Promise<Producer> {
        const producer = await this.producerRepository.updateProducer(id, updatedData);

        if (!producer) {
            throw new Error("Producer not found");
        }

        return producer;
    }

    public async deleteProducer(id: number): Promise<Producer | null> {
        const producer = await this.producerRepository.deleteProducer(id);

        if (!producer) {
            throw new Error("Producer not found");
        }
        return producer;
    }

    public async getProducerById(id: number): Promise<Producer | null> {
        const producer = await this.producerRepository.getProducerById(id);
        if (!producer) {
            throw new Error("Producer not found");
        }
        return producer;
    }

    public async getAllProducers(): Promise<Producer[]> {
        return await this.producerRepository.getAllProducers();
    }

    public async getDashboardTotals() {
        return await this.producerRepository.getDashboardTotals();
    }
}
