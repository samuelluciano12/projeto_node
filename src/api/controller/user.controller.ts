import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";

import { UserService } from "../service/user.service";
import { User } from "../entity/user.entity";

@Controller("/users")
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.userService.find(id);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() user: User) {
        return await this.userService.save(user);
    }
    
    @Put("/:id")
    async update(@Param('id') id: number, @Body() user: User) {
        return this.userService.update(id, user);
    }

    @Delete("/:id")
    @HttpCode(204)
    async remove(@Param('id') id: number) {
        return this.userService.delete(id);
    }
    
}