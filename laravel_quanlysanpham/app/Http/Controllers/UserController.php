<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::whereRaw(1);

        $users = $users->orderByDesc('id')->paginate(10);
        $viewData = [
            'users'   => $users,
            'query'      => $request->query()
        ];

        return view('user.index', $viewData);
    }

    public function delete($id)
    {
        $user =  User::find($id);
        if ($user)  $user->delete();
        return redirect()->back();
    }
}
