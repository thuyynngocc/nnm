import {
    Controller,
    UseInterceptors,
    StreamableFile,
    UploadedFile,
    Post,
    Res
} from "@nestjs/common";
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import LocalFilesInterceptor from "../common/helpers/localFiles.interceptor";
import { ApiTags } from "@nestjs/swagger";

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
// Xác định route để upload file
    @Post('file')
    @UseInterceptors(LocalFilesInterceptor({
        fieldName: 'file', // Tên của trường nhập tệp trong biểu mẫu
        path: '/images' //Thư mục lưu file upload
    }))
    // Xác định một phương thức để xử lý tệp đã tải lên
    uploadFile(
        @UploadedFile() file: Express.Multer.File, // tệp đã tải
        @Res({ passthrough: true }) response: Response // http phản hồi
    ) {
        // Tạo luồng đọc từ đường dẫn tệp đã tải lên
        const stream = createReadStream(join(process.cwd(), file.path));
        // Đặt tiêu đề phản hồi với tên tệp và loại 
        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': file.mimetype
        });
        // Trả về luồng tệp dưới dạng đối tượng StreamableFile
        return new StreamableFile(stream);
    }
}
