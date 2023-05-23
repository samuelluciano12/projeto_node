import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';

import { AddressService } from '../service/address.service';
import { Address } from '../entity/adrress.entity';

@Controller("address")
export class AddressController {

    constructor(private readonly addressService: AddressService) {}

    @Get()
    async findAll() {
        return await this.addressService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.addressService.find(id);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() address: Address) {
        return await this.addressService.save(address);
    }
    
    @Put("/:id")
    async update(@Param('id') id: number, @Body() address: Address) {
        return this.addressService.update(id, address);
    }

    @Delete("/:id")
    @HttpCode(204)
    async remove(@Param('id') id: number) {
        return this.addressService.delete(id);
    }

}