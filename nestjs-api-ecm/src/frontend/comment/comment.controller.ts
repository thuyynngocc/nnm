import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { Paging } from "../../common/response/Paging";
import { ResponseData } from "../../common/response/ResponseData";
import { CommentService } from "./comment.service";
import CreateVoteDto from "../vote/dto/CreateVote.dto";
import UpdateVoteDto from "../vote/dto/UpdateVote.dto";
import { ApiTags } from "@nestjs/swagger";
import CreateCommentDto from "./dto/CreateComment.dto";
import UpdateCommentDto from "./dto/UpdateComment.dto";

@Controller('comment') 
@ApiTags("Comment") 
export class CommentController {
    constructor(private commentService: CommentService) { }

    @UseGuards(JwtAuthGuard) //Áp dụng JwtAuth
    @Get('lists') 
    async getListsComments(
        @Request() req, //Nhận request từ client
    ) {
        const { id, user } = req.user; //Lấy thông tin user từ JWT payload
        const filters = { //Định nghĩa các bộ lọc cho danh sách comment
            status: req.query.status || "", //Trạng thái của comment
            sort: req.query.sort || "", //Thứ tự sắp xếp của comment
            page: req.query.page || 1, //Trang hiện tại của danh sách comment
            page_size: req.query.page_size || 10, //Số lượng phần tử trên mỗi trang
        }
        const response = await this.commentService.getListsComments(id, filters); //Gọi service để lấy danh sách comment
        const [data, total] = response; //Dữ liệu trả về từ service gồm mảng các comment và tổng số comment
        const pagingData = new Paging(Number(filters.page), Number(filters.page_size), total); //Tạo đối tượng phân trang

        return new ResponseData(HttpStatus.OK, data, "success", pagingData); //Trả về response với dữ liệu và đối tượng phân trang
    }

    @Post('store')
    async store(
        @Body() commentDto: CreateCommentDto //Nhận dữ liệu từ client để tạo mới comment
    ) {
        const data = await this.commentService.store(commentDto); //Gọi service để tạo mới comment
        return new ResponseData(200, data); //Trả dữ liệu mới được tạo
    }

    @Get('show/:id')
    async show(
        @Param('id', ParseIntPipe) id: number //Nhận id của comment từ đường dẫn
    ) {
        const data = await this.commentService.show(id); //lấy thông tin của comment với id tương ứng
        return new ResponseData(200, data); //Trả về response với dữ liệu của comment
    }

    @Put('update/:id')
    async update(
        @Body() commentDto: UpdateCommentDto, //Nhận dữ liệu từ client để cập nhật comment
        @Param('id') id: number
    ) {
        const response = await this.commentService.update(id, commentDto); //cập nhật lại
        return new ResponseData(200, response);
    }
}
