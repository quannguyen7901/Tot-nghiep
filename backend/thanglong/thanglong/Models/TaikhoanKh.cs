using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class TaikhoanKh
    {
        public int Id { get; set; }
        public int? IdKh { get; set; }
        public string Taikhoan { get; set; }
        public string Matkhau { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
