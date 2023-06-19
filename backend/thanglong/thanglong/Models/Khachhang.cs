using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Khachhang
    {
        public int Id { get; set; }
        public string Hoten { get; set; }
        public string Quequan { get; set; }
        public int? Sdt { get; set; }
        public string Scccd { get; set; }
        public string Email { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
