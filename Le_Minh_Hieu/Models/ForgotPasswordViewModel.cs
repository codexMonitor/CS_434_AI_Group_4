using System.ComponentModel.DataAnnotations;

namespace HieuClothes.Models
{
    public class ForgotPasswordViewModel
    {
        [Required(ErrorMessage = "Vui lòng nhập email.")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ.")]
        [Display(Name = "Email đăng ký")]
        public string Email { get; set; } = string.Empty;
    }
}
