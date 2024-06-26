import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import CreateTransactionDto from "./dto/CreateTransaction.dto";
import { TransactionService } from "./transaction.service";
import { ResponseData } from "../../common/response/ResponseData";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { Paging } from "../../common/response/Paging";
import { Request } from "express";
import UpdateTransactionDto from "./dto/UpdateTransaction.dto";
import { RealIP } from "nestjs-real-ip";

@Controller('transaction')
@ApiTags('Transaction')
export class TransactionController {
    constructor(
        private transactionService: TransactionService
    ) { }

    // Phương thức lấy danh sách các giao dịch của một người dùng cụ thể
    @UseGuards(JwtAuthGuard)
    @Get('lists')
    async getListsTransaction(
        @Req() req: Request
    ) {
        const paging = {
            page: req.query.page || 1,
            page_size: req.query.page_size || 10,
        }
        console.log('----------- req.user: ', req.user);
        const user: any = req.user;
        const filters = {
            hot: req.query.hot || "",
            status: req.query.status || "",
            sort: req.query.sort || "",
            category_id: req.query.category_id || "",
            user_id: user.id
        }

        const response = await this.transactionService.getListsTransaction(paging, filters);
        const [data, total] = response;
        const pagingData = new Paging(Number(paging.page), Number(paging.page_size), total);

        return new ResponseData(HttpStatus.OK, data, "success", pagingData);
    }

    // Phương thức tạo mới một giao dịch
    @Post('create')
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() formData: CreateTransactionDto,
        @Req() req: Request,
        @RealIP() ip: string
    ) {
        try {
            const user: any = req.user;
            const data = await this.transactionService.create(formData, parseInt(user.id), ip);
            const [transaction, link] = data;
            return new ResponseData(HttpStatus.OK, {
                'transaction': transaction,
                'link': link
            }, 'success');
        } catch (e) {
            console.log('----------ERROR: TransactionController@create => ', e);
            return new ResponseData(HttpStatus.INTERNAL_SERVER_ERROR, e.response, 'error');
        }
    }

    // Phương thức cập nhật thông tin của một giao dịch
    @Put('update/:id')
    @UseGuards(JwtAuthGuard)
    async update(
        @Body() formData: UpdateTransactionDto,
        @Req() req: Request,
        @Param('id') id: number
    ) {
        const user: any = req.user;
        const data = await this.transactionService.update(formData, parseInt(user.id), id);
        return new ResponseData(HttpStatus.OK, data);
    }

    // Phương thức xóa một giao dịch
    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    async delete(
        @Req() req: Request,
        @Param('id') id: number
    ) {
        const user: any = req.user;
        const data = await this.transactionService.deleteTransaction(parseInt(user.id), id);
        return new ResponseData(HttpStatus.OK, data);
    }

    // Phương thức lấy thông tin chi tiết của một giao dịch dựa trên id
    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const data = await this.transactionService.show(id);
            return new ResponseData(HttpStatus.OK, data);
        } catch (e) {
            console.log('----------ERROR: TransactionController@show => ', e);
            return new ResponseData(HttpStatus.INTERNAL_SERVER_ERROR, e.response, 'error');
        }
    }
    //lấy trạng thái đơn hàng
    @Get('config')
    async getConfig() {
        try {
            const data = {
                "status": [
                    {
                        'value': 1,
                        'name': 'Khởi tạo'
                    },
                    {
                        'value': 2,
                        'name': 'Chờ xử lý'
                    },
                    {
                        'value': 3,
                        'name': 'Chờ lấy hàng'
                    },
                ]
            }
            return new ResponseData(HttpStatus.OK, data);
        } catch (e) {
            console.log('----------ERROR: TransactionController@getConfig => ', e);
            return new ResponseData(HttpStatus.INTERNAL_SERVER_ERROR, e.response, 'error');
        }
    }
}
