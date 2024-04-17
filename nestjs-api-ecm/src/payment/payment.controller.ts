import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller('payment')
@ApiTags('Payment Online')
export class PaymentController {
    // Phương thức xử lý POST request đến đường dẫn /payment/send-service
    @Post('send-service')
    async pushPayment(
        // Lấy dữ liệu được gửi lên bằng phương thức POST
        @Body() paymentData: any,
        // Lấy thông tin request
        @Request() req,
    )
    {
        // Import module định dạng ngày tháng
        var dateFormat = require('dateformat');

        // Khai báo các tham số cần thiết để thực hiện thanh toán qua VNPAY
        var tmnCode = '3RDGQAX3'; // Mã website đăng ký trên VNPAY  Q58IN4ZE  3RDGQAX3
        var secretKey = 'PMSBQTYJIQLJILQTWHKAESOMMTXYHFHE'; // Khóa bí mật do VNPAY cung cấp   YRAXVPRGTUWRCVTWMWRDXUNQZREZVTCM   PMSBQTYJIQLJILQTWHKAESOMMTXYHFHE
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // Đường dẫn thanh toán của VNPAY   https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
        var returnUrl = 'http://localhost:3000/cart'; // Đường dẫn trả về sau khi thanh toán thành công

       // Lấy thời gian hiện tại
       var date = new Date();

       // Định dạng ngày tháng theo định dạng yyyyMMddHHmmss
       var createDate = dateFormat(date, 'yyyymmddHHmmss');
       // Tạo mã đơn hàng
       var orderId = dateFormat(date, 'HHmmss');
       var amount = req.body.amount; // Số tiền thanh toán
       var bankCode = req.body.bankCode; // Mã ngân hàng thanh toán

       var orderInfo = req.body.orderDescription; // Mô tả đơn hàng
       var orderType = req.body.orderType; // Loại đơn hàng
       var locale = req.body.language; // Ngôn ngữ trang thanh toán
       if(locale === null || locale === ''){
           locale = 'vn'; // Nếu không được chọn ngôn ngữ thì mặc định là tiếng Việt
       }
       var currCode = 'VND'; // giá trị mặc định của tiền tệ là đồng Việt Nam
       var vnp_Params = {}; // Khai báo một đối tượng rỗng để chứa các tham số thanh toán
       
       // Các tham số thanh toán được định nghĩa như sau:
       vnp_Params['vnp_Version'] = '2.1.0';
       vnp_Params['vnp_Command'] = 'pay';
       vnp_Params['vnp_TmnCode'] = tmnCode;
       vnp_Params['vnp_Locale'] = locale;
       vnp_Params['vnp_CurrCode'] = currCode;
       vnp_Params['vnp_TxnRef'] = orderId;
       vnp_Params['vnp_OrderInfo'] = orderInfo;
       vnp_Params['vnp_OrderType'] = orderType;
       vnp_Params['vnp_Amount'] = amount * 100; // số tiền phải nhân với 100 để đưa về đơn vị cents
       vnp_Params['vnp_ReturnUrl'] = returnUrl;
       vnp_Params['vnp_IpAddr'] = req.ip;
       vnp_Params['vnp_CreateDate'] = createDate;
       if(bankCode !== null && bankCode !== ''){
           vnp_Params['vnp_BankCode'] = bankCode;
       }
       
       // Sắp xếp đối tượng vnp_Params theo thứ tự từ a-z để tạo chữ ký bảo mật
       vnp_Params = await this.sortObject(vnp_Params);
       
       // Biến đổi vnp_Params thành chuỗi theo định dạng x-www-form-urlencoded (không mã hóa giá trị)
       var querystring = require('qs');
       var signData = querystring.stringify(vnp_Params, { encode: false });
       
       // Tạo chữ ký bảo mật bằng thuật toán mã hóa sha512 và secretKey được cung cấp bởi VNPAY
       var crypto = require("crypto");
       var hmac = crypto.createHmac("sha512", secretKey);
       var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
       
       // Thêm chữ ký bảo mật vào vnp_Params
       vnp_Params['vnp_SecureHash'] = signed;
       
       // Tạo URL thanh toán bằng cách kết hợp chuỗi các tham số trong vnp_Params với đường dẫn cụ thể cho từng môi trường VNPAY
       vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
       
       // Trả về URL thanh toán để sử dụng trong quá trình thanh toán trên VNPAY.
       return vnpUrl;
    }       
// sắp xếp các thuộc tính của vnp_params
    async sortObject(obJectParams: any)
    {
        let sortable = [];
        for (var vehicle in obJectParams) {
            sortable.push([vehicle, obJectParams[vehicle]]);
        }

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        return sortable;
    }
}
