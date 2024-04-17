@extends('layouts.master')
@section('content')
    <nav class="page-breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('get.home') }}">Trang chủ</a></li>
            <li class="breadcrumb-item active" aria-current="page">Cập nhật</li>
        </ol>
    </nav>
    <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <form class="forms-sample" method="POST">
                        @csrf
                        <div class="mb-3">
                            <label for="exampleInputUsername1" class="form-label">Nội dung trả lời</label>
                            <textarea name="c_content" id="" cols="30" rows="3" class="form-control" autocomplete="off" placeholder="nội dung trả lời ..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary me-2">Luu dữ liệu</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
@stop
