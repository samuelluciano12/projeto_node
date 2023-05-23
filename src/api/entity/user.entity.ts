import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./adrress.entity";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column({name: 'birth_date', nullable: true})
    birthDate?: Date;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToOne(type => Address)
    @JoinColumn({name: "address_id"})
    address: Address;

}