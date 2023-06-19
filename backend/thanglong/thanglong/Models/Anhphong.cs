using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Anhphong
    {
        public int Id { get; set; }
        public int? IdP { get; set; }
        public string Duongdan { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
