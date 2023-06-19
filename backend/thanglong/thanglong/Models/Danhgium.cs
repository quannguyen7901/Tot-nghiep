using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Danhgium
    {
        public int Id { get; set; }
        public int? IdTkkh { get; set; }
        public string Noidung { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
