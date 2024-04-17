import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import Category from "../../entities/category.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Category
        ]) //truy vấn csdl
    ],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {}
