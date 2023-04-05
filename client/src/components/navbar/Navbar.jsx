import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo-utc.png";
import iconBell from "../../assets/images/chuong.png";
import DateTime from "../../utils/DateTime";
import ToastService from "../../utils/ToastService.js";
import NewRequest from "../../utils/NewRequest.js";

import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await NewRequest.post("auth/logout");
      localStorage.setItem("currentUser", null);
      ToastService.success("Logout Success!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      ToastService.error(err);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="" />
        <div className="title-logo">UTC town.</div>
      </div>

      <div className="right">
        <div className="top-right">
          <div className="marquee">
            <marquee>
              [ UTC town ] Chào mừng các bạn đến với sàn giao dịch cổ phiếu UTC
              town - đường đến thành công. Uy tín - nhanh chóng - thuận tiện. Mở
              tài khoản cực kì đơn giản chỉ với 1 bước duy nhất !!!
            </marquee>
            {currentUser ? (
              <div className="user">
                <img src={iconBell} className="icon-notification" />
                <span className="username">{currentUser.username}</span>
                <button onClick={handleLogout}>Đăng xuất</button>
              </div>
            ) : (
              <div className="btn">
                <Link to="/register">
                  <button>Mở tài khoản</button>
                </Link>
                <Link to="/login">
                  <button>Đăng nhập</button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="bot-right">
          <div className="menu">
            <div className="item">Menu 1</div>
            <div className="item">Menu 2</div>
            <div className="item">Menu 3</div>
            <div className="item">Menu 4</div>
            <div className="item">Menu 5</div>
          </div>
          <div className="sub">
            <DateTime />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
