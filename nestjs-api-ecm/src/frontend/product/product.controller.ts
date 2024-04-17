import { Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Req } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";

@Controller('product')
@ApiTags("Product")
export class ProductController {

    constructor(private productService: ProductService) { }

    // Lấy danh sách sản phẩm theo các tham số phân trang và bộ lọc
    @Get('lists')
    async getListsProducts(
        @Req() req: Request
    ) {
        const paging = {
            page: req.query.page || 1,
            page_size: req.query.page_size || 10,
        }

        const filters = {
            hot: req.query.hot || "",
            status: req.query.status || "",
            sort: req.query.sort || "",
            name: req.query.name || "",
            category_id: req.query.category_id || "",
            sale: req.query.sale || ""
        }

        // Gọi hàm ProductService để lấy danh sách sản phẩm theo các tham số truyền vào
        const response = await this.productService.getListsProducts(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        // Trả về dữ liệu và phân trang
        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }

    // Lấy thông tin sản phẩm theo ID
    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            // Gọi hàm ProductService để lấy thông tin sản phẩm theo ID
            const data = await this.productService.show(id);
            return new ResponseData(HttpStatus.OK, data);
        } catch (e) {
            console.log('----------ERROR: ProductController@show => ', e);
            return new ResponseData(HttpStatus.INTERNAL_SERVER_ERROR, e.response, 'error');
        }
    }
}
