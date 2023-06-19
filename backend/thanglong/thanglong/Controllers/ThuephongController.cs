using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using thanglong.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using thanglong.Sevices;
using System.Net.NetworkInformation;
using System.Globalization;
using thanglong.Helpers;

namespace thanglong.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThuephongController : ControllerBase
    {
        private thanglongContext db = new thanglongContext();

        [AllowAnonymous]
        [HttpPost("create-payment")]
        public IActionResult CreatePaymentUrl(int number)
        {

            var timeNow = DateTime.UtcNow;
            var tick = DateTime.Now.Ticks.ToString();
            var pay = new VnPayLibrary();
            var urlCallBack = "https://thanglonghotel.netlify.app/p";

            pay.AddRequestData("vnp_Version", "2.1.0");
            pay.AddRequestData("vnp_Command", "pay");
            pay.AddRequestData("vnp_TmnCode", "PF0D04RD");
            pay.AddRequestData("vnp_Amount", (number * 100).ToString());
            pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", "VND");
            pay.AddRequestData("vnp_IpAddr", "58.186.68.11");
            pay.AddRequestData("vnp_Locale", "vn");
            pay.AddRequestData("vnp_OrderInfo", "Dat coc thue phong");
            pay.AddRequestData("vnp_ReturnUrl", urlCallBack);
            pay.AddRequestData("vnp_TxnRef", tick);

            var paymentUrl =
                pay.CreateRequestUrl("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html", "HOWZBDLFUMBJOMGRQQIMRSHOBXSQQEOO");

            return Ok('"'+paymentUrl+'"');
        }
        [AllowAnonymous]
        [HttpPost("add")]
        public IActionResult add([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                List<int> c = new List<int>();
                List<int> phong = new List<int>();
                string[] date = formData["ngaybd"].ToString().Split('/');
                string[] date2 = formData["ngaykt"].ToString().Split('/');
                DateTime a = DateTime.Parse(date[1] + '/' + date[0] + '/' + date[2]);
                DateTime b = DateTime.Parse(date2[1] + '/' + date2[0] + '/' + date2[2]);
                var tg = db.Thuephongs.ToList();
                for (int i = 0; i < tg.Count(); i++)
                {
                    if (tg[i].Ngaybd > b || tg[i].Ngaykt < a)
                    {

                    }
                    else
                    {
                        if (tg[i].Trangthai == 1)
                        {
                            c.Add((int)tg[i].IdP);
                        }
                    }
                }
                foreach (char i in formData["idp"].ToString())
                {
                    if (i != '[' && i != ']' && i != ',')
                    {
                        var id = (from p in db.Phongs
                                  where p.IdLp == int.Parse(i.ToString()) && !c.Contains(p.Id) && p.Trangthai == 1
                                  select new { id = p.Id,sp = p.Sophong }).Take(1).FirstOrDefault();
                        Thuephong alo = new Thuephong
                        {
                            IdTkkh = int.Parse(formData["idkh"].ToString()),
                            IdP = id.id,
                            Ngaybd = a,
                            Ngaykt = b,
                            Trangthai = 1
                        };
                        db.Thuephongs.Add(alo);
                        db.SaveChanges();
                        c.Add(id.id);
                        phong.Add(int.Parse(id.sp));
                    }
                }
                _ = senmail(String.Join(",", phong.ToArray()), formData["email"].ToString(), formData["ngaybd"].ToString(), formData["ngaykt"].ToString(), int.Parse(formData["gia"].ToString()), formData["ten"].ToString());
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [AllowAnonymous]
        [HttpPost("email")]
        public async Task senmail(string num, string email, string ngaybd, string ngaykt, int gia, string name)
        {
            var sendmailservice = HttpContext.RequestServices.GetService<ISendMailService>();
            CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");   // try with "en-US"
            string a = gia.ToString("#,###", cul.NumberFormat);

            string mail = "<div style='width: 50%;border: 1px solid black;border-radius: 4px;margin: auto;height: 400px; background-image: url(https://opera.thanglonghanoihotels.com/wp-content/uploads/2018/05/tlo_logo_fix.png); background-size:95% 95%;background-position: center;background-repeat: no-repeat;'></div><div style = 'width: 50%;margin: auto;font-size: 24px;'><label ><h3 style = 'margin-bottom: 5px;'> Xin Chào: " + name + "</h3></label><label><h3 style = 'margin-bottom: 5px;'> Cảm ơn bạn đã chọn sử dụng dịch vụ của Thăng Long Hotel.</h3></label><label style = 'line-height: 50px;'> -Phòng của bạn là: <b>" + num + "</b><br></label><label style = 'line-height: 50px;'> -Ngày bắt đầu: <b> " + ngaybd + " </b> (Có thể nhận phòng từ 9h sáng ngày bắt đầu!)<br></label><label style = 'line-height: 50px;'> -Ngày kết thúc: <b> " + ngaykt + " </b> (Trả phòng trước 9h sáng ngày kết thúc!)<br></label><label style = 'line-height: 50px;'> -Giá phòng: <b> " + a + " VNĐ </b><br></label><label style = 'line-height: 30px;'> Hãy đến với lễ tân để làm dịch vụ nhận phòng và tận hưởng những tiện ích của chúng tôi.Lần nữa xin cảm ơn bạn đã chọn Thăng Long Hotel! </label></div><div style = 'width: 50%;margin: auto;font-size: 24px;text-align: right;'><h3> Thăng Long Hotel</h3>Hotline: 0123456789 <br>Luôn luôn phục vụ</div>";

            MailContent content = new MailContent
            {
                To = email,
                Subject = "Chi tiết đặt phòng",
                Body = mail
            };

            await sendmailservice.SendMail(content);
            await HttpContext.Response.WriteAsync("Send mail");
        }
        [AllowAnonymous]
        [HttpPost("delete")]
        public IActionResult delete([FromBody] Dictionary<string, object> formData)
        {
            var id = int.Parse(formData["id"].ToString());
            Thuephong alo = db.Thuephongs.Find(id);
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
            Thuephong alo = db.Thuephongs.Find(id);
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
            Thuephong alo = db.Thuephongs.Find(id);
            db.SaveChanges();
            return Ok(alo);
        }
        [AllowAnonymous]
        [HttpPost("getid")]
        public IActionResult getid([FromBody] Dictionary<string, object> formData)
        {
            var id = int.Parse(formData["id"].ToString());
            Thuephong user = db.Thuephongs.Find(id);
            return Ok(user);
        }
        [AllowAnonymous]
        [HttpPost("search")]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            long total = 0;
            try
            {
                List<int> c = new List<int>();
                if (formData["ngaybd"].ToString() != "" && formData["ngaykt"].ToString() != "")
                {
                    string[] date = formData["ngaybd"].ToString().Split('/');
                    string[] date2 = formData["ngaykt"].ToString().Split('/');
                    //string[] date = "19/05/2023".Split('/');
                    //string[] date2 = "22/05/2023".Split('/');
                    DateTime a = DateTime.Parse(date[1] + '/' + date[0] + '/' + date[2]);
                    DateTime b = DateTime.Parse(date2[1] + '/' + date2[0] + '/' + date2[2]);
                    var tg = db.Thuephongs.ToList();
                    for (int i = 0; i < tg.Count(); i++)
                    {
                        if (tg[i].Ngaybd > b || tg[i].Ngaykt < a)
                        {

                        }
                        else
                        {
                            if (tg[i].Trangthai == 1)
                            {
                                c.Add((int)tg[i].IdP);
                            }
                        }
                    }
                }
                var kq = from h in db.Phongs
                         where h.Trangthai == 1 && !c.Contains(h.Id)
                         select h;

                var result = from t in db.Loaiphongs
                             join z in db.Anhphongs on t.Id equals z.IdP
                             where t.Trangthai == 1
                             select new { id = t.Id, ten = t.Tenloai, duongdan = z.Duongdan, gia = t.Gia, mota = t.Mota, tranthai = t.Trangthai };

                var alo = from t in result
                          select new { t, num = (from a in kq where a.IdLp == t.id select a.Id).Count() };

                return Ok(new { alo, c }); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}

