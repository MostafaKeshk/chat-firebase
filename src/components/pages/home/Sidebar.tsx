import { Box, Drawer } from "@mui/material";
import DrawerList from "../../Layout/DrawerList";

type IProps = {
  rooms: any;
  room: any;
  handleSelectRoom: any;
  setOpenDialog: any;
  mobileOpen: any;
  handleDrawerToggle: any;
  drawerWidth: any;
};

const Sidebar: React.FC<IProps> = ({
  rooms,
  room,
  handleSelectRoom,
  setOpenDialog,
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerList
          rooms={rooms}
          handleSelectRoom={handleSelectRoom}
          handleOpenRoom={() => setOpenDialog(true)}
          selectedRoom={room}
        />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <DrawerList
          rooms={rooms}
          handleSelectRoom={handleSelectRoom}
          handleOpenRoom={() => setOpenDialog(true)}
          selectedRoom={room}
        />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
