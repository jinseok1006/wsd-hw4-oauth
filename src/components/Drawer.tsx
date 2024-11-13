import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { PAGES } from "../constants"; // PAGES 및 ROUTES 상수 가져오기
import { Divider, Toolbar } from "@mui/material";

interface TemporaryDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function TemporaryDrawer({
  open,
  toggleDrawer,
}: TemporaryDrawerProps) {
  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <Toolbar />
          <Divider />
          {PAGES.map((page) => (
            <ListItem key={page.title} disablePadding>
              <ListItemButton component={Link} to={page.route}>
                <ListItemText primary={page.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
