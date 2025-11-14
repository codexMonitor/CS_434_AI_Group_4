<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm-Homepage.aspx.cs" Inherits="DOAN_TMDT.DOAN.Homepage.WebForm_Homepage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Luxury Fashion</title>
    <link rel="stylesheet" href="../css/CSS-Homepage.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
        <style>
        .welcome-label, .username-label {
            font-family: "Playwrite DK Loopet", cursive;
            font-size: 20px;
            font-weight: 400;
            font-style: normal;
            display: inline-block;
            margin: 0;
            vertical-align: middle; /* Căn giữa theo chiều dọc */
        }
        .search-container {
            position: relative;
            display: flex;
            align-items: center; /* Căn giữa tất cả các phần tử */
            gap: 0;
        }
        .settings-icon {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            padding: 5px;
            margin-left: 5px;
            vertical-align: middle; /* Căn giữa với văn bản */
            line-height: 20px; /* Đồng bộ với font-size của văn bản */
        }
        .login-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 3px;
            cursor: pointer;
            vertical-align: middle; /* Căn giữa khi hiển thị nút Login */
        }
        .login-button:hover {
            background-color: #0056b3;
        }
        .account-info-panel {
            display: none;
            position: absolute;
            top: 40px;
            right: 0;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            padding: 15px;
            z-index: 1000;
            min-width: 200px;
        }
        .account-info-panel p {
            margin: 5px 0;
            font-size: 14px;
            color: #000 !important;
        }
        .logout-button {
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 3px;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
        }
        .logout-button:hover {
            background-color: #c82333;
        }
        .menu-item {
        padding: 0 5000px; /* tăng khoảng cách ngang giữa các mục menu */
        display: inline-block;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <!-- Phần navigation bar -->
    <div class="header">
        <div class="nav-bar">
            <div class="nav-items">
                <asp:Menu ID="NavigationMenu" runat="server" Orientation="Horizontal" 
                    StaticMenuItemStyle-CssClass="menu-item"
                    StaticMenuItemStyle-ItemSpacing="30" StaticEnableDefaultPopOutImage="false" 
                    StaticItemSpacing="30" StaticMenuItemStyle-HorizontalPadding="20" 
                    StaticMenuItemStyle-VerticalPadding="20" Height="0">
                    <Items>
                        <asp:MenuItem Text="Home" Value="Home" NavigateUrl="../Homepage/WebForm-Homepage.aspx" />
                        <asp:MenuItem Text="Product" Value="Product" NavigateUrl="../ProductPage/ProductPage.aspx"/> 
                        <asp:MenuItem Text="Luxury Fashion" Value="LuxuryFashion" NavigateUrl="../Firstpage/WebForm-FirstPage.aspx"/>
                        <asp:MenuItem Text="Stock" Value="Stock" NavigateUrl="../GioHang/WebForm-GioHang.aspx" />
                    </Items>    
                </asp:Menu>
            </div>
            <div class="search-container">
                <asp:Panel ID="pnlWelcome" runat="server" Visible="false">
                    <asp:Label ID="lblWelcome" runat="server" CssClass="welcome-label" Text="Welcome, " />
                    <asp:Label ID="lblUsernameSearch" runat="server" CssClass="username-label"></asp:Label>
                    <button type="button" id="settingsButton" class="settings-icon" onclick="toggleAccountInfo()">⚙️</button>
                </asp:Panel>
                <asp:Button ID="btnLogin" runat="server" Text="Login" CssClass="login-button" OnClick="btnLogin_Click" Visible="true" />
                <asp:Panel ID="pnlAccountInfo" runat="server" CssClass="account-info-panel">
                    <p><strong>Username:</strong> <asp:Label ID="Label1" runat="server" /></p>
                    <p><strong>Email:</strong> <asp:Label ID="lblEmail" runat="server" /></p>
                    <p><strong>Phone:</strong> <asp:Label ID="lblPhone" runat="server" /></p>
                    <asp:Button ID="btnLogout" runat="server" Text="Đăng xuất" OnClick="btnLogout_Click" CssClass="logout-button" />
                </asp:Panel>
            </div>
        </div>
    </div>
    </form>

    <!-- carousel -->
    <div class="carousel">
        <!-- list item -->
        <div class="list">
            <div class="item">
                <img src="../image/aboutmetgala.jpg">
                <div class="content">
                    <div class="author">Luxury Fashion</div>
                    <div class="title">Met Gala 2025</div>
                    <div class="topic"><br>RIHANA <br> A$AP ROCKY</div>
                    <div class="des">
                        <!-- lorem 50 -->
                        Everything to Know About<br />the 2025 Met Gala: Theme, Hosts, and More
                    </div>
                    <div class="buttons">
                   
                   <button onclick="window.open('https://www.vogue.com/article/everything-to-know-met-gala', '_blank')">
                    SEE MORE
                    </button>


                    </div>
                </div>
            </div>
            <div class="item">
                <img src="../image/ROSE.jpg">
                    <div class="content">
                    <div class="author">Luxury Fashion</div>
                    <div class="title">Met Gala 2025</div>
                    <div class="topic"><br>ROSÉ</div>
                    <div class="des">
                        Rosé gets down to business <br> at the 2025 Met Gala
                    </div>
                    <div class="buttons">
                        <button onclick="window.open('https://www.vogue.com.au/fashion/news/rose-met-gala-2025/image-gallery/23ac0aa1d34362a42c362501345d1846', '_blank')">
                            SEE MORE
                        </button>
                    </div>
                </div>
            </div>
            <div class="item">
                <img src="../image/Lisa.jpg">
                <div class="content">
                     <div class="author">Luxury Fashion</div>
                    <div class="title">Met Gala 2025</div>
                    <div class="topic"><br>LISA</div>
                    <div class="des">
                        Lisa makes her Met Gala debut <br /> and puts her spin on naked dressing
                    </div>
                    <div class="buttons">
                        <button onclick="window.open('https://www.vogue.com.au/fashion/news/lisa-met-gala-2025/image-gallery/8c829ccb954dbd29342529dae4d7b23a', '_blank')"> 
                        SEE MORE
                        </button>
                    </div>
                </div>
            </div>
            <div class="item">
                <img src="../image/thebestdress.jpg">
                    <div class="content">
                    <div class="author">Luxury Fashion</div>
                    <div class="title">Met Gala 2025</div>
                    <div class="topic"><br>ZENDAYA</div>
                    <div class="des">
                      The Best-Dressed Stars From the 2025 Met Gala
                
                    </div>
                    <div class="buttons">
                     <button onclick="window.open('https://www.vogue.com/slideshow/best-dressed-stars-met-gala-2025', '_blank')"> 
                            SEE MORE
                     </button>
                    </div>
                </div>
            </div>
            <div class="item">
               <img src="../image/Jennir.jpg">
                  <div class="content">
                  <div class="author">Luxury Fashion</div>
                  <div class="title">Met Gala 2025</div>
                  <div class="topic"><br>JENNIE</div>
                  <div class="des">
                        Bow Down to Jennie’s Bow Bun at the 2025 Met Gala
                  </div>
                  <div class="buttons">
                   <button onclick="window.open('https://www.vogue.com/article/jennie-bow-bun-hairstyle-2025-met-gala', '_blank')"> 
                    SEE MORE
                   </button>
                  </div>
                </div>
            </div>
        </div>
        <!-- list thumnail -->
        <div class="thumbnail">
            <div class="item">
                <img src="../image/aboutmetgala.jpg">
                <div class="content">
                    <div class="title">
                        RIHANA 
                    </div>
                    <div class="description">
                        A$AP ROCKY
                    </div>
                </div>
            </div>
            <div class="item">
                <img src="../image/ROSE.jpg">
                <div class="content">
                    <div class="title">
                        ROSÉ
                    </div>
                    <div class="description">
                        In Saint Laurent
                    </div>
                </div>
            </div>
            <div class="item">
                <img src="../image/lisa_thumb.jpg">
                <div class="content">
                    <div class="title">
                        LISA
                    </div>
                    <div class="description">
                        Louis Vuitton
                    </div>
                </div>
            </div>
            <div class="item">
                <img src="../image/thebestdress.jpg">
                <div class="content">
                    <div class="title">
                        ZENDAYA
                    </div>
                    <div class="description">
                        The Best <br /> Dressed Stars at Met Gala 2025

                    </div>
                </div>
            </div>
            <div class="item">
               <img src="../image/Jennie.jpg">
               <div class="content">
                  <div class="title">
                      JENNIE
                  </div>
                  <div class="description">
                      Chanel

                   </div>
                </div>
           </div>        
        </div>
        <!-- next prev -->

        <div class="arrows">
            <button id="prev"><</button>
            <button id="next">></button>
        </div>
        <!-- time running -->
        <div class="time"></div>

    </div>
        <!-- Promotion Services section - Sử dụng dữ liệu danh mục từ database -->
    <div class="background-promotion-top">
    <div class="promotion-services">
        <h2>Promotion Services</h2>
        <div class="fashion-categories-row">
            <table class="fashion-table" width="100%">
                <tr>
                    <!-- Category 1 - Gucci-->
                    <td class="fashion-item">
                        <div class="fashion-image-container">
                            <img src="../image(Products)/Promotion_Service/ThuongHieuGucci.jpg" alt="Special events" class="fashion-image" />
                            <div class="fashion-overlay">
                                <h3 class="fashion-title">Special events</h3>
                                <p class="fashion-description">Discover our current offers curated for you</p>
                            </div>
                        </div>
                    </td>
                    
                    <!-- Category 2 - Dior-->
                    <td class="fashion-item">
                        <div class="fashion-image-container">
                            <img src="../image(Products)/Promotion_Service/ThuongHieuDior.jpg" alt="Fashion Demand" class="fashion-image" />
                            <div class="fashion-overlay">
                                <h3 class="fashion-title">Fashion Demand</h3>
                                <p class="fashion-description">Customize products according to you</p>
                            </div>
                        </div>
                    </td>
                    
                    <!-- Category 3 - LV-->
                    <td class="fashion-item">
                        <div class="fashion-image-container">
                            <img src="../image(Products)/Promotion_Service/ThuongHieuLV.jpg" alt="Brand exclusivity" class="fashion-image" />
                            <div class="fashion-overlay">
                                <h3 class="fashion-title">Brand exclusivity</h3>
                                <p class="fashion-description">Available exclusive products at the best price</p>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <!-- TOP SELL section -->
        <div class="top-sell">
            <h3>TOP SELL</h3>
            <div class="product-container">
                <asp:ListView ID="ListView2" runat="server" DataKeyNames="VariantID" GroupItemCount="3" class="product-list" DataSourceID="SqlDataSource2">
                    <AlternatingItemTemplate>
                        <td runat="server" style="" class="product-item">
                            <asp:image ID="ImagesLabel" runat="server" imageurl='<%# "../image(Products)/" + Eval("Images") %>' CssClass="product-image" />
                            <br />

                            <asp:Label ID="VariantNameLabel" runat="server" Text='<%# Eval("VariantName") %>' CssClass="product-name" Font-Bold="true" />
                            <br />

                            <asp:Label ID="Price" runat="server" Text='<%#"$" + Eval("Price") %>' CssClass="product-price" Font-Bold="true" />
                            <br />

                            <asp:Label ID="VariantIDLabel" Visible="false" runat="server" Text='<%# Eval("VariantID") %>' />
                            <br />
                  
                            <asp:Label ID="ProductIDLabel" Visible="false" runat="server" Text='<%# Eval("ProductID") %>' />
                            <br />
                        </td>
                    </AlternatingItemTemplate>
                    <GroupTemplate>
                        <tr id="itemPlaceholderContainer" runat="server">
                            <td id="itemPlaceholder" runat="server">
                            </td>
                        </tr>
                    </GroupTemplate>
                    <ItemTemplate>
                        <td runat="server" style="" class="product-item">
                            <asp:image ID="Image3" runat="server" imageurl='<%# "../image(Products)/" + Eval("Images") %>' CssClass="product-image" />
                            <br />
                            
                            <asp:Label ID="VariantNameLabel" runat="server" Text='<%# Eval("VariantName") %>' CssClass="product-name" Font-Bold="true"/>
                            <br />

                            <asp:Label ID="Price" runat="server" Text='<%#"$" + Eval("Price") %>' CssClass="product-price" Font-Bold="true" />
                            <br />

                            <asp:Label ID="VariantIDLabel" Visible="false" runat="server" Text='<%# Eval("VariantID") %>' />
                            <br />
                            
                            <asp:Label ID="ProductIDLabel" Visible="false" runat="server" Text='<%# Eval("ProductID") %>' />
                            <br /> 
                        </td>
                    </ItemTemplate>
                    <LayoutTemplate>
                        <table runat="server">
                            <tr runat="server">
                                <td runat="server">
                                    <table id="groupPlaceholderContainer" runat="server" border="0" style="">
                                        <tr id="groupPlaceholder" runat="server">
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr runat="server">
                                <td runat="server" style="">
                                </td>
                            </tr>
                        </table>
                    </LayoutTemplate>
                    <SelectedItemTemplate>
                        <td runat="server" style="" class="product-item">
                            <asp:image ID="Image4" runat="server" imageurl='<%# "../image(Products)/" + Eval("Images") %>' CssClass="product-image" />
                            <br />

                            <asp:Label ID="VariantNameLabel" runat="server" Text='<%# Eval("VariantName") %>' CssClass="product-name" Font-Bold="true" />
                            <br />

                            <asp:Label ID="Price" runat="server" Text='<%#"$" + Eval("Price") %>' CssClass="product-price" Font-Bold="true" />
                            <br />

                            <asp:Label ID="VariantIDLabel" Visible="false" runat="server" Text='<%# Eval("VariantID") %>' />
                            <br />
                         
                            <asp:Label ID="ProductIDLabel" Visible="false" runat="server" Text='<%# Eval("ProductID") %>' />
                            <br />  
                        </td>
                    </SelectedItemTemplate>
                </asp:ListView>
                <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:MyConnectionString %>" SelectCommand="SELECT [VariantID], [ProductID], [VariantName], [Price], [Images] FROM [ProductVariants] ORDER BY [StockQuantity]"></asp:SqlDataSource>
            </div>
        </div>
       
        </div>
       
    <script src="../js/Homepage.js"></script>
        <script>
            function toggleAccountInfo() {
                var panel = document.getElementById('<%= pnlAccountInfo.ClientID %>');
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
        }

        // Ẩn panel khi nhấp ra ngoài
        document.addEventListener('click', function (e) {
            const settingsButton = document.getElementById('settingsButton');
            const panel = document.getElementById('<%= pnlAccountInfo.ClientID %>');
            if (!settingsButton.contains(e.target) && !panel.contains(e.target)) {
                panel.style.display = 'none';
            }
        });
        </script>
</body>
</html>
