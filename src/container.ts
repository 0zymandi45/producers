import { container } from 'tsyringe';
import { ProducerRepository } from './repositories/ProducerRepository';
import { ProducerService } from './services/ProducerService';

container.register('ProducerRepository', { useClass: ProducerRepository });
container.register('ProducerService', { useClass: ProducerService });

export { container };