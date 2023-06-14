import {
  Box,
  Container,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
} from "@mui/material";
import withAuth from "../routes/withAuth";

import AlertMessage from "../components/general/AlertMessage";
import DrawerList from "../components/Layout/DrawerList";
import AppBar from "../components/Layout/AppBar";
import { useAlert } from "../contexts/AlertContext";
import useHomeContainer from "../containers/useHomeContainer";
import AlertDialog from "../components/general/AlertDialog";
import FormikInput from "../components/form/FormikInput";
import SendIcon from "@mui/icons-material/Send";
import Room from "../components/Room";
const Home = () => {
  const { value, msg, setValue, error } = useAlert();
  const drawerWidth = 300;

  const {
    handleDrawerToggle,
    mobileOpen,
    rooms,
    room,
    handleSelectRoom,
    roomMessages,

    handleSend,

    openDialog,
    setOpenDialog,
    roomLoading,
    roomFormik,

    messageText,
    setMessageText,
    messagesEndRef,
  } = useHomeContainer();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container maxWidth="xl">
          {!!room.id && (
            <>
              <Room roomMessages={roomMessages} ref={messagesEndRef} />

              <Box sx={{ display: "flex" }}>
                <TextField
                  size="small"
                  fullWidth
                  value={messageText}
                  onChange={(e: any) => setMessageText(e.target.value)}
                />

                <Tooltip title="Send">
                  <IconButton
                    onClick={handleSend}
                    sx={{ ml: 0.5 }}
                    disabled={!messageText}
                  >
                    <SendIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Container>
      </Box>

      <AlertDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        onAgree={roomFormik.handleSubmit}
        agreeText="Create/Join Room"
        disagreeText="Cancel"
        loading={roomLoading}
        description={
          <FormikInput
            size="small"
            fullWidth
            formik={roomFormik}
            name="name"
            label="Room Name"
          />
        }
        title="Create/Join Room"
      />

      <AlertMessage value={value} setValue={setValue} error={error} msg={msg} />
    </Box>
  );
};

export default withAuth(Home);
