import { Box, Container, Toolbar } from "@mui/material";
import withAuth from "../routes/withAuth";
import AlertMessage from "../components/general/AlertMessage";
import AppBar from "../components/Layout/AppBar";
import { useAlert } from "../contexts/AlertContext";
import useHomeContainer from "../containers/useHomeContainer";
import AlertDialog from "../components/general/AlertDialog";
import FormikInput from "../components/form/FormikInput";
import Room from "../components/Room";
import Welcome from "../components/pages/home/Welcome";
import MessageInput from "../components/pages/home/MessageInput";
import Sidebar from "../components/pages/home/Sidebar";
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

      <Sidebar
        rooms={rooms}
        room={room}
        handleSelectRoom={handleSelectRoom}
        setOpenDialog={setOpenDialog}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />

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
          {!!room.id ? (
            <Box>
              <Room roomMessages={roomMessages} ref={messagesEndRef} />

              <MessageInput
                messageText={messageText}
                setMessageText={setMessageText}
                handleSend={handleSend}
              />
            </Box>
          ) : (
            <Welcome />
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
