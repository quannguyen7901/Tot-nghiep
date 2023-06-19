create table khachhang(
id int identity(1,1) primary key,
hoten nvarchar(255),
quequan nvarchar(255),
sdt int,
scccd varchar(12),
email varchar(255),
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go
create table nhanvien(
id int identity(1,1) primary key,
hoten nvarchar(255),
quequan nvarchar(255),
sdt int,
scccd varchar(12),
email varchar(255),
chucvu nvarchar(255),
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go

create table taikhoan_kh(
id int identity(1,1) primary key,
id_kh int,
taikhoan nvarchar(255),
matkhau nvarchar(255),
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go
create table taikhoan_nv(
id int identity(1,1) primary key,
id_nv int,
taikhoan nvarchar(255),
matkhau nvarchar(255),
quyen int,
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go
create table loaiphong(
id int identity(1,1) primary key,
tenloai nvarchar(255),
mota nvarchar(255),
gia int,
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go

create table phong(
id int identity(1,1) primary key,
id_lp int,
sophong nvarchar(255),
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go


create table anhphong(
id int identity(1,1) primary key,
id_p int,
duongdan nvarchar(255),
ngaytao date default getdate(),
ngaysua date,
trangthai int )
go
create table loaitintuc(
id int identity(1,1) primary key,
ten nvarchar(255),
mota nvarchar(1000),
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go
create table tintuc(
id int identity(1,1) primary key,
id_ltt int,
id_tknv int ,
ten nvarchar(255),
noidung nvarchar(1000),
ngaytao date default getdate(),
ngaysua date,
trangthai int )
go
create table danhgia(
id int identity(1,1) primary key,
id_tkkh int,
noidung nvarchar(1000),
ngaytao date default getdate(),
ngaysua date,
trangthai int )
go
create table dichvu(
id int identity(1,1) primary key,
tendv nvarchar(255),
ghichu nvarchar(500),
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go
create table monan(
id int identity(1,1) primary key,
id_dv int,
tenmon nvarchar(255),
mota nvarchar(255),
gia int,
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go
create table anhmonan(
id int identity(1,1) primary key,
id_ma int,
duongdan nvarchar(255),
ngaytao date default getdate(),
ngaysua date,
trangthai int )
go
create table xeoto(
id int identity(1,1) primary key,
id_dv int,
tenxe nvarchar(255),
mota nvarchar(255),
gia int,
ngaytao date default getdate(),
ngaysua date,
trangthai int)
go
create table anhxeoto(
id int identity(1,1) primary key,
id_xe int,
duongdan nvarchar(255),
ngaytao date default getdate(),
ngaysua date,
trangthai int )
go
create table thuephong(
id int identity(1,1) primary key,
id_tkkh int,
id_p int,
ngaybd date,
ngaykt date,check (ngaykt>=ngaybd),
ghichu nvarchar(500),
ngaytao date default getdate(),
ngaysua date,
trangthai int )
go
create table nhantra(
id int identity(1,1) primary key,
id_tp int,
ngaynhan date,
ngaytra date,
ngaytao date default getdate(),
ngaysua date,
trangthai int )
go
create table hoadon(
id int identity(1,1) primary key,
id_tkkh int,
coc int,
tonghoadon int,
ngaytao date default getdate(),
ngaysua date,
trangthai int )
go
create table chitiethoadon(
id int identity(1,1) primary key,
id_hd int,
id_dv int ,
gia int,
ngaytao date default getdate(),
ngaysua date,
trangthai int )
go

select tenloai, count(phong.id) from phong inner join loaiphong on phong.id_lp=loaiphong.id group by tenloai

insert into khachhang(hoten,quequan) values (N'Nguyễn Văn A',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn B',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn C',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn D',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn E',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn F',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn G',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn H',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn I',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn J',N'Hà Nội')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn K',N'Hà Nội')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn L',N'Hà Nội')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn N',N'Hà Nội')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn M',N'Hà Nội')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn O',N'Hưng Yên')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn S',N'Hà Nội')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn X',N'Hà Nội')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn V',N'Hà Nội')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn P',N'Hà Nội')
insert into khachhang(hoten,quequan) values (N'Nguyễn Văn Q',N'Hà Nội')

select loaiphong.id,loaiphong.mota,loaiphong.gia, tenloai,duongdan,loaiphong.trangthai, count(phong.id) as count from loaiphong inner join anhphong on anhphong.id_p=loaiphong.id inner join phong on phong.id_lp=loaiphong.id
where phong.trangthai=1
group by tenloai,duongdan,loaiphong.id,loaiphong.mota,loaiphong.gia,loaiphong.trangthai

CREATE FUNCTION gettable()
RETURNS TABLE
AS
RETURN
(
   select loaiphong.id,loaiphong.mota,loaiphong.gia, tenloai,duongdan,loaiphong.trangthai, count(phong.id) as count from loaiphong inner join anhphong on anhphong.id_p=loaiphong.id inner join phong on phong.id_lp=loaiphong.id
where phong.trangthai=1
group by tenloai,duongdan,loaiphong.id,loaiphong.mota,loaiphong.gia,loaiphong.trangthai
)
GO

select * from gettable()