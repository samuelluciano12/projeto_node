import { Injectable } from "@nestjs/common";

import { Stage } from "../entity/stage.entity";

import { ExceptionHandler } from "../exception/ExceptionHandle";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StageService {

    constructor(
        @InjectRepository(Stage)
        private readonly stageRepository: Repository<Stage>
    ) {}

    async findAll(): Promise<Stage[]> {
        try {
            return await this.stageRepository.find();
        } catch(e) {
            console.log(e)
        }
    }

    async find(id: number): Promise<Stage> {
        const stage = await this.stageRepository.findOneBy({id});

        if (stage === null) {
            throw new ExceptionHandler(`Não existe stage de código ${id}`, 404);
        }
        
        return stage;
    }

    async save(stage: Stage): Promise<Stage> {
        const stageSalvo = await this.stageRepository.save(stage);
        
        return stageSalvo;
    }

    async update(id: number, stageUpdate: Stage): Promise<Stage> {
        let stageAtual =  await this.stageRepository.findOneBy({id});

        if (stageAtual === null) {
            throw new ExceptionHandler(`Não existe stage de código ${id}`, 404);
        }
        
        this.atualizarStage(stageAtual, stageUpdate);

        stageAtual = await this.save(stageAtual);

        return stageAtual;
    }

    async delete(id: number): Promise<void> {

        let stageAtual =  await this.stageRepository.findOneBy({id});

        if (stageAtual === null) {
            throw new ExceptionHandler(`Não existe stage de código ${id}`, 404);
        }
    
        await this.stageRepository.delete(stageAtual);
    }

    private atualizarStage(stageAtual: Stage, stageUpdate: Stage) {
        stageAtual.name = stageUpdate.name;
    }

}