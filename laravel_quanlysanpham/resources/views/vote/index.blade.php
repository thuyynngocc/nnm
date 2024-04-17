@extends('layouts.master')
@section('content')
    <nav class="page-breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('get.home') }}">Trang chủ</a></li>
            <li class="breadcrumb-item active" aria-current="page">Danh sách</li>
        </ol>
    </nav>
    <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive" style="margin-top: 20px;">
                        <table class="" id="myTable">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Ảnh SP</th>
                                <th style="width: 250px;">Nội dung</th>
                                <th>Người vote</th>
                                <th>Create</th>
                                <th>#</th>
                            </tr>
                            </thead>
                            <tbody>
                                @foreach($votes ?? [] as $key => $item)
                                <tr style="margin-bottom: 10px">
                                    <td>{{ ($key + 1) }}</td>
                                    <td class="py-1">
                                        <img src="{{ $item->product->pro_avatar ?? "" }}" class="img img-fluid img" style="object-fit: cover;width: 50px"
                                             onerror="this.onerror=null;this.src='{{ asset("image/placeholder.jpg") }}';"  alt="image">
                                    </td>
                                    <td>{{ $item->v_content }}</td>
                                    <td><a href="">{{ $item->user->name ?? "[N\A]" }}</a></td>
                                    <td>{{ $item->created_at }}</td>
                                    <td>
                                        <a href="{{ route('vote.delete', $item->id) }}" class="btn-text text-danger"><i class="btn-icon-prepend" data-feather="trash"></i> </a>
                                        <a href="{{ route('vote.comment_reply', $item->id) }}" class="btn-text text-success"><i class="btn-icon-prepend" data-feather="edit"></i> Rep </a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
@section('script')
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.2/css/jquery.dataTables.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.2/js/jquery.dataTables.min.js"></script>
    <script>
        $(document).ready( function () {
            $('#myTable').DataTable();
        } );
    </script>
@stop
