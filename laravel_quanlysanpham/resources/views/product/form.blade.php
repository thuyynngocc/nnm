<form method="POST" autocomplete="off">
    @csrf
    <div class="row">
        <div class="col-sm-6">
            <div class="mb-3">
                <label class="form-label">Tên sản phẩm</label>
                <input type="text" name="pro_name" required class="form-control" placeholder="Tên sản phẩm" value="{{ old('pro_name', $product->pro_name ?? '') }}">
            </div>
        </div><!-- Col -->
        <div class="col-sm-6">
            <div class="mb-3">
                <label class="form-label">Danh mục</label>
                <select name="pro_category_id" class="form-control select2" id="" required>
                    <option value="">Mời bạn chọn danh mục</option>
                    @foreach($categories as $item)
                        <option value="{{ $item->id }}" {{ ($product->pro_category_id ?? 0) == $item->id ? "selected" : "" }}>
                            @php  $str = '' @endphp
                            @for($i = 1 ; $i <= $item->level; $i ++)
                                @php $str .= "-- "  @endphp
                            @endfor
                            {{ $str  }} {{ $item->c_name }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div><!-- Col -->
        <div class="col-sm-6">
            <div class="mb-3">
                <label class="form-label">Đại lý</label>
                <select name="pro_dealer_id" class="form-control select2" id="" required>
                    <option value="0">Mời bạn chọn đại lý</option>
                    @foreach($dealers as $item)
                        <option value="{{ $item->id }}" {{ ($product->pro_dealer_id ?? 0) == $item->id ? "selected" : "" }}>
                           {{ $item->name }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div><!-- Col -->
    </div><!-- Row -->
    <div class="row">
        <div class="col-sm-3">
            <div class="mb-3">
                <label class="form-label">Giá</label>
                <input type="number" class="form-control" name="pro_price"  placeholder="7000000" value="{{ $product->pro_price ?? "0" }}">
            </div>
        </div><!-- Col -->
        <div class="col-sm-3">
            <div class="mb-3">
                <label class="form-label">Số lượng</label>
                <input type="number" class="form-control" name="pro_number"  placeholder="5" value="{{ $product->pro_number ?? "0" }}">
            </div>
        </div><!-- Col -->

        <div class="col-sm-2">
            <div class="mb-3">
                <label class="form-label">Phân loại giảm giá</label>
                <input type="text" class="form-control" name="pro_discount_type"  placeholder="5" value="{{ $product->pro_discount_type ?? "percent" }}">
            </div>
        </div><!-- Col -->
        <div class="col-sm-2">
            <div class="mb-3">
                <label class="form-label">Giá trị discount</label>
                <input type="text" class="form-control" name="pro_discount_value"  placeholder="5" value="{{ $product->pro_discount_value ?? 0 }}">
            </div>
        </div><!-- Col -->
        <div class="col-sm-2">
            <div class="mb-3">
                <label class="form-label">Số ngày bảo hành</label>
                <input type="text" class="form-control" name="pro_warranty_date"  placeholder="5" value="{{ $product->pro_warranty_date ?? 0 }}">
            </div>
        </div><!-- Col -->
    </div><!-- Row -->
    <div class="row">
        <div class="col-sm-12">
            <div class="mb-3">
                <label for="exampleInputUsername1" class="form-label">Link ảnh</label>
                <input type="text" class="form-control" name="pro_avatar" value="{{ old('pro_avatar', $product->pro_avatar ?? "") }}" id="exampleInputUsername1" autocomplete="off" placeholder="Link ảnh">
            </div>
        </div><!-- Col -->
        <div class="col-sm-12">
            <div class="mb-3">
                <label class="form-label">Mô tả ngắn</label>
                <textarea name="pro_description" id="" class="form-control" cols="30" rows="2">{{ $product->pro_description ?? "" }}</textarea>
            </div>
        </div><!-- Col -->
        <div class="col-sm-12">
            <div class="mb-3">
                <label class="form-label">Nội dung sản phẩm</label>
                <textarea name="pro_content" id="content" class="form-control" cols="30" rows="2">{{ $product->pro_content ?? "" }}</textarea>
            </div>
        </div><!-- Col -->
    </div><!-- Row -->
    <button type="submit" class="btn btn-primary me-2">Luu dữ liệu</button>
</form>
<script src="https://cdn.ckeditor.com/ckeditor5/35.3.2/classic/ckeditor.js"></script>
<style>
    .ck-content {
        height: 200px !important;
    }
</style>
<script>
    ClassicEditor
        .create( document.querySelector( '#content',{
            height: 500,
        } ) )
        .then( editor => {
            console.log( editor );
            editor.ui.view.editable.element.style.height = '500px';
        } )
        .catch( error => {
            console.error( error );
        } );
</script>
