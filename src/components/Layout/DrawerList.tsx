import * as React from "react";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

type IProps = {
  rooms: any;
  selectedRoom: any;
  handleSelectRoom: any;
  handleOpenRoom: any;
};

const DrawerList: React.FC<IProps> = ({
  rooms,
  selectedRoom,
  handleSelectRoom,
  handleOpenRoom,
}) => {
  const classes = {
    toolbar: { px: `14px!important` },
    btn: (room: any) =>
      room.id === selectedRoom.id
        ? {
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.main",
            },
          }
        : {},
  };

  return (
    <div>
      <Toolbar sx={classes.toolbar}>
        <QuestionAnswerIcon sx={{ color: "primary.main", fontSize: 30 }} />
        <Typography sx={{ pl: 1, fontWeight: "bold" }} color="primary">
          Chatty
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {rooms.map((room: any) => (
          <ListItem
            key={room.id}
            disablePadding
            onClick={() => handleSelectRoom(room)}
          >
            <ListItemButton sx={classes.btn(room)}>
              {/* <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`/static/images/avatar/${value + 1}.jpg`}
              />
            </ListItemAvatar> */}
              <ListItemText primary={room.id} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ mt: 1, px: 0.5 }}>
        <Button
          onClick={handleOpenRoom}
          fullWidth
          variant="contained"
          color="primary"
        >
          Create/Join Room
        </Button>
      </Box>
    </div>
  );
};

export default DrawerList;
