using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using thanglong.Models;

namespace thanglong.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhgiaController : ControllerBase
    {
        private thanglongContext db = new thanglongContext();

        [AllowAnonymous]
        [HttpGet("getall")]
        public IActionResult getall()
        {
            var alo = from r in db.Danhgia
                      join tk in db.TaikhoanKhs on r.IdTkkh equals tk.Id
                      join kh in db.Khachhangs on tk.IdKh equals kh.Id
                      where r.Trangthai != 0
                      select new {noidung= r.Noidung,ten=kh.Hoten };
            return Ok(alo);
        }
    }
}
