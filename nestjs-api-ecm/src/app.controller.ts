import { Controller, Get } from '@nestjs/common';  
import { ApiTags } from "@nestjs/swagger"; 

@Controller()  // chỉ định class là controller
@ApiTags('HOME')  // định nghĩa các tag cho Swagger API docs
export class AppController {
    @Get()  // chỉ định HTTP method là GET
    getHello(): string {  // Tạo một HTTP handler để xử lý GET request
        return "API ECM";  // Trả về chuỗi "API ECM" cho client khi gọi đến endpoint "/"
    }
}
