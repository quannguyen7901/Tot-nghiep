﻿using System;
using System.Collections.Generic;

#nullable disable

namespace thanglong.Models
{
    public partial class Anhmonan
    {
        public int Id { get; set; }
        public int? IdMa { get; set; }
        public string Duongdan { get; set; }
        public DateTime? Ngaytao { get; set; }
        public DateTime? Ngaysua { get; set; }
        public int? Trangthai { get; set; }
    }
}
