<?php

namespace App\Http\Controllers;

use App\Model\Category;
use App\Model\Dealer;
use App\Model\Product;
use App\Model\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::whereRaw(1);
        if ($id = $request->id) $transactions->where('id', $id);
        if ($name = $request->n) $transactions->where('t_name', 'like', '%' . $name . '%');
        if ($phone = $request->phone) $transactions->where('t_phone', 'like', '%' . $phone . '%');

        $transactions = $transactions->orderByDesc('id')->paginate(20);
        $viewData     = [
            'transactions' => $transactions,
            'query'        => $request->query()
        ];

        return view('transaction.index', $viewData);
    }

    public function create()
    {
        $categories = $this->getCategoriesSort();
        $dealers    = Dealer::all();
        return view('product.create', compact('categories', 'dealers'));
    }

    public function store(Request $request)
    {
        $data               = $request->except('_token', 'attribute', 'keywords', 'file', 'pro_sale', 'pro_file');
        $data['pro_slug']   = Str::slug($request->pro_name);
        $data['created_at'] = Carbon::now();

        $id = Product::insertGetId($data);
        return redirect()->route('product.index');
    }

    public function edit($id)
    {
        $transaction = Transaction::findOrFail($id);
        $status      = (new Transaction())->getConfigStatus();

        $viewData = [
            'transaction' => $transaction,
            'status'      => $status
        ];

        return view('transaction.update', $viewData);
    }

    public function update(Request $request, $id)
    {
        $transaction            = Transaction::find($id);
        $transaction->t_status = $request->t_status;
        $transaction->updated_at = Carbon::now();
        $transaction->save();

        return redirect()->route('transaction.index');
    }

    public function delete($id)
    {
        $transaction = Transaction::find($id);
        if ($transaction) {
            DB::table('orders')->where('od_transaction_id', $id)->delete();
            $transaction->delete();
        }

        return redirect()->back();
    }
}
