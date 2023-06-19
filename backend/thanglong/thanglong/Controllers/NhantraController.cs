using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using thanglong.Models;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using thanglong.Sevices;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Threading.Tasks;

namespace thanglong.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhantraController : ControllerBase
    {
 
            private thanglongContext db = new thanglongContext();

            // GET: api/Khachhangs
            [AllowAnonymous]
            [HttpGet("getall")]
            public async Task< IActionResult> getall()
            {
                var sendmailservice = HttpContext.RequestServices.GetService<ISendMailService>();

                MailContent content = new MailContent
                {
                    To = "quannguyen1879@gmail.com",
                    Subject = "Mã xác nhận",
                    Body = "<div style='margin:auto;'>Mã xác nhận đăng ký tài khoản của bạn là <div style='font-size:50px'>220920</div></div>"
                };

                 await sendmailservice.SendMail(content);
                 await HttpContext.Response.WriteAsync("Send mail");

                return Ok();
            }
            [AllowAnonymous]
            [HttpPost("add")]
            public IActionResult add([FromBody] Dictionary<string, object> formData)
            {
                try
                {
                    List<int> c = new List<int>();
                    string[] date = formData["ngaybd"].ToString().Split('/');
                    string[] date2 = formData["ngaykt"].ToString().Split('/');
                    DateTime a = DateTime.Parse(date[1] + '/' + date[0] + '/' + date[2]);
                    DateTime b = DateTime.Parse(date2[1] + '/' + date2[0] + '/' + date2[2]);
                    var tg = db.Thuephongs.ToList();
                    for (int i = 0; i < tg.Count(); i++)
                    {
                        if (tg[i].Ngaybd <= b || tg[i].Ngaykt >= a)
                        {
                            if (tg[i].Trangthai == 1)
                            {
                                c.Add((int)tg[i].IdP);
                            }
                        }
                    }
                    int idp = (from p in db.Phongs
                               where p.IdLp == int.Parse(formData["idp"].ToString()) && !c.Contains(p.Id) && p.Trangthai == 1
                               select p.Id).Take(1).FirstOrDefault();
                    Thuephong alo = new Thuephong
                    {
                        IdTkkh = int.Parse(formData["idkh"].ToString()),
                        IdP = idp,
                        Ngaybd = a,
                        Ngaykt = b,
                        Trangthai = 1
                    };
                    db.Thuephongs.Add(alo);
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
            Thuephong alo = db.Thuephongs.Find(id);
            Nhantra alo2 = (from r in db.Nhantras
                       where r.IdTp == id && r.Trangthai == 1
                     select r).FirstOrDefault();
            alo.Trangthai = 3;
            alo.Ngaysua = DateTime.Now;
            alo2.Ngaytra = DateTime.Now;
            alo2.Trangthai = 0;
            db.SaveChanges();
            return Ok(alo2);
            }
            [AllowAnonymous]
            [HttpPost("redelete")]
            public IActionResult redelete([FromBody] Dictionary<string, object> formData)
            {
                var id = int.Parse(formData["id"].ToString());
                //var kq = from r in db.Phongs
                //     join g in db.Loaiphongs on r.IdLp equals g.Id
                //     select new { r.Id, r.Sophong, r.IdLp, g.Gia, g.Tenloai, r.Trangthai };
                //var result = from t in db.Thuephongs
                //         join z in kq on t.IdP equals z.Id
                //         join e in db.Khachhangs on t.IdTkkh equals e.Id
                //         orderby t.Trangthai
                //         select new { id = t.Id, ten = e.Hoten, ngaybd = t.Ngaybd, ngaykt = t.Ngaykt, p = z.Sophong, loai = z.Tenloai, trangthai = t.Trangthai };
            Thuephong alo = db.Thuephongs.Find(id);
            Nhantra alo2=new Nhantra();
                alo.Trangthai = 2;
                alo.Ngaysua = DateTime.Now;
                alo2.IdTp = id;
                alo2.Ngaynhan=DateTime.Now;
                alo2.Trangthai = 1;
                db.Nhantras.Add(alo2);
                db.SaveChanges();
                return Ok(alo2);
            }
            [AllowAnonymous]
            [HttpPost("update")]
            public IActionResult update([FromBody] Dictionary<string, object> formData)
            {
                var id = int.Parse(formData["id"].ToString());
                Thuephong alo = db.Thuephongs.Find(id);
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
                var kq = from r in db.Phongs
                         join g in db.Loaiphongs on r.IdLp equals g.Id
                         select new { r.Id, r.Sophong, r.IdLp, g.Gia, g.Tenloai, r.Trangthai };
                var result = from t in db.Thuephongs
                                 join z in kq on t.IdP equals z.Id
                                 join e in db.Khachhangs on t.IdTkkh equals e.Id
                                 orderby t.Trangthai
                                 select new { id = t.Id, ten = e.Hoten, ngaybd=t.Ngaybd,ngaykt=t.Ngaykt, p=z.Sophong,loai=z.Tenloai,trangthai=t.Trangthai };

                total = result.Count() == 0 ? result.Where(s => s.trangthai== 1).Count() : db.Thuephongs.Count();

                var alo = result.Skip(pageSize * (pageIndex - 1)).Take(pageSize).ToList();

                return Ok(new { alo,total}); ;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }

