import { Module } from '@nestjs/common';

import { UserController } from './controller/user.controller';
import { StageController } from './controller/stage.controller';
import { AddressController } from './controller/address.controller';

import { UserService } from './service/user.service';
import { StageService } from './service/stage.service';
import { AddressService } from './service/address.service';

import { User } from './entity/user.entity';
import { Address } from './entity/adrress.entity';
import { Stage } from './entity/stage.entity';

import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature(
        [User, Address, Stage]
    )],
    controllers: [
        UserController,
        StageController,
        AddressController
    ],
    providers: [
        UserService,
        StageService,
        AddressService
    ]
})
export class ApiModule {}