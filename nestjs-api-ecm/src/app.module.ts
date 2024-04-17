import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BackendModule } from './backend/backend.module';
import { FrontendModule } from './frontend/frontend.module';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import * as Joi from '@hapi/joi';
import { ExceptionsLoggerFilter } from "./utils/exceptionsLogger.filter";
import { APP_FILTER } from "@nestjs/core";
import { PaymentModule } from './payment/payment.module';
import { HttpModule } from "@nestjs/axios";
import { ServiceCore } from "./curl/serviceCore";

@Module({
    // Import các module được sử dụng trong ứng dụng
    imports: [
        // Đăng ký module HTTP để sử dụng các API HTTP khác
        HttpModule.registerAsync({
            useFactory: async () => ({
                timeout: 120000,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        // Module chứa các API cho phía Backend
        BackendModule,
        // Module chứa các API cho phía Frontend
        FrontendModule,
        // Module cho kết nối với cơ sở dữ liệu
        DatabaseModule,
        // Module cấu hình cho ứng dụng
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                MYSQL_HOST: Joi.string().required(),
                MYSQL_PORT: Joi.number().required(),
                MYSQL_USER: Joi.string().required(),
                MYSQL_PASSWORD: Joi.string().required(),
                MYSQL_DB: Joi.string().required(),
                PORT: Joi.number(),
                UPLOADED_FILES_DESTINATION: Joi.string().required()
            }),
        }),
        // Module cho xác thực người dùng
        AuthModule,
        // Module cho tải lên tập tin
        UploadModule,
        // Module cho thanh toán
        PaymentModule,
    ],
    // Khai báo các controllers sử dụng trong ứng dụng
    controllers: [AppController],
    // Khai báo các providers sử dụng trong ứng dụng
    providers: [
        // Cung cấp một bộ lọc để bắt lỗi ngoại lệ
        {
            provide: APP_FILTER,
            useClass: ExceptionsLoggerFilter,
        },
    ]
})
export class AppModule {}
