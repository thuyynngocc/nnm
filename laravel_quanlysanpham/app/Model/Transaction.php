<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Transaction extends Model
{
    public $guarded = [''];
    protected $table = 'transactions';

    const STATUS_DEFAULT = 1;
    const STATUS_WAITING = 2; // chờ xử lý
    const STATUS_PICKING_UP_GOODS = 3; // Chờ lấy hàng
    const STATUS_DELIVERING = 4; // đang giao
    const STATUS_FINISH = 5; // hoàn thành
    const STATUS_CANCEL = 6; // chuỷ đơn

    protected $setStatus = [
        self::STATUS_DEFAULT => [
            'name' => 'Khởi tạo',
            'class' => '',
        ],
        self::STATUS_WAITING => [
            'name' => 'Chờ xử lý',
            'class' => '',
        ],
        self::STATUS_PICKING_UP_GOODS => [
            'name' => 'Chờ lấy hàng',
            'class' => '',
        ],
        self::STATUS_DELIVERING => [
            'name' => 'Đang giao',
            'class' => '',
        ],
        self::STATUS_FINISH => [
            'name' => 'Hoàn thành',
            'class' => '',
        ],
        self::STATUS_CANCEL => [
            'name' => 'Huỷ đơn',
            'class' => '',
        ],
    ];

    public function getStatus()
    {
        return Arr::get($this->setStatus, $this->t_status,[]);
    }

    public function getConfigStatus()
    {
        return $this->setStatus;
    }
}
