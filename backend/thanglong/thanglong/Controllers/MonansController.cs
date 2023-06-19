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
    public class MonansController : ControllerBase
    {
        
            private thanglongContext db = new thanglongContext();

            // GET: api/Khachhangs
            [AllowAnonymous]
            [HttpGet("getall")]
            public IActionResult getall()
            {
                var alo = db.Monans.Where(x => x.Trangthai != 0).ToList();
                return Ok(alo);
            }
            [AllowAnonymous]
            [HttpPost("add")]
            public IActionResult add([FromBody] Dictionary<string, object> formData)
            {
                try
                {
                    Monan alo = new Monan
                    {
                        Tenmon = formData["tenmon"].ToString(),
                        Mota = formData["mota"].ToString(),
                        Gia = int.Parse(formData["scccd"].ToString()),
                        Trangthai = 1
                    };
                    db.Monans.Add(alo);
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
                Monan alo = db.Monans.Find(id);
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
                Monan alo = db.Monans.Find(id);
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
                Monan alo = db.Monans.Find(id);
                Anhmonan alo1=db.Anhmonans.Find(alo.Id);
                alo1.Duongdan = formData["anh"].ToString();
                alo.Id = id;
                alo.Tenmon = formData["tenmon"].ToString();
                alo.Mota = formData["mota"].ToString();
                alo.Gia = int.Parse(formData["gia"].ToString());
                alo.Trangthai = 1;
                alo.Ngaysua = DateTime.Now;
                alo1.Ngaysua=DateTime.Now;
                db.SaveChanges();
                return Ok(alo);
            }
            [AllowAnonymous]
            [HttpPost("getid")]
            public IActionResult getid([FromBody] Dictionary<string, object> formData)
            {
                var id = int.Parse(formData["id"].ToString());
                   var alo = from t in db.Monans
                      join n in db.Anhmonans on t.Id equals n.IdMa
                      where t.Trangthai == 1 && t.Id == id
                      select new { t.Id, anh = n.Duongdan, ten = t.Tenmon, mota = t.Mota, gia = t.Gia, t.Trangthai };
                return Ok(alo.First());
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
                var alo = from t in db.Monans
                          join n in db.Anhmonans on t.Id equals n.IdMa
                          where t.Trangthai == 1
                          select new { t.Id,anh=n.Duongdan,ten=t.Tenmon,mota=t.Mota,gia=t.Gia,t.Trangthai};
                    var result = alo.Skip(pageSize * (pageIndex - 1)).Take(pageSize).ToList();
                    total = result.Count() == 0 ? result.Where(s => s.Trangthai == 1).Count() : db.Monans.Count();
                    return Ok(new { result, total }); ;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
