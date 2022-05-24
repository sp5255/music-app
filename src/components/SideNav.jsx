import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const SideNav = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem
            button
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemText primary="New Releases" />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              navigate("/top-albums");
            }}
          >
            <ListItemText primary="Top Albums" />
          </ListItem>

          <ListItem>
            <ListItemText primary = "Top Artist" />
          </ListItem>
          {/* {["Favourites", "Playlist"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default SideNav;
