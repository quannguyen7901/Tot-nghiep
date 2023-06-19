using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Phong
    {
        public int Id { get; set; }
        public int? IdLp { get; set; }
        public string Sophong { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
