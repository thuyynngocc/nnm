import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CategoryEntity from "../../entities/category.entity";

@Injectable()
export class CategoryService {
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>

    // Phương thức này trả về một danh sách các danh mục dựa trên tiêu chí lọc và phân trang được cung cấp.
    // Nó sử dụng phương thức findAndCount của TypeORM để lấy dữ liệu và trả về.
    async getListsCategory(paging: any, filters: any) {
        let condition: any = {};
        if (filters.hot) condition.c_hot = filters.c_hot;
        if (filters.status) condition.c_status = filters.c_status;

        let order: any = { id: "DESC" };

        return await this.categoryRepository.findAndCount({
            where: condition,
            order: order,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    
// Phương thức này lấy một danh mục có ID được cung cấp từ cơ sở dữ liệu.
    // Nó sử dụng phương thức findOne của TypeORM để lấy dữ liệu và trả về.
    async show(id: number) {
        return await this.categoryRepository.findOne({
            where: {
                id: id
            }
        })
    }
}
