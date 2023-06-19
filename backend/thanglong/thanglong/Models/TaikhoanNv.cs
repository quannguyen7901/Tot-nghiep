using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class TaikhoanNv
    {
        public int Id { get; set; }
        public int? IdNv { get; set; }
        public string Taikhoan { get; set; }
        public string Matkhau { get; set; }
        public int? Quyen { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
