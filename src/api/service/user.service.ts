import { Injectable } from '@nestjs/common';

import { User } from '../entity/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExceptionHandler } from '../exception/ExceptionHandle';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async find(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id});

        if (user === null) {
            throw new ExceptionHandler(`Não existe user de código ${id}`, 404);
        }
    
        return user;
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(id: number, userUpdate: User): Promise<User> {
        let userAtual =  await this.userRepository.findOneBy({id});

        if (userAtual === null) {
            throw new ExceptionHandler(`Não existe user de código ${id}`, 404);
        }
        
        this.atualizarUser(userAtual, userUpdate);
        
        return await this.save(userAtual);
    }

    async delete(id: number): Promise<void> {
        let user =  await this.userRepository.findOneBy({id});
        
        if (user === null) {
            throw new ExceptionHandler(`Não existe user de código ${id}`, 404);
        }

        await this.userRepository.delete(user);
    }

    private atualizarUser(userAtual: User, userUpdate: User) {
        userAtual.username = userUpdate.username;
        userAtual.fullname = userUpdate.fullname;
        userAtual.birthDate = userUpdate.birthDate;
        userAtual.email = userUpdate.email;
        userAtual.password = userUpdate.password;
        userAtual.address = userUpdate.address;
    }

}