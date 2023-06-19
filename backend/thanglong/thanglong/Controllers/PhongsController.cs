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
    public class PhongsController : ControllerBase
    {
        private thanglongContext db = new thanglongContext();

        // GET: api/Khachhangs
        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult getall()
        {
            var alo = db.Phongs.Where(x => x.Trangthai != 0).ToList();
            return Ok(alo);
        }
        [AllowAnonymous]
        [HttpGet("getalllp")]
        public IActionResult getalllp()
        {
            var alo = db.Loaiphongs.Where(x => x.Trangthai != 0).ToList();
            return Ok(alo);
        }

        [AllowAnonymous]
        [HttpPost("add")]
        public IActionResult add([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                Phong alo = new Phong
                {
                    Sophong = formData["sophong"].ToString(),
                    //Gia = int.Parse(formData["gia"].ToString()),
                    IdLp = int.Parse(formData["idlp"].ToString()),
                    Trangthai = 1
                };
                db.Phongs.Add(alo);
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
            Phong alo = db.Phongs.Find(id);
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
            Phong alo = db.Phongs.Find(id);
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
            Phong alo = db.Phongs.Find(id);
            alo.Id = id;
            alo.Sophong = formData["sophong"].ToString();
            //alo.Gia = int.Parse(formData["gia"].ToString());
            alo.IdLp = int.Parse(formData["idlp"].ToString());
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
            Phong user = db.Phongs.Find(id);
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
                var kq = from r in db.Phongs
                         join g in db.Loaiphongs on r.IdLp equals g.Id
                         select new { r.Id, r.Sophong, r.IdLp, g.Gia, g.Tenloai, r.Trangthai };
                var result = kq.Skip(pageSize * (pageIndex - 1)).Take(pageSize).ToList();
                total = result.Count() == 0 ? result.Where(s => s.Trangthai == 1).Count() : db.Phongs.Count();
                return Ok(new { result, total }); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}