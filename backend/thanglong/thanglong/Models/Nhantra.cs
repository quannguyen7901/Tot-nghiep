using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Nhantra
    {
        public int Id { get; set; }
        public int? IdTp { get; set; }
        public DateTime? Ngaynhan { get; set; }
        public DateTime? Ngaytra { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
