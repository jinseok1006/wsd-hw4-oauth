import appbarStyle from "./appbar.module.css";
import classNames from "classnames/bind";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* logo */}
          <Box component="img" src="logo.png" alt="logo" height="45px" sx={{mx:3}}/>
          {/* nav menus */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* spacer  */}
          <Box sx={{ flex: 1 }} />

          {/* user button */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* menu button for mobile */}
          <Box sx={{display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

function AppbarOld() {
  const cx = classNames.bind(appbarStyle);

  return (
    <nav className={cx("appbar")}>
      <div className={cx("left")}>
        <div className={cx("logo")}>
          <a href="#">
            <img src="logo.png" alt="" />
          </a>
        </div>
        <div className={cx("mobile-menu")}>메뉴</div>
        <ul className={cx("menu-list")}>
          <li>
            <a href="#">홈</a>
          </li>
          <li>
            <a href="#">시리즈</a>
          </li>
          <li>
            <a href="#">영화</a>
          </li>
          <li>
            <a href="#">NEW! 요즘 대세 콘텐츠</a>
          </li>
          <li>
            <a href="#">내가 찜한 콘텐츠</a>
          </li>
        </ul>
      </div>
      <div className={cx("right")}>
        <div className={cx("icon", "search")}>
          <div className={cx("search-bar")}>
            <i className={cx("fa-solid", "fa-magnifying-glass")}></i>
            <input type="text" placeholder="제목, 사람, 장르" />
          </div>
        </div>
        <div className={cx("icon", "kids")}>
          <a href="#">키즈</a>
        </div>
        <div className={cx("icon", "bell")}>
          <a href="#">
            <i className={cx("fa-solid", "fa-bell")}></i>
          </a>
        </div>
        <div className={cx("icon", "profile")}>
          <a href="#">
            <div className={cx("avatar-box")}></div>
            <i className={cx("fa-solid", "fa-caret-down")}></i>
          </a>
        </div>
      </div>
    </nav>
  );
}
