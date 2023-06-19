using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using thanglong.Entities;
using thanglong.Helpers;
using thanglong.Models;
using thanglong.Sevices;

namespace thanglong.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachhangsController : ControllerBase
    {
        public static int otp;
        private IUserService _userService;
        public KhachhangsController(IUserService userService)
        {
            _userService = userService;
        }
        private thanglongContext db =new thanglongContext();

        // GET: api/Khachhangs
        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult getall()
        {
            var alo = db.Khachhangs.Where(x => x.Trangthai != 0).ToList();
            return Ok(alo);
        }

        [AllowAnonymous]
        [HttpGet("getotp")]
        public int getotp()
        {
            Random rnd = new Random();
            return rnd.Next(100000, 999999);
        }


        [AllowAnonymous]
        [HttpPost("add")]
        public IActionResult add([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                Khachhang alo = new Khachhang
                {
                    Hoten = formData["hoten"].ToString(),
                    Quequan= formData["quequan"].ToString(),
                    Scccd = formData["scccd"].ToString(),
                    Sdt = int.Parse(formData["sdt"].ToString()),
                    Email = formData["email"].ToString(),
                    Trangthai=1
                };
                db.Khachhangs.Add(alo);
                db.SaveChanges();
                return Ok(alo);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("dangky")]
        public IActionResult dangky([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                Khachhang alo = new Khachhang
                {
                    Hoten = formData["hoten"].ToString(),
                    Quequan = formData["quequan"].ToString(),
                    Scccd = formData["scccd"].ToString(),
                    Sdt = int.Parse(formData["sdt"].ToString()),
                    Email = formData["email"].ToString(),
                    Trangthai = 1
                };
                db.Khachhangs.Add(alo);
                db.SaveChanges();
                TaikhoanKh alo2 = new TaikhoanKh
                {
                    Taikhoan = formData["taikhoan"].ToString(),
                    Matkhau = formData["matkhau"].ToString(),
                    IdKh = alo.Id,
                    Trangthai = 1
                };
                db.TaikhoanKhs.Add(alo2);
                db.SaveChanges();
                            
            return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("check")]
        public void check([FromBody] Dictionary<string, object> formData)
        {
            int a = getotp();
            _ = senmail(a, formData["email"].ToString());
            otp = a;
        }

        [AllowAnonymous]
        [HttpPost("checks")]
        public bool checks([FromBody] Dictionary<string, object> formData)
        {
            if (int.Parse(formData["num"].ToString()) == otp)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [AllowAnonymous]
        [HttpPost("sendmail")]
        public async Task senmail(int num,string email)
        {
            var sendmailservice = HttpContext.RequestServices.GetService<ISendMailService>();

            MailContent content = new MailContent
            {
                To = email,
                Subject = "Mã xác nhận",
                Body = "<div style='margin-left:500px;margin-top:60px'>Mã xác nhận đăng ký tài khoản của bạn là <div style='font-size:50px'>"+num+"</div></div>"
            };

            await sendmailservice.SendMail(content);
            await HttpContext.Response.WriteAsync("Send mail");
        }

        [AllowAnonymous]
        [HttpPost("delete")]
        public IActionResult delete([FromBody] Dictionary<string, object> formData)
        {
            var id = int.Parse(formData["id"].ToString());
            Khachhang alo = db.Khachhangs.Find(id);
            alo.Trangthai = 0;
            alo.Ngaysua = DateTime.Now;
            db.SaveChanges();
            return Ok(alo);
        }
        [AllowAnonymous]
        [HttpPost("redelete")]
        public IActionResult redelete([FromBody] Dictionary<string, object> formData)
        {
            var id = int.Parse(formData["id"].ToString());
            Khachhang alo = db.Khachhangs.Find(id);
            alo.Trangthai = 1;
            alo.Ngaysua = DateTime.Now;
            db.SaveChanges();
            return Ok(alo);
        }
        [AllowAnonymous]
        [HttpPost("update")]
        public IActionResult update([FromBody] Dictionary<string, object> formData)
        {
            var id = int.Parse(formData["id"].ToString());
            Khachhang alo = db.Khachhangs.Find(id);
            alo.Id = id;
            alo.Hoten = formData["hoten"].ToString();
            alo.Quequan = formData["quequan"].ToString();
            alo.Email = formData["email"].ToString();
            alo.Sdt = int.Parse(formData["sdt"].ToString());
            alo.Scccd = formData["scccd"].ToString();
            alo.Trangthai = 1;
            alo.Ngaysua = DateTime.Now;
            db.SaveChanges();
            return Ok(alo);
        }
        [AllowAnonymous]
        [HttpPost("getid")]
        public IActionResult getid([FromBody] Dictionary<string, object> formData)
        {
            var id = int.Parse(formData["id"].ToString());
            Khachhang user = db.Khachhangs.Find(id);
            return Ok(user);
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Tài khoản hoặc mật khẩu sai!" });

            return Ok(user);
        }
        [AllowAnonymous]
        [HttpPost("search")]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            long total = 0;
            try
            {
                var pageIndex = int.Parse(formData["index"].ToString());
                var pageSize = int.Parse(formData["size"].ToString());
                var result = db.Khachhangs.Skip(pageSize * (pageIndex - 1)).Take(pageSize).ToList();
                total = result.Count() == 0 ? result.Where(s => s.Trangthai == 1).Count() : db.Khachhangs.Count();
                return Ok(new { result, total }); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
