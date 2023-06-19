using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using thanglong.Entities;
using thanglong.Helpers;
using thanglong.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.Options;


namespace thanglong.Sevices
{
    public partial interface IUserService
    {
        User Authenticate(string username, string password);
    }
    public class UserSevice: IUserService
    {
        private thanglongContext db = new thanglongContext();


        private readonly AppSetting _appSettings;

        public UserSevice(IOptions<AppSetting> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public User Authenticate(string username, string password)
        {
            var result = from t in db.TaikhoanKhs
                         join n in db.Khachhangs on t.IdKh equals n.Id
                         where t.Trangthai == 1
                         select new User { MaNguoiDung = n.Id, TaiKhoan = t.Taikhoan, HoTen = n.Hoten, MatKhau = t.Matkhau, DiaChi = n.Quequan, DienThoai = n.Sdt.ToString(), Email = n.Email };
            var user = result.SingleOrDefault(x => x.TaiKhoan == username && x.MatKhau == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.TaiKhoan.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user.WithoutPassword();
        }

    }
}