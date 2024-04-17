<?php

namespace App\Http\Controllers;

use App\Model\Category;
use App\Model\Comment;
use App\Model\Vote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VoteController extends Controller
{
    public function index(Request $request)
    {
        $votes = Vote::with('product:id,pro_name,pro_avatar','user:id,name');
        if ($request->n)
            $votes->where('c_name','like', "%".$request->n."%");

        $votes = $votes->get();

        $viewData = [
            'votes' => $votes
        ];

        return view('vote.index', $viewData);
    }

    public function create()
    {
        $categories = $this->getCategoriesSort();
        return view('category.create',compact('categories'));
    }

    public function store(Request $request)
    {
        $data               = $request->except('_token');
        $data['c_slug']     = Str::slug($request->c_name);
        $data['created_at'] = Carbon::now();

        $id = Category::insertGetId($data);
        return redirect()->route('category.index');
    }

    public function replyVote($voteID)
    {
        $vote = Vote::find($voteID);
        return view('vote.reply', compact('vote','voteID'));
    }

    public function updateReply($voteID, Request $request)
    {
        $vote = Vote::find($voteID);
        $comment = new Comment();
        $comment->c_name = get_data_user('admins','name');
        $comment->c_vote_id = $voteID;
        $comment->c_product_id = $vote->v_product_id;
        $comment->c_content = $request->c_content;
        $comment->created_at = new Carbon();
        $comment->save();

        return redirect()->route('vote.index');
    }

    public function update(Request $request, $id)
    {
        $category           = Category::find($id);
        $data               = $request->except('_token');
        $data['c_slug']     = Str::slug($request->c_name);
        $data['updated_at'] = Carbon::now();

        $category->update($data);
        return redirect()->route('category.index');
    }

    public function delete($id)
    {
        $vote = Vote::find($id);
        if ($vote) $vote->delete();

        return redirect()->back();
    }
}
