import { ProducerRepository } from '../src/repositories/ProducerRepository';
import { Producer } from '../src/infra/models/Producer';

// Mock do banco de dados
const mockDatabase = [
    { id: 1, name: 'Producer 1' },
    { id: 2, name: 'Producer 2' },
];

// Mock do Repository
jest.mock('../../src/infra/database', () => ({
    getRepository: jest.fn(() => ({
        find: jest.fn().mockResolvedValue(mockDatabase),
        findOneBy: jest.fn((query) =>
            Promise.resolve(mockDatabase.find((producer) => producer.id === query.id))
        ),
        save: jest.fn((data) => Promise.resolve({ ...data, id: 3 })),
        update: jest.fn().mockResolvedValue({ affected: 1 }), // Simula UpdateResult
        delete: jest.fn().mockResolvedValue({ affected: 1 }), // Simula DeleteResult
    })),
}));

describe('ProducerRepository - Basic Tests', () => {
    let producerRepository: ProducerRepository;

    beforeAll(() => {
        producerRepository = new ProducerRepository();
    });

    it('should return all producers', async () => {
        const producers = await producerRepository.getAllProducers();
        expect(producers).toHaveLength(2);
        expect(producers[0].name).toBe('Producer 1');
    });

    it('should return a producer by ID', async () => {
        const producer = await producerRepository.getProducerById(1);
        expect(producer).toBeDefined();
        expect(producer?.name).toBe('Producer 1');
    });

    it('should create a producer', async () => {
        const newProducer: Partial<Producer> = { name: 'New Producer' };
        const createdProducer = await producerRepository.createProducer(newProducer as Producer);
        expect(createdProducer.id).toBe(3);
        expect(createdProducer.name).toBe('New Producer');
    });

    it('should update a producer', async () => {
        const result = await producerRepository.updateProducer(1, { name: 'Updated Name' });
        expect(result).toHaveProperty('affected', 1);
    });

    it('should delete a producer', async () => {
        const result = await producerRepository.deleteProducer(1);
        expect(result).toHaveProperty('affected', 1);
    });
});
