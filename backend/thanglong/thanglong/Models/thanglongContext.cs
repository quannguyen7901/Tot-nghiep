using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace thanglong.Models
{
    public partial class thanglongContext : DbContext
    {
        public thanglongContext()
        {
        }

        public thanglongContext(DbContextOptions<thanglongContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Anhmonan> Anhmonans { get; set; }
        public virtual DbSet<Anhphong> Anhphongs { get; set; }
        public virtual DbSet<Anhxeoto> Anhxeotos { get; set; }
        public virtual DbSet<Chitiethoadon> Chitiethoadons { get; set; }
        public virtual DbSet<Danhgium> Danhgia { get; set; }
        public virtual DbSet<Dichvu> Dichvus { get; set; }
        public virtual DbSet<Hoadon> Hoadons { get; set; }
        public virtual DbSet<Khachhang> Khachhangs { get; set; }
        public virtual DbSet<Loaiphong> Loaiphongs { get; set; }
        public virtual DbSet<Loaitintuc> Loaitintucs { get; set; }
        public virtual DbSet<Monan> Monans { get; set; }
        public virtual DbSet<Nhantra> Nhantras { get; set; }
        public virtual DbSet<Nhanvien> Nhanviens { get; set; }
        public virtual DbSet<Phong> Phongs { get; set; }
        public virtual DbSet<TaikhoanKh> TaikhoanKhs { get; set; }
        public virtual DbSet<TaikhoanNv> TaikhoanNvs { get; set; }
        public virtual DbSet<Thuephong> Thuephongs { get; set; }
        public virtual DbSet<Tintuc> Tintucs { get; set; }
        public virtual DbSet<Xeoto> Xeotos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer("Data Source=DESKTOP-SUIU8H8;Initial Catalog=thanglong;Integrated Security=True");
                optionsBuilder.UseSqlServer("workstation id=thanglong.mssql.somee.com;packet size=4096;user id=QuanNguyen_SQLLogin_1;pwd=cxoony22et;data source=thanglong.mssql.somee.com;persist security info=False;initial catalog=thanglong");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Anhmonan>(entity =>
            {
                entity.ToTable("anhmonan");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Duongdan)
                    .HasMaxLength(255)
                    .HasColumnName("duongdan");

                entity.Property(e => e.IdMa).HasColumnName("id_ma");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Anhphong>(entity =>
            {
                entity.ToTable("anhphong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Duongdan)
                    .HasMaxLength(255)
                    .HasColumnName("duongdan");

                entity.Property(e => e.IdP).HasColumnName("id_p");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Anhxeoto>(entity =>
            {
                entity.ToTable("anhxeoto");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Duongdan)
                    .HasMaxLength(255)
                    .HasColumnName("duongdan");

                entity.Property(e => e.IdXe).HasColumnName("id_xe");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Chitiethoadon>(entity =>
            {
                entity.ToTable("chitiethoadon");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Gia).HasColumnName("gia");

                entity.Property(e => e.IdDv).HasColumnName("id_dv");

                entity.Property(e => e.IdHd).HasColumnName("id_hd");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Danhgium>(entity =>
            {
                entity.ToTable("danhgia");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdTkkh).HasColumnName("id_tkkh");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Noidung)
                    .HasMaxLength(1000)
                    .HasColumnName("noidung");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Dichvu>(entity =>
            {
                entity.ToTable("dichvu");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ghichu)
                    .HasMaxLength(500)
                    .HasColumnName("ghichu");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Tendv)
                    .HasMaxLength(255)
                    .HasColumnName("tendv");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Hoadon>(entity =>
            {
                entity.ToTable("hoadon");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Coc).HasColumnName("coc");

                entity.Property(e => e.IdTkkh).HasColumnName("id_tkkh");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Tonghoadon).HasColumnName("tonghoadon");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Khachhang>(entity =>
            {
                entity.ToTable("khachhang");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Hoten)
                    .HasMaxLength(255)
                    .HasColumnName("hoten");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Quequan)
                    .HasMaxLength(255)
                    .HasColumnName("quequan");

                entity.Property(e => e.Scccd)
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .HasColumnName("scccd");

                entity.Property(e => e.Sdt).HasColumnName("sdt");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Loaiphong>(entity =>
            {
                entity.ToTable("loaiphong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Gia).HasColumnName("gia");

                entity.Property(e => e.Mota)
                    .HasMaxLength(255)
                    .HasColumnName("mota");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Tenloai)
                    .HasMaxLength(255)
                    .HasColumnName("tenloai");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Loaitintuc>(entity =>
            {
                entity.ToTable("loaitintuc");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Mota)
                    .HasMaxLength(1000)
                    .HasColumnName("mota");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Ten)
                    .HasMaxLength(255)
                    .HasColumnName("ten");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Monan>(entity =>
            {
                entity.ToTable("monan");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Gia).HasColumnName("gia");

                entity.Property(e => e.IdDv).HasColumnName("id_dv");

                entity.Property(e => e.Mota)
                    .HasMaxLength(255)
                    .HasColumnName("mota");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Tenmon)
                    .HasMaxLength(255)
                    .HasColumnName("tenmon");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Nhantra>(entity =>
            {
                entity.ToTable("nhantra");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdTp).HasColumnName("id_tp");

                entity.Property(e => e.Ngaynhan)
                    .HasColumnType("date")
                    .HasColumnName("ngaynhan");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Ngaytra)
                    .HasColumnType("date")
                    .HasColumnName("ngaytra");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Nhanvien>(entity =>
            {
                entity.ToTable("nhanvien");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Chucvu)
                    .HasMaxLength(255)
                    .HasColumnName("chucvu");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Hoten)
                    .HasMaxLength(255)
                    .HasColumnName("hoten");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Quequan)
                    .HasMaxLength(255)
                    .HasColumnName("quequan");

                entity.Property(e => e.Scccd)
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .HasColumnName("scccd");

                entity.Property(e => e.Sdt).HasColumnName("sdt");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Phong>(entity =>
            {
                entity.ToTable("phong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdLp).HasColumnName("id_lp");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Sophong)
                    .HasMaxLength(255)
                    .HasColumnName("sophong");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<TaikhoanKh>(entity =>
            {
                entity.ToTable("taikhoan_kh");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdKh).HasColumnName("id_kh");

                entity.Property(e => e.Matkhau)
                    .HasMaxLength(255)
                    .HasColumnName("matkhau");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Taikhoan)
                    .HasMaxLength(255)
                    .HasColumnName("taikhoan");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<TaikhoanNv>(entity =>
            {
                entity.ToTable("taikhoan_nv");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdNv).HasColumnName("id_nv");

                entity.Property(e => e.Matkhau)
                    .HasMaxLength(255)
                    .HasColumnName("matkhau");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Quyen).HasColumnName("quyen");

                entity.Property(e => e.Taikhoan)
                    .HasMaxLength(255)
                    .HasColumnName("taikhoan");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Thuephong>(entity =>
            {
                entity.ToTable("thuephong");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ghichu)
                    .HasMaxLength(500)
                    .HasColumnName("ghichu");

                entity.Property(e => e.IdP).HasColumnName("id_p");

                entity.Property(e => e.IdTkkh).HasColumnName("id_tkkh");

                entity.Property(e => e.Ngaybd)
                    .HasColumnType("date")
                    .HasColumnName("ngaybd");

                entity.Property(e => e.Ngaykt)
                    .HasColumnType("date")
                    .HasColumnName("ngaykt");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Tintuc>(entity =>
            {
                entity.ToTable("tintuc");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdLtt).HasColumnName("id_ltt");

                entity.Property(e => e.IdTknv).HasColumnName("id_tknv");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Noidung)
                    .HasMaxLength(1000)
                    .HasColumnName("noidung");

                entity.Property(e => e.Ten)
                    .HasMaxLength(255)
                    .HasColumnName("ten");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            modelBuilder.Entity<Xeoto>(entity =>
            {
                entity.ToTable("xeoto");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Gia).HasColumnName("gia");

                entity.Property(e => e.IdDv).HasColumnName("id_dv");

                entity.Property(e => e.Mota)
                    .HasMaxLength(255)
                    .HasColumnName("mota");

                entity.Property(e => e.Ngaysua)
                    .HasColumnType("date")
                    .HasColumnName("ngaysua");

                entity.Property(e => e.Ngaytao)
                    .HasColumnType("date")
                    .HasColumnName("ngaytao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Tenxe)
                    .HasMaxLength(255)
                    .HasColumnName("tenxe");

                entity.Property(e => e.Trangthai).HasColumnName("trangthai");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
