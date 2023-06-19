using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Thuephong
    {
        public int Id { get; set; }
        public int? IdTkkh { get; set; }
        public int? IdP { get; set; }
        public DateTime? Ngaybd { get; set; }
        public DateTime? Ngaykt { get; set; }
        public string Ghichu { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
