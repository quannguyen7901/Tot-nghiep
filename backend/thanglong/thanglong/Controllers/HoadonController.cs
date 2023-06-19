using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using thanglong.Models;
using System.Linq;
using thanglong.Helpers;

namespace thanglong.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoadonController : ControllerBase
    {
        private thanglongContext db = new thanglongContext();

        [AllowAnonymous]
        [HttpPost("create-payment")]
        public IActionResult CreatePaymentUrl(int number)
        {

            var timeNow = DateTime.UtcNow;
            var tick = DateTime.Now.Ticks.ToString();
            var pay = new VnPayLibrary();
            var urlCallBack = "https://thanglonghotel.netlify.app/hd";

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

            return Ok('"' + paymentUrl + '"');
        }

        [AllowAnonymous]
        [HttpPost("add")]
        public IActionResult add([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                Hoadon alo = new Hoadon
                {
                    IdTkkh = int.Parse(formData["idkh"].ToString()),
                    Coc = int.Parse(formData["coc"].ToString()),
                    Tonghoadon = int.Parse(formData["gia"].ToString()),
                    Trangthai = 1
                };
                db.Hoadons.Add(alo);
                db.SaveChanges();
                return Ok(alo);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("gethoadon")]
        public IActionResult getall([FromBody] Dictionary<string, object> formData)
        {
            var alo = from r in db.Hoadons
                      where r.Trangthai ==1  && r.IdTkkh == int.Parse(formData["id"].ToString())
                      select new {id=r.Id, ngaydat = r.Ngaytao, tien = r.Tonghoadon,tt=r.Trangthai};
            return Ok(alo);
        }

        [AllowAnonymous]
        [HttpPost("delete")]
        public IActionResult delete([FromBody] Dictionary<string, object> formData)
        {
            var id = int.Parse(formData["id"].ToString());
            Hoadon alo = db.Hoadons.Find(id);
            alo.Trangthai = 0;
            alo.Ngaysua = DateTime.Now;
            db.SaveChanges();
            return Ok(alo);
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
                var kq = from r in db.Hoadons
                         join g in db.Khachhangs on r.IdTkkh equals g.Id
                         select new { r.Id,ten=g.Hoten,ngay=r.Ngaytao,coc= r.Coc, tien=r.Tonghoadon,tt= r.Trangthai };
              
                total = kq.Count() == 0 ? kq.Where(s => s.tt == 1).Count() : db.Hoadons.Count();

                var alo = kq.Skip(pageSize * (pageIndex - 1)).Take(pageSize).ToList();

                return Ok(new { alo, total }); ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
