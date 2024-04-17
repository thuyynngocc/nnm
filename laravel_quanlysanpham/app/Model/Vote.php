<?php

namespace App\Model;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $table = 'votes';
    protected $guarded = [''];

    public function product()
    {
        return $this->belongsTo(Product::class,'v_product_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class,'v_user_id');
    }
}
