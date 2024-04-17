import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import OrderEntity from "../../entities/order.entity";

@Module({
    // Nhập OrderEntity cho tính năng trong mô-đun
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity
        ])
    ],
    // Đăng ký OrderController để xử lý các yêu cầu HTTP liên quan đến đơn hàng
    controllers: [OrderController],
    // Đăng ký OrderService làm nhà cung cấp cho mô-đun
    providers: [OrderService],
    // Xuất OrderService để nó có thể được sử dụng trong các mô-đun khác nhập dịch vụ này
    exports: [OrderService]
})
export class OrderModule { }
