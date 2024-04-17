import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import CommentEntity from "../../entities/comment.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentEntity
        ]), // gọi thực thể ra
    ],
    providers: [CommentService], // Thêm CommentService vào danh sách các provider được cung cấp bởi module
    controllers: [CommentController] // Thêm CommentController vào danh sách các controller được cung cấp bởi module
})
export class CommentModule {}
