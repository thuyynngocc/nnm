import { Controller, Get, HttpStatus, Param, ParseIntPipe, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";
import { CategoryService } from "./category.service";
@Controller('category') // định nghĩa một controller với đường dẫn bắt đầu là /category
@ApiTags('Category') // đánh tag Category cho controller này
export class CategoryController {
    constructor(private categoryService: CategoryService) { } // inject CategoryService vào controller

    @Get('lists') // định nghĩa một endpoint GET với đường dẫn là /category/lists
    async getListsCategory(@Req() req: Request) { // xử lý yêu cầu GET
        // lấy thông tin phân trang từ query parameters của request
        const paging = {
            page: req.query.page || 1, // trang hiện tại, mặc định là 1 nếu không có
            page_size: req.query.page_size || 10, // số lượng phần tử trên mỗi trang, mặc định là 10 nếu không có
        }

        // lấy thông tin bộ lọc từ query parameters của request
        const filters = {
            hot: req.query.hot || "", // lọc theo thuộc tính hot (nóng)
            status: req.query.status || "", // lọc theo thuộc tính status (trạng thái)
            sort: req.query.sort || "" // sắp xếp theo thuộc tính nào, ví dụ sort=created_at để sắp xếp theo thời gian tạo
        }

        // gọi phương thức getListsCategory của CategoryService để lấy danh sách các category
        const response = await this.categoryService.getListsCategory(paging, filters);

        // response trả về một mảng gồm 2 phần tử: danh sách category và tổng số category
        const [data, total] = response;

        // tạo một đối tượng pagingData từ thông tin phân trang và tổng số category
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        // trả về một đối tượng ResponseData chứa thông tin trả về cho client
        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }

    @Get('show/:id') // xử lý yêu cầu GET với đường dẫn '/category/show/:id'
    async show(
        @Param('id', ParseIntPipe) id: number // lấy giá trị id từ đường dẫn và chuyển đổi sang kiểu number bằng ParseIntPipe
    ) {
        console.log('-------------- show', id); // log ra id để kiểm tra
        const data = await this.categoryService.show(id); // gọi phương thức show của CategoryService để lấy thông tin category theo id
        return new ResponseData(HttpStatus.OK, data); // trả về một đối tượng ResponseData chứa thông tin category và mã HTTP OK
    }
}

