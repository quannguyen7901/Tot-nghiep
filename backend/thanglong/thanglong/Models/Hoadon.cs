using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Hoadon
    {
        public int Id { get; set; }
        public int? IdTkkh { get; set; }
        public int? Coc { get; set; }
        public int? Tonghoadon { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
