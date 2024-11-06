import { Link } from "react-router-dom";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import Drawer from "./Drawer";

import { ROUTES, PAGES } from "../constants";
import HideOnScroll from "./HideOnScroll";

const settings = ["Logout"];

export default function ResponsiveAppBar() {
  const [drawerOpen, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
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

  // const { pathname } = useLocation();
  // const appbarBackgroundColor =
  //   pathname === "/"
  //     ? "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))"
  //     : undefined;

  // absolute로하면 scrolltop이 안먹음..
  return (
    <>
      <HideOnScroll>
        <AppBar
          // position="static"
          sx={{
            transition: "background-color 0.3s ease",
            ":hover": {
              bgcolor: "#000",
            },
          }}
        >
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              {/* logo */}
              <Link to={ROUTES.root}>
                <Box
                  component="img"
                  src="logo.png"
                  alt="logo"
                  sx={{ mx: 3, height: "35px", verticalAlign: "middle" }}
                />
              </Link>
              {/* nav menus */}
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {PAGES.map((page) => (
                  <Button
                    component={Link}
                    key={page.title}
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
                <Tooltip title="Open settings">
                  <Button
                    sx={{ color: "#fff" }}
                    variant="text"
                    component={Link}
                    to={ROUTES.signin}
                  >
                    login
                  </Button>
                  {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon sx={{ color: "#fff" }} />
              </IconButton> */}
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
