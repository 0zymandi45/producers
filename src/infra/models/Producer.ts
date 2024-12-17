import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('producers')
export class Producer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cpfCnpj: string;

    @Column()
    name: string;

    @Column()
    farmName: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column({ type: 'float' })
    totalArea: number; // Área total em hectares

    @Column({ type: 'float' })
    cultivableArea: number; // Área agricultável em hectares

    @Column({ type: 'float' })
    vegetationArea: number; // Área de vegetação em hectares

    @Column('text', { array: true })
    crops: string[];

    constructor(
        id: number,
        cpfCnpj: string,
        name: string,
        farmName: string,
        city: string,
        state: string,
        totalArea: number,
        cultivableArea: number,
        vegetationArea: number,
        crops: string[]
    ) {
        this.id = id;
        this.cpfCnpj = cpfCnpj;
        this.name = name;
        this.farmName = farmName;
        this.city = city;
        this.state = state;
        this.totalArea = totalArea;
        this.cultivableArea = cultivableArea;
        this.vegetationArea = vegetationArea;
        this.crops = crops;
    }
}
