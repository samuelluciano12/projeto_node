import { Injectable } from '@nestjs/common';

import { Address } from '../entity/adrress.entity';

import { ExceptionHandler } from '../exception/ExceptionHandle';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ) {}

    async findAll(): Promise<Address[]> {
        return await this.addressRepository.find();
    }

    async find(id: number): Promise<Address> {
        const address = await this.addressRepository.findOneBy({id});

        if (address === null) {
            throw new ExceptionHandler(`Não existe address de código ${id}`, 404);
        }
    
        return address;
    }

    async save(address: Address): Promise<Address> {
        const addressSalvo = await this.addressRepository.save(address);

        return addressSalvo;
    }

    async update(id: number, addressUpdate: Address): Promise<Address> {
        let addressAtual =  await this.addressRepository.findOneBy({id});

        if (addressAtual === null) {
            throw new ExceptionHandler(`Não existe address de código ${id}`, 404);
        }
        
        this.atualizarStage(addressAtual, addressUpdate);
        
        return  this.save(addressAtual);
    }

    async delete(id: number): Promise<void> {
        let address =  await this.addressRepository.findOneBy({id});

        if (address === null) {
            throw new ExceptionHandler(`Não existe address de código ${id}`, 404);
        }

        await this.addressRepository.delete(address);
    }

    private atualizarStage(addressAtual: Address, addressUpdate: Address) {
        addressAtual.neightboord = addressUpdate.neightboord;
        addressAtual.street = addressUpdate.street;
        addressAtual.number = addressUpdate.number;
        addressAtual.postalCode = addressUpdate.postalCode;
        addressAtual.city = addressUpdate.city;
        addressAtual.stage = addressUpdate.stage;
    }

}