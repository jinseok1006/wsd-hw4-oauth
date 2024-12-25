import { Link } from "react-router-dom";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import Drawer from "./Drawer";

import { ROUTES, PAGES } from "../utils/constants";
import HideOnScroll from "./HideOnScroll";
import { useSessionStore } from "../store/useSessionStore";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemIcon, ListItemText } from "@mui/material";
import logoImage from "../assets/logo.png";

export default function ResponsiveAppBar() {
  const { user, logout } = useSessionStore();
  const [drawerOpen, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    document.body.style.overflow = newOpen ? "auto" : "hidden";
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          // position="static"
          sx={{
            transition: "background-color 1s ease",
            // ":hover": {
            //   bgcolor: "#000",
            // },
          }}
        >
          <Container maxWidth={false}>
            <Toolbar>
              {/* logo */}
              <Link to={ROUTES.root}>
                <Box
                  component="img"
                  src={logoImage}
                  alt="logo"
                  sx={{ mr: 1, height: "35px", verticalAlign: "middle" }}
                />
              </Link>
              {/* nav menus */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {PAGES.map((page) => (
                  <Button
                    component={Link}
                    key={page.title}
                    startIcon={<page.icon />}
                    sx={{
                      color: "#a1a1aa",
                      minWidth: "inherit",

                      ":hover": {
                        fontWeight: 900,
                        color: "#fff",
                      },
                    }}
                    to={page.route}
                  >
                    {page.title}
                  </Button>
                ))}
              </Box>

              {/* spacer  */}
              <Box sx={{ flex: 1 }} />

              {/* user button */}
              <Box sx={{ flexGrow: 0 }}>
                {user ? (
                  <Box display="flex" justifyContent="center">
                    <Typography sx={{ color: "#fff", mr: 2 }}>
                      {/* {user.email.split("@")[0]} */}
                      {user.name}
                    </Typography>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <PersonIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    sx={{ color: "#fff" }}
                    variant="text"
                    component={Link}
                    to={ROUTES.signin}
                    startIcon={<LoginIcon />}
                  >
                    login
                  </Button>
                )}

                {/* 로그인 사용자 메뉴 */}
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
                  <MenuItem component={Link} to="/userInfo" key="userInfo" onClick={handleCloseUserMenu}>
                    <ListItemIcon>
                      <PermIdentityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="내 정보" />
                  </MenuItem>
                  <MenuItem key="logout" onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
              {/* menu button for mobile */}
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer(!drawerOpen)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
          <Drawer open={drawerOpen} toggleDrawer={toggleDrawer} />
        </AppBar>
      </HideOnScroll>
      {/* absolute appbar로 인한 content top margin 추가 */}
      <Toolbar id="back-to-top-anchor" />
    </>
  );
}
