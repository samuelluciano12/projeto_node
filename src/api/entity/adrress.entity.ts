import { Stage } from "./stage.entity";

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('address')
export class Address {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    street: string
    
    @Column()
    neightboord: Date;
    
    @Column()
    postalCode: string;
    
    @Column()
    number: string;
    
    @Column()
    city: string;

    @ManyToOne(type => Stage)
    @JoinColumn({name: "stage_id"})
    stage: Stage;

}