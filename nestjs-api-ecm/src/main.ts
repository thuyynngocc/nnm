import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ExceptionsLoggerFilter } from "./utils/exceptionsLogger.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule); // Tạo một NestJS app bằng AppModule
    const configService = app.get(ConfigService); // Lấy ConfigService từ app

    // Tạo một cấu hình Swagger document để tài liệu hóa API
    const swaggerConfig = new DocumentBuilder()
        .setTitle('API with NestJS')
        .setDescription('API developed throughout the API with NestJS course')
        .setVersion('1.0')
        .build();

    app.setGlobalPrefix('api'); // Đặt tiền tố toàn cục cho API là "/api"
    const document = SwaggerModule.createDocument(app, swaggerConfig); // Tạo một document Swagger
    SwaggerModule.setup('api', app, document); // Thiết lập Swagger UI trên "/api"

    const { httpAdapter } = app.get(HttpAdapterHost); // Lấy HttpAdapterHost từ app
    app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter)); // Sử dụng một bộ lọc toàn cục để ghi nhật ký các ngoại lệ xảy ra trong API

    app.useGlobalPipes(new ValidationPipe()); // Sử dụng một ống dẫn toàn cục để kiểm tra và xác thực dữ liệu gửi đến API

    app.enableCors(); // Cho phép CORS

    const port = configService.get('PORT') ?? 3000; // Lấy cổng được cấu hình hoặc sử dụng cổng mặc định (3000)
    await app.listen(port); // Chạy ứng dụng trên cổng đã cấu hình
}

bootstrap(); // Gọi hàm bootstrap() để khởi động ứng dụng
