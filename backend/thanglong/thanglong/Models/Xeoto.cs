using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Xeoto
    {
        public int Id { get; set; }
        public int? IdDv { get; set; }
        public string Tenxe { get; set; }
        public string Mota { get; set; }
        public int? Gia { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
