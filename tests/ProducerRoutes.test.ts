import request from 'supertest';
import App from '../src/app';

const app = new App();
const server = (app as any).express || app;

describe('Producer Routes - Basic Tests', () => {
    it('should return 200 on GET /producers', async () => {
        const response = await request(server).get('/producers');
        expect(response.status).toBe(200);
    });

    it('should return 200 on GET /producers/:id', async () => {
        const response = await request(server).get('/producers/1');
        expect(response.status).toBe(200);
    });

    it('should return 201 on POST /producers', async () => {
        const response = await request(server)
            .post('/producers')
            .send({ name: 'Test Producer' });
        expect(response.status).toBe(201);
    });

    it('should return 200 on PUT /producers/:id', async () => {
        const response = await request(server)
            .put('/producers/1')
            .send({ name: 'Updated Producer' });
        expect(response.status).toBe(200);
    });

    it('should return 200 on DELETE /producers/:id', async () => {
        const response = await request(server).delete('/producers/1');
        expect(response.status).toBe(200);
    });
});
