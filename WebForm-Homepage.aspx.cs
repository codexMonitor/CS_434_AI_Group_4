using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DOAN_TMDT.DOAN.Homepage
{
    public partial class WebForm_Homepage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                // Kiểm tra trạng thái đăng nhập
                if (Session["IsLoggedIn"] != null && (bool)Session["IsLoggedIn"])
                {
                    // Đã đăng nhập: hiển thị Welcome, Username và biểu tượng ⚙️
                    pnlWelcome.Visible = true;
                    btnLogin.Visible = false;

                    lblUsernameSearch.Text = Session["Username"]?.ToString() ?? "Chưa có tên";
                    Label1.Text = Session["Username"]?.ToString() ?? "Chưa có tên";
                    lblEmail.Text = Session["Email"]?.ToString() ?? "Chưa có email";
                    lblPhone.Text = Session["Phone"]?.ToString() ?? "Chưa có số điện thoại";
                }
                else
                {
                    // Chưa đăng nhập: hiển thị nút Login, ẩn Welcome và panel
                    pnlWelcome.Visible = false;
                    btnLogin.Visible = true;
                    pnlAccountInfo.Visible = false;
                }
            }
        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            // Xóa session
            Session.Clear();
            Session.Abandon();

            // Xóa cookie nếu có
            if (Request.Cookies["UserLogin"] != null)
            {
                HttpCookie cookie = new HttpCookie("UserLogin");
                cookie.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(cookie);
            }

            // Làm mới trang hiện tại
            Response.Redirect(Request.RawUrl);
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            // Chuyển hướng đến trang đăng nhập
            Response.Redirect("../trangchu.aspx");
        }
    }
}


