####  Xử lý phần banner thế nào ? 
- Các phần banner trên các trang thương mại điển tự luôn được lưu bằng dữ liệu trong database thay vì hard-code. 
- Cấu trúc dữ liệu banner cơ bản trong DB thường có:
| Trường          | Ý nghĩa                               |
| --------------- | ------------------------------------- |
| `id`            | ID duy nhất của banner                |
| `title`         | Tiêu đề banner                        |
| `image_url`     | Link ảnh hiển thị                     |
| `link_url`      | Link khi user nhấn vào                |
| `start_date`    | Ngày bắt đầu hiển thị                 |
| `end_date`      | Ngày kết thúc                         |
| `position`      | Vị trí trên trang (home, category...) |
| `priority`      | Thứ tự ưu tiên hiển thị               |
| `audience_tags` | Đối tượng mục tiêu (ví dụ: nam, GenZ) |
| `is_active`     | Đang bật hay tắt                      |


#### Xử lý phần flash sale nhanh sản phẩm thế nào ? 
- Admin set thời gian + sản phẩm sale -> lưu vào db
- Set cron job đến giờ sẽ pull sản phảm Flash sale lên Redis

#### Làm sao để gán giá trị giảm giá ? 
- Có thể tạo 1 bảng flash sale riêng, khi đến khung giờ sale thì sẽ hiển thị sản phẩm với giá sale
```bash
flash_sale_items (
  id,
  product_id,
  sale_price,
  start_time,
  end_time,
  quantity_limit,
  campaign_id,
  is_active
)
```

#### Lám sao để gán mã giảm giá cho sản phẩm thuộc catgory bất kì: 
- Tạo bảng coupons (mã giảm giá) và bảng category liên kết tới bảng coupons. 1 - N 
- Khi admin tạo coupons thì sẽ chỉ định rõ category

####  Một số mã giảm giá chỉ được dùng 1 lần duy nhất mỗi tài khoản. 
- Tạo bảng coupon_usage_logs(user_id, coupon_id, order_id, used_at)
  - Trước khi cho apply coupon:
  - Check nếu exists trong log → không cho dùng nữa.

#### Flash Sale giới hạn 1 sản phẩm/người: 
- Trước khi xử lý đơn hàng flash sale:
  - Check trong bảng orders xem user này đã mua sản phẩm đó chưa trong khung giờ flash sale.
  - Nếu rồi → reject, hiển thị thông báo giới hạn.