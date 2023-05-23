import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("stage")
export class Stage {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;
    
}