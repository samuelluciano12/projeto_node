import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";

import { StageService } from "../service/stage.service";
import { Stage } from "../entity/stage.entity";

@Controller("stages")
export class StageController {

    constructor(private readonly stageService: StageService ) {}

    @Get()
    async findAll() {
        return await this.stageService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.stageService.find(id);
    }

    @Post()
    @HttpCode(201)
    async create(@Body() stage: Stage) {
        return await this.stageService.save(stage);
    }
    
    @Put("/:id")
    async update(@Param('id') id: number, @Body() stage: Stage) {
        return this.stageService.update(id, stage);
    }

    @Delete("/:id")
    @HttpCode(204)
    async remove(@Param('id') id: number) {
        return this.stageService.delete(id);
    }
    
}