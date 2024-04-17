<form method="POST" autocomplete="off">
    @csrf
    <div class="row">
        <div class="col-sm-6">
            <div class="mb-3">
                <label class="form-label">Cập nhật trạng thái đơn</label>
                <select name="t_status" class="form-control select2" id="" required>
                    <option value="0">Mời bạn chọn</option>
                    @foreach($status ?? [] as $key => $item)
                        <option value="{{ $key }}" {{ ($transaction->t_status ?? 0) == $key ? "selected" : "" }}>
                           {{ $item['name'] }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div><!-- Col -->
    </div><!-- Row -->
    <button type="submit" class="btn btn-primary me-2">Luu dữ liệu</button>
</form>
