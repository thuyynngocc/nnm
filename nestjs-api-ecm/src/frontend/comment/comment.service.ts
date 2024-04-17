import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CommentEntity from "../../entities/comment.entity";
import CreateCommentDto from "./dto/CreateComment.dto";
import UpdateCommentDto from "./dto/UpdateComment.dto";

@Injectable()
export class CommentService {
    @InjectRepository(CommentEntity) // Inject repository của CommentEntity vào service

    private commentRepository: Repository<CommentEntity>
    // Lấy danh sách comment dựa trên user_id và các filter
    async getListsComments(user_id: number, filters: any) {
        let condition: any = {};

        if (filters.status)
            condition.t_status = filters.status;

        if (filters.user_id)
            condition.t_user_id = filters.user_id;

        let order: any = { id: "DESC" };

        // Thực hiện truy vấn với filter đã được chỉ định và trả về kết quả
        return await this.commentRepository.findAndCount({
            where: condition,
            order: order,
            take: filters.page_size,
            skip: (filters.page - 1) * filters.page_size
        });
    }

    // Lưu một comment mới vào database
    async store(commentDto: CreateCommentDto) {
        const newData = await this.commentRepository.create(commentDto);
        return await this.commentRepository.save(newData);
    }

    // Lấy comment theo ID
    async show(id: number) {
        return await this.commentRepository.findOne({
            where: {
                id: id
            }
        });
    }

    // Cập nhật comment theo ID
    async update(id: number, commentDto: UpdateCommentDto) {
        await this.commentRepository.update(id, commentDto);
        return await this.show(id);
    }
}
