<?php

namespace App\Http\Controllers;

use App\Service\ResponseService;
use Illuminate\Http\Request;

class ApiPaymentController extends Controller
{
    private $vnp_TmnCode = "3RDGQAX3"; //Mã website tại VNPAY
    private $vnp_HashSecret = "PMSBQTYJIQLJILQTWHKAESOMMTXYHFHE"; //Chuỗi bí mật
    private $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    private $vnp_Returnurl = "http://reactjs.123code.net";

    public function genLink(Request $request)
    {
        try {
            // Sau khi xử lý xong bắt đầu xử lý online
            error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);

            $startTime     = date("YmdHis");
            $expire        = date('YmdHis', strtotime('+50 minutes', strtotime($startTime)));
            $money         = $request->total;
            $transactionID = $request->transaction_id;

            $inputData = array(
                "vnp_Version"    => "2.1.0",
                "vnp_TmnCode"    => $this->vnp_TmnCode,
                "vnp_Amount"     => $money * 100,
                "vnp_Command"    => "pay",
                "vnp_CreateDate" => date('YmdHis'),
                "vnp_CurrCode"   => "VND",
                "vnp_IpAddr"     => $_SERVER['REMOTE_ADDR'],
                "vnp_Locale"     => "vn",
                "vnp_OrderInfo"  => "Thanh toan GD:" . $transactionID,
                "vnp_OrderType"  => "other",
                "vnp_ReturnUrl"  => $this->vnp_Returnurl,
                "vnp_TxnRef"     => $transactionID,
//                "vnp_ExpireDate" => $expire
            );

            if (isset($vnp_BankCode) && $vnp_BankCode != "") {
                $inputData['vnp_BankCode'] = $vnp_BankCode;
            }

            ksort($inputData);
            $query    = "";
            $i        = 0;
            $hashdata = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashdata .= urlencode($key) . "=" . urlencode($value);
                    $i        = 1;
                }
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }

            $vnp_Url = $this->vnp_Url . "?" . $query;
            if (isset($this->vnp_HashSecret)) {
                $vnpSecureHash = hash_hmac('sha512', $hashdata, $this->vnp_HashSecret);
                $vnp_Url       .= 'vnp_SecureHash=' . $vnpSecureHash;
            }

            $data = [
                'link_payment' => $vnp_Url
            ];
            return response()->json(ResponseService::getSuccess($data));
        } catch (\Exception $exception) {
            return response()->json(ResponseService::getError([
                'data' => $request->all()
            ]));
        }
    }
}
