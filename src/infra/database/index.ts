import { DataSource } from 'typeorm';
import { Producer } from '../models/Producer'; 
import logger from '../../utils/logger'; 

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Mantenha como false em produção
    logging: true,
    entities: [Producer],
});

export class Database {
    static async connect() {
        try {
            await AppDataSource.initialize();
            logger.info('Database connected successfully');
        } catch (error) {
            logger.error('Database connection failed', error);
            throw error; 
        }
    }
}

export default AppDataSource; 
