using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Dichvu
    {
        public int Id { get; set; }
        public string Tendv { get; set; }
        public string Ghichu { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
