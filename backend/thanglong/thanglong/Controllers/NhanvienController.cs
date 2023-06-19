using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using thanglong.Models;
using System.Linq;

namespace thanglong.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanvienController : ControllerBase
    {
        private thanglongContext db = new thanglongContext();

        // GET: api/Khachhangs
        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult getall()
        {
            var alo = db.Nhanviens.Where(x => x.Trangthai != 0).ToList();
            return Ok(alo);
        }
        [AllowAnonymous]
        [HttpPost("add")]
        public IActionResult add([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                Nhanvien alo = new Nhanvien
                {
                    Hoten = formData["hoten"].ToString(),
                    Quequan = formData["quequan"].ToString(),
                    Scccd = formData["scccd"].ToString(),
                    Sdt = int.Parse(formData["sdt"].ToString()),
                    Email = formData["email"].ToString(),
                    Chucvu = formData["chucvu"].ToString(),
                    Trangthai = 1
                };
                db.Nhanviens.Add(alo);
                db.SaveChanges();
                return Ok(alo);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [AllowAnonymous]
        [HttpPost("delete")]
        public IActionResult delete([FromBody] Dictionary<string, object> formData)
        {
            var id = int.Parse(formData["id"].ToString());
            Nhanvien alo = db.Nhanviens.Find(id);
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
            Nhanvien alo = db.Nhanviens.Find(id);
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
            Nhanvien alo = db.Nhanviens.Find(id);
            alo.Id = id;
            alo.Hoten = formData["hoten"].ToString();
            alo.Quequan = formData["quequan"].ToString();
            alo.Email = formData["email"].ToString();
            alo.Sdt = int.Parse(formData["sdt"].ToString());
            alo.Scccd = formData["scccd"].ToString();
            alo.Chucvu = formData["chucvu"].ToString();
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
            Nhanvien user = db.Nhanviens.Find(id);
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
                var result = db.Nhanviens.Skip(pageSize * (pageIndex - 1)).Take(pageSize).ToList();
                total = result.Count() == 0 ? result.Where(s => s.Trangthai == 1).Count() : db.Nhanviens.Count();
                return Ok(new { result, total }); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
