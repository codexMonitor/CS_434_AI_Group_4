using Microsoft.AspNetCore.Mvc;
using HieuClothes.Models;

namespace HieuClothes.Controllers
{
    public class AccountController : Controller
    {
        // GET: /Account/ForgotPassword
        [HttpGet]
        public IActionResult ForgotPassword()
        {
            return View(new ForgotPasswordViewModel());
        }

        // POST: /Account/ForgotPassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ForgotPassword(ForgotPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                // Nếu email bỏ trống / sai định dạng -> trả lại view kèm lỗi
                return View(model);
            }

            // TODO: Kiểm tra email có tồn tại trong database hay không
            // giả sử ta có UserService.CheckEmailExists(model.Email)
            bool emailTonTaiTrongHeThong = true; // tạm thời cho luôn = true

            if (emailTonTaiTrongHeThong)
            {
                // TODO:
                // 1. Sinh ra token reset mật khẩu
                // 2. Lưu token vào DB
                // 3. Gửi email cho người dùng kèm link đặt lại mật khẩu

                // Ví dụ (giả sử có action ResetPassword nhận token):
                // string resetLink = Url.Action("ResetPassword", "Account",
                //                               new { token = token, email = model.Email },
                //                               Request.Scheme);

                // TODO: Gửi email resetLink cho model.Email

                ViewBag.SuccessMessage = "Nếu email tồn tại trong hệ thống, chúng tôi đã gửi link đặt lại mật khẩu.";
            }
            else
            {
                // Vì lý do bảo mật: không nên nói "email không tồn tại",
                // vẫn báo giống như khi tồn tại
                ViewBag.SuccessMessage = "Nếu email tồn tại trong hệ thống, chúng tôi đã gửi link đặt lại mật khẩu.";
            }

            // Trả lại view cùng thông báo
            return View(new ForgotPasswordViewModel());
        }
    }
}
