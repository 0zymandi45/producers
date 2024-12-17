import { Router } from 'express';
import { container } from 'tsyringe';
import { ProducerController } from '../controllers/ProducerController';

const router = Router();

const producerController = container.resolve(ProducerController);

router.post('/', (req, res) => producerController.createProducer(req, res));

router.get('/', (req, res) => producerController.getAllProducers(req, res));

router.get('/:id', (req, res) => producerController.getProducerById(req, res));

router.put('/:id', (req, res) => producerController.updateProducer(req, res));

router.delete('/:id', (req, res) => producerController.deleteProducer(req, res));

router.get('/totals', (req, res) => producerController.getDashboardTotals(req, res));

export default router;
